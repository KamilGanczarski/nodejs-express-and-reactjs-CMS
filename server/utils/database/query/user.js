const userQuery = ({
  userCondition = '',
  roleCondition = '',
  contractCondition = '',
  sort = '',
  pagination = '',
  password = false
}) => {
  console.log(userCondition)
  return `SELECT
    users.id,
    users.login,
    users.event,
    ${password ? 'users.password,' : ''}
    users.passwordExpiryDate,
    users.permission,
    users.date,
    users.expiryDate,
    users.dir,
    (
      SELECT jsonb_agg(nested_roles)
      FROM (
        SELECT * FROM user_roles
          WHERE user_roles.id = users.role_id ${roleCondition}
      ) AS nested_roles
    ) AS roles,
    (
      SELECT jsonb_agg(nested_contact)
      FROM (
        SELECT * FROM contract WHERE contract.user_id = users.id
      ) AS nested_contact ${contractCondition}
    ) AS contact
  FROM users
  INNER JOIN user_roles ON (user_roles.id = users.role_id) ${roleCondition}
  INNER JOIN contract ON (contract.user_id = users.id) ${contractCondition}
  ${userCondition} ${sort} ${pagination}`;
}

module.exports = {
  userQuery
}
