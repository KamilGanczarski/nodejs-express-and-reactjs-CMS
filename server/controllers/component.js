const db = require('../db/connect');
const CustomError = require('../errors');
const { StatusCodes } = require('http-status-codes');

// Utils
const { componentQuery } = require('../utils/database');

// Api
const {
  fetchComponentsByIdAndUrl,
  fetchMaxOrderId,
  toggleComponentInDatabase,
  fetchComponentByPageAndComponentId,
  changeOrderIdByPageIdAndComponentId
} = require('./api/components');
const { fetchPagesByUrl } = require('./api/page');

const getAllComponents = async (req, res) => {
  const { page, componentName } = req.query;
  CustomError.requireProvidedValues(page);

  const queryParams = [page];
  let componentNameQuery = '';

  // Filter by component name if componentName is set
  if (componentName) {
    componentNameQuery = `AND components.type LIKE '${componentName}'`;
    // queryParams.push(componentName);
  }

  const components = await db.query(
      componentQuery({
        componentCondition: `WHERE pages.url = $1 ${componentNameQuery}`
      }),
      queryParams
    )
    .then((result) => result)
    .catch((err) => {
      console.log(err)
      throw new CustomError.BadRequestError(`No components`);
    });

  res.status(StatusCodes.OK).send({ components });
}

const toggleComponent = async (req, res) => {
  const { page, componentId, componentName } = req.body;
  CustomError.requireProvidedValues(page, componentId, componentName);

  // Check if component already exists
  const components = await fetchComponentsByIdAndUrl(page, componentId);

  const componentDetails = await db.query(
      `SELECT * FROM components WHERE type = $1;`,
      [componentName]
    )
    .then((result) => {
      if (result.length < 1) {
        throw new CustomError.BadRequestError(`No component found like this`);
      }

      return result;
    })
    .catch((err) => {
      throw new CustomError.BadRequestError(`No components`);
    });

  const Pages = await fetchPagesByUrl(page);
  if (Pages.length < 1) {
    throw new CustomError.BadRequestError(`No page found like this`);
  }
  
  if (components.length > 0) {
    const disabled = await toggleComponentInDatabase(componentId);
    res.status(StatusCodes.OK).send({
      msg: `You've ${disabled ? "deleted" : "added"} component`
    });
  } else {
    const orderId = await fetchMaxOrderId(
      'page_components', 'page_id', Pages[0].id
    ) + 1;

    // Insert component
    await db.query(
        `INSERT INTO page_components (order_id, page_id, component_id)
          VALUES ($1, $2, $3)`,
        [orderId, Pages[0].id, componentDetails[0].id]
      )
      .then((result) => result[0])
      .catch((err) => {
        throw new CustomError.BadRequestError("New component hasn't been added");
      });

    res.status(StatusCodes.OK).send({ msg: "You've added this component" });
  }
}

const changeComponentsOrder = async (req, res) => {
  const { page, componentId, nextComponentId } = req.body;

  const firstComponent = await fetchComponentByPageAndComponentId(
    page, componentId
  );

  const secondComponent = await fetchComponentByPageAndComponentId(
    page, nextComponentId
  );
  
  await changeOrderIdByPageIdAndComponentId(
    secondComponent.order_id,
    firstComponent.page_id,
    firstComponent.component_id
  );
  
  await changeOrderIdByPageIdAndComponentId(
    firstComponent.order_id,
    secondComponent.page_id,
    secondComponent.component_id
  );

  res.status(StatusCodes.OK).send({ msg: "You've changed components" });
}

module.exports = {
  getAllComponents,
  toggleComponent,
  changeComponentsOrder
}
