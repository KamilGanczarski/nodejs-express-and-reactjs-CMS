-- user_roles
INSERT INTO user_roles VALUES
  (1, 'admin'),
  (2, 'cooperator'),
  (3, 'user'),
  (4, 'customer'),
  (5, 'event');

-- users
INSERT INTO users (
  login,
  event,
  password,
  passwordExpiryDate,
  permission,
  dir,
  date,
  expiryDate,
  role_id
) VALUES
  (
    'developer',
    'Developer event',
    '$2a$10$BX4FLipiSs5lHHYNAE71SeTg.UP.w4f/MIkYqW4QZwwJvGOyb7ntK',
    '2022-3-21'::timestamp,
    7,
    '00000000',
    '2022-3-21'::timestamp,
    '2022-3-21'::timestamp,
    1
  );

-- contract
INSERT INTO contract (
  user_id,
  contract,
  pdf,
  price,
  advance,
  howMuchPaid
) VALUES
  (1, false, '', 0, 0, 0);

-- permissions
INSERT INTO permissions (name, value, deleteValue, description) VALUES
  ('VIEW_USER', 1, 7, 'Allows for viewing of users'),
  ('ADD_USER', 3, 6, 'Allows for the adding of users'),
  ('MANAGE_USER', 7, 4, 'Allows management of the user');

-- variables
INSERT INTO variables (property, value) VALUES
  ('directory key', '00000000');

-- variables
INSERT INTO subsite_roles VALUES
  (1, 'subsite'),
  (2, 'offer'),
  (3, 'portfolio'),
  (4, 'portfolio history wedding'),
  (5, 'blog');


SELECT * FROM user_roles;
SELECT * FROM users;
SELECT * FROM contract;
SELECT * FROM permissions;
SELECT * FROM variables;

SELECT * FROM subsites;
SELECT * FROM components;
SELECT * FROM subsite_components;
SELECT * FROM file_status;
SELECT * FROM file_info;
SELECT * FROM content;
SELECT * FROM newsletter;

-- SELECT row_to_json(r, true)
--   FROM (
--     SELECT
--       u.id,
--       u.login,
--       u.event,
--       u.password,
--       u.passwordExpiryDate,
--       u.permission,
--       u.date,
--       u.expiryDate,
--       u.dir,
--       json_agg(c_row) AS roles
--     FROM users u
--     INNER JOIN user_roles ur ON (ur.id = u.role_id)
--     INNER JOIN (
--       SELECT
--         c.id,
--         c.value
--       FROM user_roles c
--     ) c_row ON (c_row.id = ur.id)
--     WHERE u.login = $1 GROUP BY u.id
--   ) r(id, login, event);


-- SELECT row_to_json(r, true)
--   FROM (
--     SELECT
--       u.id,
--       u.login,
--       u.event,
--       u.passwordExpiryDate,
--       u.date,
--       u.expiryDate,
--       u.dir,
--       json_agg(r_row) AS roles,
--       json_agg(c_row) AS contract
--     FROM users u
--     INNER JOIN user_roles ur ON (ur.id = u.role_id)
--     INNER JOIN (
--       SELECT * FROM user_roles urr ${roleQuery}
--     ) r_row ON (r_row.id = u.role_id)
--     INNER JOIN contract c ON (c.user_id = u.id)
--     INNER JOIN (
--       SELECT * FROM contract cr
--     ) c_row ON (c_row.user_id = u.id)
--     GROUP BY u.id ORDER BY u.id asc
--   ) r(id, login, event)


-- SELECT
--   users.id,
--   users.login,
--   users.event,
--   users.passwordExpiryDate,
--   users.permission,
--   users.date,
--   users.expiryDate,
--   users.dir,
--   (
--     SELECT jsonb_agg(nested_roles)
--     FROM (
--       SELECT * FROM user_roles
--         WHERE user_roles.id = users.role_id ${roleQuery}
--     ) AS nested_roles
--   ) AS roles,
--   (
--     SELECT jsonb_agg(nested_contract)
--     FROM (
--       SELECT * FROM contract WHERE contract.user_id = users.id
--     ) AS nested_contract
--   ) AS contract
-- FROM users
-- INNER JOIN user_roles ON (user_roles.id = users.role_id) ${roleQuery}
-- INNER JOIN contract ON (contract.user_id = users.id);
