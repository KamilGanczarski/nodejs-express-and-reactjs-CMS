const { userQuery } = require('./query/user');
const { componentQuery } = require('./query/component');
const { pageQuery } = require('./query/page');

const { 
  operatorsMap,
  filterUserOptions,
  setFilterQuery
} = require('./filter/user');
const { sortUserOptions, setSortQuery } = require('./sort/user');
const { setPagination } = require('./pagination');

module.exports = {
  userQuery,
  componentQuery,
  pageQuery,
  operatorsMap,
  filterUserOptions,
  setFilterQuery,
  sortUserOptions,
  setSortQuery,
  setPagination
}
