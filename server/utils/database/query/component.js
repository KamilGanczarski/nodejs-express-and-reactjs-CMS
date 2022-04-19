const componentQuery = ({
  componentCondition = ''
}) => {
  return `SELECT
    components.*,
    page_components.disabled,
    (
      SELECT jsonb_agg(nested_file_info)
      FROM (
        SELECT * FROM file_info
          WHERE file_info.page_component_id = page_components.id
      ) AS nested_file_info
    ) AS files,
    (
      SELECT jsonb_agg(nested_content)
      FROM (
        SELECT * FROM content
          WHERE content.page_component_id = page_components.id
          ORDER BY content.name, content.order_id
      ) AS nested_content
    ) AS content
    FROM page_components
    INNER JOIN pages ON (pages.id = page_components.page_id)
    INNER JOIN components ON (components.id = page_components.component_id)
    ${componentCondition} ORDER BY page_components.order_id`;
}

module.exports = {
  componentQuery
}
