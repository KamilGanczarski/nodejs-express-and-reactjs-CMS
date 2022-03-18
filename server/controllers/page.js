const db = require('../db/connect');
const CustomError = require('../errors');
const { StatusCodes } = require('http-status-codes');

const getAllPages = async (req, res) => {
  const pages = await db.query(
      `SELECT
        pages.*,
        (
          SELECT jsonb_agg(nested_roles)
          FROM (
            SELECT * FROM page_roles
              WHERE page_roles.id = pages.site_role_id
          ) AS nested_roles
        ) AS roles
      FROM pages
      INNER JOIN page_roles ON (page_roles.id = pages.site_role_id)
      ORDER BY pages.id`,
      []
    )
    .then((result) => result)
    .catch((err) => {
      throw new CustomError.BadRequestError(`No components`);
    });

  res.status(StatusCodes.OK).send({ pages });
}

module.exports = {
  getAllPages
}
