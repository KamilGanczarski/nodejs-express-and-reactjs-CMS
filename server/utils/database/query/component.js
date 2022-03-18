const queryComponent = ({
  componentCondition = ''
}) => {
  return `SELECT
    components.*,
    (
      SELECT jsonb_agg(nested_file_info)
      FROM (
        SELECT * FROM file_info
          WHERE file_info.page_component_id = page_components.id
      ) AS nested_file_info
    ) AS file_info,
    (
      SELECT jsonb_agg(nested_content)
      FROM (
        SELECT * FROM content
          WHERE content.page_component_id = page_components.id
      ) AS nested_content
    ) AS content
    FROM page_components
    INNER JOIN pages ON (pages.id = page_components.page_id)
    INNER JOIN components ON (components.id = page_components.component_id)
    ${componentCondition}`;
}

module.exports = {
  queryComponent
}
