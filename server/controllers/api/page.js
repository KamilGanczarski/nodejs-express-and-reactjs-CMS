const db = require('../../db/connect');

const { pageQuery } = require('../../utils/database');

/**
 * Fetch pages for one user
 * @param {*} userId User id
 * @returns Return pages
 */
const fetchPagesByUserId = async (page, userId) => {
  // Find permission id
  const Pages = await db.query(
      pageQuery({
        userCondition: `WHERE users.id = $1`
      }),
      [userId]
    )
    .then((result) => result)
    .catch((err) => []);

  return Pages;
}

module.exports = {
  fetchPagesByUserId
}