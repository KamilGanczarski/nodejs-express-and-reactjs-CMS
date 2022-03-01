const operatorsMap = [ '>', '>=', '=', '<=', '<' ];
const filterUserOptions = [
  {
    req: 'id',
    table: 'users',
    value: 'users.id',
    query: ''
  }, {
    req: 'date',
    table: 'users',
    value: 'users.date',
    query: ''
  }, {
    req: 'expirydate',
    table: 'users',
    value: 'users.expirydate',
    query: ''
  }, {
    req: 'role',
    table: 'user_roles',
    value: 'user_roles.value',
    query: ''
  }, {
    req: 'price',
    table: 'contract',
    value: 'contract.price',
    query: ''
  }, {
    req: 'advance',
    table: 'contract',
    value: 'contract.advance',
    query: ''
  }, {
    req: 'howMuchPaid',
    table: 'contract',
    value: 'contract.howMuchPaid',
    query: ''
  }
];

/**
 * Create part of PostgreSQL query to filter table
 * @param {array} numericFilters Array of conditions like field>number
 * @param {array} operatorsMap Array of allowed comparison operators
 * @param {array} options Array of fields allowed to filter
 * @param {object} query
 * @param   {object} filter 
 * @param     {string} users Query for filter user
 * @param     {string} user_roles Query for filter user_roles
 * @param     {string} contract Query for filter contract
 * @param   {string} sort Query to sort
 * @param   {array} params Array of params
 * @returns Part of pgSQL query
 */
const setFilterQuery = (numericFilters, operatorsMap, options, query) => {
  let and = '';
  numericFilters.forEach(filter => {
    const inOperators = operatorsMap.find(operator => 
      filter.includes(operator)
    );

    if (inOperators) {
      // Split filter to field and value by operator
      const filterSplit = filter.split(inOperators);
      if (filterSplit.length == 2) {
        const optionKey = options.find(option => option.req === filterSplit[0]);
        if (optionKey) {
          switch (optionKey.table) {
            case 'user_roles':
              query.params.push(filterSplit[1]);
              // and = query.filter.user_roles ? ' AND ' : 'WHERE ';
              query.filter.user_roles +=
                ` AND ${optionKey.value} ${inOperators} $${query.params.length}`;
              break;
            case 'contract':
              query.params.push(filterSplit[1]);
              and = query.filter.contract ? ' AND ' : 'WHERE ';
              query.filter.contract +=
                `${and}${optionKey.value} ${inOperators} $${query.params.length}`;
              break;
            default:
              query.params.push(filterSplit[1]);
              and = query.filter.users ? ' AND ' : 'WHERE ';
              query.filter.users +=
                `${and}${optionKey.value} ${inOperators} $${query.params.length}`;
              break;
          }
        }
      }
    }
  });
  return query;
}

module.exports ={
  operatorsMap,
  filterUserOptions,
  setFilterQuery
}
