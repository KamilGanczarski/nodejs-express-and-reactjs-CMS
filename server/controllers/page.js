const db = require('../db/connect');
const CustomError = require('../errors');
const { StatusCodes } = require('http-status-codes');

const { publicPages } = require('../utils/permission');
const { pageQuery } = require('../utils/database');

const getAllPages = async (req, res) => {
  const publicPagesSQL = `AND page_roles.value IN ('${publicPages.join(`', '`)}')`;

  const pages = await db.query(
      pageQuery({ pageRolesCondition: publicPagesSQL }),
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
