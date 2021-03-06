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
    '2022-12-31'::timestamp,
    15,
    '00000000',
    '2022-12-31'::timestamp,
    '2022-12-31'::timestamp,
    1
  );

-- TABLE contract
INSERT INTO contract (
  contract,
  price,
  advance,
  howMuchPaid,
  user_id
) VALUES
  (false, 0, 0, 0, 1);

-- TABLE permissions
INSERT INTO permissions (name, value, deleteValue, description) VALUES
  ('VIEW_USER', 1, 7, 'Allows for viewing of users'),
  ('ADD_USER', 3, 6, 'Allows for the adding of users'),
  ('MANAGE_USER', 7, 4, 'Allows management of the users'),
  ('MANAGE_PAGES', 8, 8, 'Allows management of the pages'),
  ('MANAGE_COMPONENTS', 16, 16, 'Allows management of the components');

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
  (1, '/index', 'Home', '', '00000001', false, 1, 1),
  (2, '/about', 'About', '', '00000002', false, 1, 1),
  (3, '/offers', 'Offers', '', '00000003', false, 1, 1),
  (4, '/login', 'Login', '', '00000004', false, 1, 1),
  (5, '/contact', 'Contact', '', '00000005', false, 1, 1);

-- TABLE components
INSERT INTO components VALUES
  (1, 'hero-carousel', 'hero-carousel'),
  (2, 'hero-video', 'hero-video'),
  (3, 'skewed-slider', 'skewed-slider'),

  (4, 'custom-text', 'custom-text'),
  (5, 'carousel-3-2-1', 'carousel-3-2-1'),
  (6, 'carousel-4-3-2-1', 'carousel-4-3-2-1'),
  (7, 'carousel-awards', 'carousel-awards'),

  (8, 'gallery', 'gallery'),
  (9, 'youtube-films', 'youtube-films'),
  (10, 'youtube-films-counter', 'youtube-films-counter'),

  (11, 'navigation-around-website', 'navigation-around-website'),
  (12, 'navigation-around-website-1', 'navigation-around-website-1'),

  (13, 'chessboard', 'chessboard'),
  (14, 'collapsing-description', 'collapsing-description'),
  (15, 'portfolio-history-wedding', 'portfolio-history-wedding'),

  (16, 'intro-about-us', 'intro-about-us'),
  (17, 'intro-contact', 'intro-contact'),

  (18, 'google-map', 'google-map'),
  (19, 'footer', 'footer'),
  (20, 'footer-large', 'footer-large'),
  (21, 'contracts', 'contracts'),
  (22, 'subpage-intro', 'subpage-intro');

-- TABLE page_components
INSERT INTO page_components (order_id, page_id, component_id) VALUES
  (1, 1, 1),
  (2, 1, 2),
  (3, 1, 3),
  (4, 1, 4),
  (5, 1, 5),
  (6, 1, 6),
  (7, 1, 7),
  (8, 1, 8),
  (9, 1, 9),
  (10, 1, 10),
  (11, 1, 11),
  (12, 1, 12),
  (13, 1, 13),
  (14, 1, 14),
  (15, 1, 15),
  (16, 1, 16),
  (17, 1, 17),
  (18, 1, 18),
  (19, 1, 19),
  (20, 1, 20);

-- TABLE file_status
INSERT INTO file_status VALUES
  (1, 'show'),
  (2, 'propose'),
  (3, 'hide'),
  (4, 'approved'),
  (5, 'rejected');

-- TABLE file_info
INSERT INTO file_info (filename, path, order_id, page_component_id, file_status_id) VALUES
  ('3zT1PWiA.jpeg', '/uploads/00000001/', 1, 1, 1),
  ('8qFsiL7w.jpeg', '/uploads/00000001/', 2, 1, 1),
  ('e9UhDicx.jpeg', '/uploads/00000001/', 3, 1, 1),
  ('GdbW4vJg.jpeg', '/uploads/00000001/', 4, 1, 1);

-- TABLE content
INSERT INTO content (name, description, content, order_id, page_component_id) VALUES
  ('slide-1', 'text-size-4', 'Custom solutions 1', 1, 1),
  ('slide-1', 'text-size-3', 'Custom solutions 1', 2, 1),
  ('slide-1', 'text-size-2', 'Custom solutions 1', 3, 1),
  ('slide-1', 'text-size-1', 'Custom solutions 1', 4, 1),
  ('slide-2', 'text-size-4', 'Custom solutions 2', 1, 1),
  ('slide-2', 'text-size-3', 'Custom solutions 2', 2, 1),
  ('slide-2', 'text-size-2', 'Custom solutions 2', 3, 1),
  ('slide-2', 'text-size-1', 'Custom solutions 2', 4, 1),
  ('slide-3', 'text-size-4', 'Custom solutions 3', 1, 1),
  ('slide-3', 'text-size-3', 'Custom solutions 3', 2, 1),
  ('slide-3', 'text-size-2', 'Custom solutions 3', 3, 1),
  ('slide-3', 'text-size-1', 'Custom solutions 3', 4, 1),
  ('slide-4', 'text-size-4', 'Custom solutions 4', 1, 1),
  ('slide-4', 'text-size-3', 'Custom solutions 4', 2, 1),
  ('slide-4', 'text-size-2', 'Custom solutions 4', 3, 1),
  ('slide-4', 'text-size-1', 'Custom solutions 4', 4, 1);

-- TABLE newsletter
INSERT INTO newsletter VALUES
  (1, 'exampleemail_1@gmail.com', 1);


-- SELECT * FROM user_roles;
-- SELECT * FROM users;
-- SELECT * FROM contract;
-- SELECT * FROM permissions;
-- SELECT * FROM variables;
-- SELECT * FROM page_roles;
-- SELECT * FROM pages;
-- SELECT * FROM components;
-- SELECT * FROM page_components;
-- SELECT * FROM file_status;
-- SELECT * FROM file_info;
-- SELECT * FROM content;
-- SELECT * FROM newsletter;


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
