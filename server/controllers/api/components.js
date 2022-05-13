const db = require('../../db/connect');

// Utils
const { componentQuery } = require('../../utils/database');

const fetchComponentsByIdAndUrl = async (page, componentId) => {
  const components = await db.query(
      componentQuery({
        componentCondition: 'WHERE pages.url = $1 AND page_components.id = $2'
      }),
      [page, componentId]
    )
    .then((result) => result)
    .catch((err) => {
      throw new CustomError.BadRequestError(`No components`);
    });

  return components;
}

const fetchMaxOrderId = async (table, fieldName, value) => {
  // order_id, page_id, component_id
  const orders = await db.query(
      `SELECT max(order_id) FROM ${table} WHERE ${fieldName} = $1`,
      [value]
    )
    .then((result) => parseInt(result[0].max))
    .catch((err) => {
      throw new CustomError.BadRequestError(`No components`);
    });

  return orders;
}

const toggleComponentInDatabase = async (componentId) => {
  return await db.query(
      `UPDATE page_components set disabled = NOT disabled
        WHERE id = $1 RETURNING *`,
      [componentId]
    )
    .then((result) => result[0].disabled)
    .catch((err) => {
      throw new CustomError.BadRequestError("New component hasn't been added");
    });
}

const fetchComponentByPageAndComponentId = async (page, componentId) => {
  return await db.query(
      `SELECT * FROM page_components
        INNER JOIN pages ON (pages.id = page_components.page_id)
        WHERE pages.url = $1 AND page_components.component_id = $2`,
      [page, componentId]
    )
    .then((result) => result[0])
    .catch((err) => {
      throw new CustomError.BadRequestError("No component found");
    });
}

const changeOrderIdByPageIdAndComponentId = async (orderId, pageId, componentId) => {
  return await db.query(
      `UPDATE page_components SET order_id = $1
        WHERE page_id = $2 AND component_id = $3`,
      [orderId, pageId, componentId]
    )
    .then((result) => result[0])
    .catch((err) => {
      throw new CustomError.BadRequestError("No changed had been approved");
    });
}

module.exports = {
  fetchComponentsByIdAndUrl,
  fetchMaxOrderId,
  toggleComponentInDatabase,
  fetchComponentByPageAndComponentId,
  changeOrderIdByPageIdAndComponentId
}
