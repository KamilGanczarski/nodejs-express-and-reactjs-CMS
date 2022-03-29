const pageQuery = ({
  pageRolesCondition = '',
  userCondition = ''
}) => {
  // Join user table due to the check user id
  userCondition = `INNER JOIN users ON (users.id = pages.user_id) ${userCondition}`;

  return `SELECT
    pages.*,
    (
      SELECT jsonb_agg(nested_roles)
      FROM (
        SELECT * FROM page_roles
          WHERE page_roles.id = pages.site_role_id ${pageRolesCondition}
      ) AS nested_roles
    ) AS roles
  FROM pages
  INNER JOIN page_roles ON (page_roles.id = pages.site_role_id)
  ${userCondition}
  ORDER BY pages.id`;
}

module.exports = {
  pageQuery
}
