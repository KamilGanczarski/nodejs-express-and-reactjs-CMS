const db = require('../db/connect');
const CustomError = require('../errors');
const { StatusCodes } = require('http-status-codes');

const { componentQuery } = require('../utils/database');


const {
  fetchComponentsByUrlAndType,
  fetchMaxOrderId,
  toggleComponent
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
      throw new CustomError.BadRequestError(`No components`);
    });

  res.status(StatusCodes.OK).send({ components });
}

const addComponent = async (req, res) => {
  const { page, componentName } = req.body;
  CustomError.requireProvidedValues(page, componentName);

  // Check if component already exists
  const components = await fetchComponentsByUrlAndType(page, componentName);

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
    const disabled = await toggleComponent(Pages[0].id, componentDetails[0].id);
    res.status(StatusCodes.OK).send({
      msg: `You've ${disabled ? "deleted" : "added"} component`
    });
  } else {
    const orderId = await fetchMaxOrderId(Pages[0].id) + 1;

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

const deleteComponent = async (req, res) => {
  const { page, componentName } = req.body;
  CustomError.requireProvidedValues(page, componentName);

  // Check if component already exists
  const components = await fetchComponentsByUrlAndType(page, componentName);
  if (components.length < 1) {
    throw new CustomError.BadRequestError(`Component doesn't exists`);
  }

  const Pages = await fetchPagesByUrl(page);
  if (Pages.length < 1) {
    throw new CustomError.BadRequestError(`No page found like this`);
  }

  // Delete component
  await db.query(
      `DELETE FROM page_components
        WHERE page_id = $1 AND component_id = $2`,
      [Pages[0].id, components[0].id]
    )
    .then((result) => result[0])
    .catch((err) => {
      throw new CustomError.BadRequestError("Component hasn't been deleted");
    });

  res.status(StatusCodes.OK).send({ msg: "You've deleted this component" });
}

module.exports = {
  getAllComponents,
  addComponent,
  deleteComponent
}
