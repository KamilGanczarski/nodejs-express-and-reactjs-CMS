/**
 * Return part of SQL query to paginate table
 * @param {number} perPage Numer how many rows per page
 * @param {number} page Numbers which page return
 * @returns Part of sql query in string
 */
const setPagination = (perPage, page) => {
  perPage = parseInt(perPage);
  page = parseInt(page);
  return `OFFSET ${perPage * page} ROWS FETCH NEXT ${perPage} ROWS ONLY`;
}

module.exports = {
  setPagination
}
