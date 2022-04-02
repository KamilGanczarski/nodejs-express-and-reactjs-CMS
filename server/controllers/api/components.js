const db = require('../../db/connect');
const { componentQuery } = require('../../utils/database');

const fetchComponentsByUrlAndType = async (page, componentName) => {
  const components = await db.query(
      componentQuery({
        componentCondition: 'WHERE pages.url = $1 AND components.type = $2'
      }),
      [page, componentName]
    )
    .then((result) => result)
    .catch((err) => {
      throw new CustomError.BadRequestError(`No components`);
    });

  return components;
}

const fetchMaxOrderId = async (page_id) => {
  // order_id, page_id, component_id
  const orders = await db.query(
      `SELECT max(order_id) FROM page_components WHERE page_id = $1`,
      [page_id]
    )
    .then((result) => parseInt(result[0].max))
    .catch((err) => {
      throw new CustomError.BadRequestError(`No components`);
    });

  return orders;
}

const toggleComponent = async (page_id, component_id) => {
  return await db.query(
      `UPDATE page_components set disabled = NOT disabled
        WHERE page_id = $1 AND component_id = $2 RETURNING *`,
      [page_id, component_id]
    )
    .then((result) => result[0].disabled)
    .catch((err) => {
      throw new CustomError.BadRequestError("New component hasn't been added");
    });
}

module.exports = {
  fetchComponentsByUrlAndType,
  fetchMaxOrderId,
  toggleComponent
}
