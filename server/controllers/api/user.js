const db = require('../../db/connect');
const CustomError = require('../../errors');

const { userQuery } = require('../../utils/database');

const fetchUserById = async (userId) => {
  // Fetch user
  return await db.query(
      userQuery({ userCondition: 'WHERE users.id = $1' }),
      [userId]
    )
    .then((result) => {
      if (result.length === 0) {
        throw new CustomError.BadRequestError(`No user with id: ${userId}`);
      }
      return result[0];
    })
    .catch((err) => {
      throw new CustomError.BadRequestError(`No user with id: ${userId}`);
    });
}

module.exports = {
  fetchUserById
}
