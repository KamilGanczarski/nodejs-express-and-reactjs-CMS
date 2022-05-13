const db = require('../db/connect');
const CustomError = require('../errors');
const { StatusCodes } = require('http-status-codes');

// Api
const { fetchMaxOrderId } = require('./api/components');

const addContent = async (req, res) => {
  const { page, componentId, name, description, content } = req.body;
  CustomError.requireProvidedValues(page, componentId, name, content);

  const descriptionValue = description ? description : '';

  // Check if component with this page and component's name exists
  const page_components = await db.query(
      `SELECT * FROM page_components WHERE page_components.component_id = $1`,
      [componentId]
    )
    .then((result) => result)
    .catch((err) => {
      throw new CustomError.BadRequestError(
        `No page or component found like this`
      );
    });

  if (page_components.length === 0) {
    throw new CustomError.BadRequestError(
      `No page or component found like this`
    );
  }

  const orderId = await fetchMaxOrderId(
    'content', 'page_component_id', componentId
  ) + 1;

  // Insert content
  await db.query(
      `INSERT INTO content (name, description, content, order_id, page_component_id)
        VALUES ($1, $2, $3, $4, $5)`,
      [name, descriptionValue, content, orderId, componentId]
    )
    .then((result) => result[0])
    .catch((err) => {
      console.log(err)
      throw new CustomError.BadRequestError("New content hasn't been added");
    });

  res.status(StatusCodes.OK).send({ msg: "New content has been added" });
}

const updateContent = async (req, res) => {
  const { contentId, name, description, content } = req.body;
  CustomError.requireProvidedValues(contentId, name, content);

  const descriptionValue = description ? description : '';

  // Check if content with this page and component's name exists
  const contents = await db.query(
      `SELECT * FROM content WHERE id = $1 AND name = $2`,
      [contentId, name]
    )
    .then((result) => result)
    .catch((err) => {
      throw new CustomError.BadRequestError(`No content found like this`);
    });

  if (contents.length === 0) {
    throw new CustomError.BadRequestError(`No content found like this`);
  }

  // Update content
  await db.query(
      `UPDATE content SET
        description = $1, content = $2 WHERE id = $3`,
      [descriptionValue, content, contentId]
    )
    .then((result) => result[0])
    .catch((err) => {
      throw new CustomError.BadRequestError("Content hasn't been changed");
    });

  res.status(StatusCodes.OK).send({ msg: "Content has been changed" });
}

const deleteContent = async (req, res) => {
  const { contentId } = req.body;
  CustomError.requireProvidedValues(contentId);

  // Delete component
  await db.query(`DELETE FROM content WHERE id = $1`, [contentId])
    .then((result) => result[0])
    .catch((err) => {
      throw new CustomError.BadRequestError("Content hasn't been deleted");
    });

  res.status(StatusCodes.OK).send({ msg: "Content has been deleted" });
}

module.exports = {
  addContent,
  updateContent,
  deleteContent
}
