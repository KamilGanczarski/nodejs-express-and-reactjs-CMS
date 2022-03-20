const db = require('../db/connect');
const CustomError = require('../errors');
const { StatusCodes } = require('http-status-codes');

const { queryComponent } = require('../utils/database');

const getAllComponents = async (req, res) => {
  const { page } = req.query;
  CustomError.requireProvidedValues(page);

  const components = await db.query(
    queryComponent({
      componentCondition: 'WHERE pages.url = $1'
    }),
    [page])
  .then((result) => result)
  .catch((err) => {
    throw new CustomError.BadRequestError(`No components`);
  });

  res.status(StatusCodes.OK).send({ components });
}

const createComponent = async (req, res) => {
  const { pageId, componentname } = req.body;
  CustomError.requireProvidedValues(pageId, componentname);

  // Check if component already exists
  const components = await db.query(
    queryComponent({
      componentCondition: 'WHERE pages.id = $1 AND components.type = $2'
    }),
    [pageId, componentname]
  )
  .then((result) => result)
  .catch((err) => {
    throw new CustomError.BadRequestError(`No components`);
  });

  if (components.length > 0) {
    throw new CustomError.BadRequestError(`Component already exists`);
  }

  const componentDetails = await db.query(
      `SELECT * FROM components WHERE type = $1;`,
      [componentname]
    )
    .then((result) => result)
    .catch((err) => {
      throw new CustomError.BadRequestError(`No components`);
    });

  if (componentDetails.length < 1) {
    throw new CustomError.BadRequestError(`No component found like this`);
  }

  // Insert component
  await db.query(
      `INSERT INTO page_components (page_id, component_id) VALUES
        ($1, $2)`,
      [pageId, componentDetails[0].id]
    )
    .then((result) => result[0])
    .catch((err) => {
      console.log(err)
      throw new CustomError.BadRequestError("New component hasn't been added");
    });

  res.status(StatusCodes.OK).send({ msg: "You've added this component" });
}

const deleteComponent = async (req, res) => {
  const { pageId, componentname } = req.body;
  CustomError.requireProvidedValues(pageId, componentname);

  // Check if component already exists
  const components = await db.query(
    queryComponent({
      componentCondition: 'WHERE pages.id = $1 AND components.type = $2'
    }),
    [pageId, componentname]
  )
  .then((result) => result)
  .catch((err) => {
    throw new CustomError.BadRequestError(`No components`);
  });

  if (components.length < 1) {
    throw new CustomError.BadRequestError(`Component doesn't exists`);
  }

  // Delete component
  await db.query(
      `DELETE FROM page_components
        WHERE page_id = $1 AND component_id = $2`,
      [pageId, components[0].id]
    )
    .then((result) => result[0])
    .catch((err) => {
      throw new CustomError.BadRequestError("Component hasn't been deleted");
    });

  res.status(StatusCodes.OK).send({ msg: "You've deleted this component" });
}

module.exports = {
  getAllComponents,
  createComponent,
  deleteComponent
}
