const db = require('../db/connect');
const CustomError = require('../errors');
const { StatusCodes } = require('http-status-codes');

// Api
const { fetchMaxOrderId } = require('./api/components');

const addContent = async (req, res) => {
  const { page, fileId, name, text_size, content } = req.body;
  CustomError.requireProvidedValues(page, fileId, name, content);

  const textSize = text_size ? text_size : '';

  // Check if component with this page and component's name exists
  const files = await db.query(
      `SELECT * FROM file_info WHERE file_info.id = $1`,
      [fileId]
    )
    .then((result) => result)
    .catch((err) => {
      throw new CustomError.BadRequestError(`No file found like this`);
    });

  if (files.length === 0) {
    throw new CustomError.BadRequestError(`No file found like this`);
  }

  const orderId = await fetchMaxOrderId(
    'file_content', 'file_info_id', fileId
  ) + 1;

  // Insert content
  await db.query(
      `INSERT INTO file_content (name, description, content, text_size, order_id, file_info_id)
        VALUES ($1, $2, $3, $4, $5, $6)`,
      [name, '', content, textSize, orderId, fileId]
    )
    .then((result) => result[0])
    .catch((err) => {
      console.log(err)
      throw new CustomError.BadRequestError("New content hasn't been added");
    });

  res.status(StatusCodes.OK).send({ msg: "New content has been added" });
}

const updateContent = async (req, res) => {
  const { contentId, name, text_size, content } = req.body;
  CustomError.requireProvidedValues(contentId, name, content);

  const textSize = text_size ? text_size : '';

  // Check if content with this page and component's name exists
  const contents = await db.query(
      `SELECT * FROM file_content WHERE id = $1 AND name = $2`,
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
      `UPDATE file_content SET
        text_size = $1, content = $2 WHERE id = $3`,
      [textSize, content, contentId]
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
  await db.query(`DELETE FROM file_content WHERE id = $1`, [contentId])
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
