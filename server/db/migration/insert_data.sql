-- TABLE user_roles
INSERT INTO user_roles VALUES
  (1, 'admin'),
  (2, 'cooperator'),
  (3, 'user'),
  (4, 'customer'),
  (5, 'event');

-- TABLE users
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
    15,
    '00000000',
    '2022-3-21'::timestamp,
    '2022-3-21'::timestamp,
    1
  );

-- TABLE contract
INSERT INTO contract (
  user_id,
  contract,
  pdf,
  price,
  advance,
  howMuchPaid
) VALUES
  (1, false, '', 0, 0, 0);

-- TABLE permissions
INSERT INTO permissions (name, value, deleteValue, description) VALUES
  ('VIEW_USER', 1, 7, 'Allows for viewing of users'),
  ('ADD_USER', 3, 6, 'Allows for the adding of users'),
  ('MANAGE_USER', 7, 4, 'Allows management of the users'),
  ('MANAGE_PAGES', 8, 8, 'Allows management of the pages');

-- TABLE variables
INSERT INTO variables (property, value) VALUES
  ('directory key', '00000005');

-- TABLE variables
INSERT INTO page_roles VALUES
  (1, 'page'),
  (2, 'offer'),
  (3, 'portfolio'),
  (4, 'portfolio history wedding'),
  (5, 'blog');

-- TABLE pages
INSERT INTO pages VALUES
  (1, 1, '/index', 'Home', '', '00000001', false, 1),
  (2, 1, '/about', 'About', '', '00000002', false, 1),
  (3, 1, '/offers', 'Offers', '', '00000003', false, 1),
  (4, 1, '/login', 'Login', '', '00000004', false, 1),
  (5, 1, '/contact', 'Contact', '', '00000005', false, 1);

-- TABLE components
INSERT INTO components VALUES
  (1, 'hero', 'hero'),
  (2, 'skewed-slider', 'skewed-slider'),
  
  (3, 'custom-text', 'custom-text'),
  (4, 'carousel-3-2-1', 'carousel-3-2-1'),
  (5, 'carousel-4-3-2-1', 'carousel-4-3-2-1'),
  (6, 'carousel-awards', 'carousel-awards'),

  (7, 'gallery', 'gallery'),
  (8, 'youtube-films', 'youtube-films'),
  (9, 'youtube-films-counter', 'youtube-films-counter'),

  (10, 'navigation-around-website', 'navigation-around-website'),
  (11, 'navigation-around-website-1', 'navigation-around-website-1'),

  (12, 'chessboard', 'chessboard'),
  (13, 'collapsing-description', 'collapsing-description'),
  (14, 'portfolio-history-wedding', 'portfolio-history-wedding'),

  (15, 'intro-about-us', 'intro-about-us'),
  (16, 'intro-contact', 'intro-contact'),

  (17, 'google-map', 'google-map'),
  (18, 'footer', 'footer'),
  (19, 'footer-large', 'footer-large');

-- TABLE page_components
INSERT INTO page_components (page_id, component_id) VALUES
  (1, 1),
  (1, 2),
  (1, 3),
  (1, 4),
  (1, 5),
  (1, 6),
  (1, 7),
  (1, 8),
  (1, 9),
  (1, 10),
  (1, 11),
  (1, 12),
  (1, 13),
  (1, 14),
  (1, 15),
  (1, 16),
  (1, 17),
  (1, 18),
  (1, 19);

-- TABLE file_status
INSERT INTO file_status VALUES
  (1, 'show'),
  (2, 'propose'),
  (3, 'hide'),
  (4, 'approved'),
  (5, 'rejected');

-- TABLE file_info
-- INSERT INTO file_info VALUES ();

-- TABLE content
-- INSERT INTO content VALUES ();

-- TABLE newsletter
-- INSERT INTO newsletter VALUES ();


SELECT * FROM user_roles;
SELECT * FROM users;
SELECT * FROM contract;
SELECT * FROM permissions;
SELECT * FROM variables;
SELECT * FROM page_roles;
SELECT * FROM pages;
SELECT * FROM components;
SELECT * FROM page_components;
SELECT * FROM file_status;
SELECT * FROM file_info;
SELECT * FROM content;
SELECT * FROM newsletter;


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

