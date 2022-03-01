const sortUserOptions = [
  ['userId', 'users.id'],
  ['login', 'users.login'],
  ['event', 'users.event'],
  ['date', 'users.date'],
  ['expirydate', 'users.expirydate'],
  ['permission', 'users.permission'],
  ['role', 'user_roles.value'],
  ['price', 'contact.price'],
  ['advance', 'contact.advance'],
  ['howmuchpaid', 'contact.howmuchpaid']
];

/**
 * Create part of PostgreSQL query to sort table
 * @param {*} sortReq Array of conditions like sort0,sort1 DESC,sort2
 * @param {*} options Array of allowed sort keywords
 * @param {object} query
 * @param   {object} filter 
 * @param     {string} users Query for filter user
 * @param     {string} user_roles Query for filter user_roles
 * @param     {string} contract Query for filter contract
 * @param   {string} sort Query to sort
 * @param   {array} params Array of params
 * @returns Part of pgSQL query
 */
const setSortQuery = (sortReq, options, query) => {
  const newSorts = [];
  sortReq.forEach(sort => {
    // Find and push to correct newSorts sort
    options.forEach(option => {
      if (sort === `${option[0]} DESC`) {
        newSorts.push(`${option[1]} DESC`);
        return;
      } else if (sort === option[0]) {
        newSorts.push(option[1]);
        return;
      }
    });
  });

  newSorts.forEach(sort => {
    query.sort += `${query.sort ? ',' : 'ORDER BY'} ${sort} NULLS LAST`;
  });

  return query;
}

module.exports = {
  sortUserOptions,
  setSortQuery
}
