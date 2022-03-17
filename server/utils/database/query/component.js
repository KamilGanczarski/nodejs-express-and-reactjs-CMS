const queryComponent = ({
  componentCondition = ''
}) => {
  return `SELECT
    components.*,
    (
      SELECT jsonb_agg(nested_file_info)
      FROM (
        SELECT * FROM file_info
          WHERE file_info.subsite_component_id = subsite_components.id
      ) AS nested_file_info
    ) AS file_info,
    (
      SELECT jsonb_agg(nested_content)
      FROM (
        SELECT * FROM content
          WHERE content.subsite_component_id = subsite_components.id
      ) AS nested_content
    ) AS content
    FROM subsite_components
    INNER JOIN subsites ON (subsites.id = subsite_components.subsite_id)
    INNER JOIN components ON (components.id = subsite_components.component_id)
    ${componentCondition}`;
}

module.exports = {
  queryComponent
}
