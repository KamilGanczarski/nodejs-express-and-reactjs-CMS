const db = require('../db/connect');
const CustomError = require('../errors');
const { StatusCodes } = require('http-status-codes');

const addContent = async (req, res) => {
  const { page, component, name, content } = req.body;
  CustomError.requireProvidedValues(page, component, name, content);

  // Check if component with this page and component's name exists
  const page_component_id = await db.query(
      `SELECT page_components.* FROM page_components
        INNER JOIN pages ON (pages.id = page_components.page_id)
        INNER JOIN components ON (components.id = page_components.component_id)
        WHERE pages.url = $1 AND components.type = $2`,
      [page, component]
    )
    .then((result) => result)
    .catch((err) => {
      throw new CustomError.BadRequestError(
        `No page or component found like this`
      );
    });

  if (page_component_id.length === 0) {
    throw new CustomError.BadRequestError(
      `No page or component found like this`
    );
  }

  // Insert content
  await db.query(
      `INSERT INTO content (name, content, page_component_id) VALUES
        ($1, $2, $3)`,
      [name, content, page_component_id[0].id]
    )
    .then((result) => result[0])
    .catch((err) => {
      console.log(err)
      throw new CustomError.BadRequestError("New content hasn't been added");
    });

  res.status(StatusCodes.OK).send({ msg: "New content has been added" });
}

const updateContent = async (req, res) => {
  const { contentId, content } = req.body;
  CustomError.requireProvidedValues(contentId, content);

  // Check if component with this page and component's name exists
  const contents = await db.query(
      `SELECT * FROM content WHERE id = $1 AND name = $2`,
      [contentId, content]
    )
    .then((result) => result)
    .catch((err) => {
      throw new CustomError.BadRequestError(`No content found like this`);
    });

  if (contents.length === 0) {
    throw new CustomError.BadRequestError(`No content found like this`);
  }

  res.status(StatusCodes.OK).send({ msg: "Content has been updated" });
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
