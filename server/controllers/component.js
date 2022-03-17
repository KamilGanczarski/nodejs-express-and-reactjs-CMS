const db = require('../db/connect');
const CustomError = require('../errors');
const { StatusCodes } = require('http-status-codes');

const {
  fetchPermissionValue,
  checkPermission
} = require('./api/permission');

const { attachCookiesToResponse, createTokenUser } = require('../utils/jwt');
const { queryComponent } = require('../utils/database');

const getAllComponents = async (req, res) => {
  const { userId } = req.body;
  CustomError.requireProvidedValues(userId);

  const components = await db.query(
    queryComponent({
      componentCondition: 'WHERE subsites.user_id = $1'
    }),
    [userId])
  .then((result) => result)
  .catch((err) => {
    throw new CustomError.BadRequestError(`No components`);
  });

  res.status(StatusCodes.OK).send({ components });
}

const createComponent = async (req, res) => {
  const { subsiteId, componentname } = req.body;
  CustomError.requireProvidedValues(subsiteId, componentname);

  // Check if component already exists
  const components = await db.query(
    queryComponent({
      componentCondition: 'WHERE subsites.id = $1 AND components.type = $2'
    }),
    [subsiteId, componentname]
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
      `INSERT INTO subsite_components (subsite_id, component_id) VALUES
        ($1, $2)`,
      [subsiteId, componentDetails[0].id]
    )
    .then((result) => result[0])
    .catch((err) => {
      console.log(err)
      throw new CustomError.BadRequestError("New component hasn't been added");
    });

  res.status(StatusCodes.OK).send({ msg: "You've added this component" });
}

const deleteComponent = async (req, res) => {
  const { subsiteId, componentname } = req.body;
  CustomError.requireProvidedValues(subsiteId, componentname);

  // Check if component already exists
  const components = await db.query(
    queryComponent({
      componentCondition: 'WHERE subsites.id = $1 AND components.type = $2'
    }),
    [subsiteId, componentname]
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
    `DELETE FROM subsite_components
      WHERE subsite_id = $1 AND component_id = $2`,
    [subsiteId, components[0].id]
  )
  .then((result) => result[0])
  .catch((err) => {
    throw new CustomError.BadRequestError("New component hasn't been added");
  });

  res.status(StatusCodes.OK).send({ msg: "You've deleted this component" });
}

module.exports = {
  getAllComponents,
  createComponent,
  deleteComponent
}
