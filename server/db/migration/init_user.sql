
DROP TABLE IF EXISTS newsletter CASCADE;
DROP TABLE IF EXISTS file_info CASCADE;
DROP TABLE IF EXISTS file_status;
DROP TABLE IF EXISTS content CASCADE;
DROP TABLE IF EXISTS subsite_components CASCADE;
DROP TABLE IF EXISTS components CASCADE;
DROP TABLE IF EXISTS subsites CASCADE;
DROP TABLE IF EXISTS subsite_roles;

DROP TABLE IF EXISTS contract CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS user_roles;
DROP TABLE IF EXISTS permissions;
DROP TABLE IF EXISTS variables;


-- TABLE user_roles
CREATE TABLE user_roles
(
  id    BIGINT UNIQUE GENERATED BY DEFAULT AS IDENTITY NOT NULL,
  value VARCHAR(255) UNIQUE                            NOT NULL
);

-- TABLE users
CREATE TABLE users
(
  id                   BIGINT UNIQUE GENERATED BY DEFAULT AS IDENTITY NOT NULL,
  login                VARCHAR(255) UNIQUE                            NOT NULL,
  email                VARCHAR(255),
  event                VARCHAR(255)                                   NOT NULL,
  password             VARCHAR(255)                                   NOT NULL,
  passwordExpiryDate   TIMESTAMP                                      NOT NULL,
  permission           BIGINT                                         NOT NULL,
  date                 TIMESTAMP,
  expiryDate           TIMESTAMP                                      NOT NULL,
  dir                  VARCHAR(255) UNIQUE                            NOT NULL,
  disabled             BOOLEAN DEFAULT false                          NOT NULL,
  role_id              BIGINT REFERENCES user_roles (id)              NOT NULL,
  PRIMARY KEY (id)
);

-- TABLE contract
CREATE TABLE contract
(
  user_id     BIGINT REFERENCES users (id) NOT NULL,
  contract    BOOLEAN DEFAULT false        NOT NULL,
  pdf         VARCHAR(255),
  price       NUMERIC(5, 2),
  advance     NUMERIC(5, 2),
  howMuchPaid NUMERIC(5, 2)
);

-- TABLE permissions
CREATE TABLE permissions
(
  id          BIGINT UNIQUE GENERATED BY DEFAULT AS IDENTITY NOT NULL,
  name        VARCHAR(255) UNIQUE                            NOT NULL,
  value       INT UNIQUE                                     NOT NULL,
  deleteValue INT UNIQUE                                     NOT NULL,
  description VARCHAR(255) UNIQUE                            NOT NULL
);

-- TABLE variables
CREATE TABLE variables
(
  id       BIGINT UNIQUE GENERATED BY DEFAULT AS IDENTITY NOT NULL,
  property VARCHAR(255) UNIQUE                            NOT NULL,
  value    VARCHAR(255)                                   NOT NULL
);

-- TABLE subsite_roles
CREATE TABLE subsite_roles
(
  id    BIGINT UNIQUE GENERATED BY DEFAULT AS IDENTITY NOT NULL,
  value VARCHAR(255) UNIQUE                            NOT NULL
);

-- TABLE subsites
CREATE TABLE subsites
(
  id           BIGINT UNIQUE GENERATED BY DEFAULT AS IDENTITY NOT NULL,
  user_id      BIGINT REFERENCES users (id)                   NOT NULL,
  url          VARCHAR(255) UNIQUE,
  name         VARCHAR(255) UNIQUE,
  descripion   VARCHAR(255),
  dir          VARCHAR(255) UNIQUE                            NOT NULL,
  disabled     BOOLEAN DEFAULT false                          NOT NULL,
  site_role_id BIGINT REFERENCES subsite_roles (id)           NOT NULL
);

-- TABLE components
CREATE TABLE components
(
  id                  BIGINT UNIQUE GENERATED BY DEFAULT AS IDENTITY NOT NULL,
  type                VARCHAR(255) UNIQUE,
  path                VARCHAR(255) UNIQUE
  -- edit_id             BIGINT REFERENCES components (id),
  -- parent_component_id BIGINT REFERENCES components (id)
);

-- TABLE subsite_components
CREATE TABLE subsite_components
(
  id           BIGINT UNIQUE GENERATED BY DEFAULT AS IDENTITY NOT NULL,
  subsite_id   BIGINT REFERENCES subsites (id)                NOT NULL,
  component_id BIGINT REFERENCES components (id)              NOT NULL
);

-- TABLE file_status
CREATE TABLE file_status
(
  id   BIGINT UNIQUE GENERATED BY DEFAULT AS IDENTITY        NOT NULL,
  name VARCHAR(255) UNIQUE
);

-- TABLE file_info
CREATE TABLE file_info
(
  id                   BIGINT UNIQUE GENERATED BY DEFAULT AS IDENTITY NOT NULL,
  filename             VARCHAR(255) UNIQUE,
  path                 VARCHAR(255) UNIQUE,
  subsite_component_id BIGINT REFERENCES subsite_components (id)      NOT NULL,
  file_status_id       BIGINT REFERENCES file_status (id)             NOT NULL
);

-- TABLE content
CREATE TABLE content
(
  id                   BIGINT UNIQUE GENERATED BY DEFAULT AS IDENTITY NOT NULL,
  name                 VARCHAR(255) UNIQUE                            NOT NULL,
  content              VARCHAR(255) UNIQUE,
  subsite_component_id BIGINT REFERENCES subsite_components (id)      NOT NULL
);

-- TABLE newsletter
CREATE TABLE newsletter
(
  id      BIGINT UNIQUE GENERATED BY DEFAULT AS IDENTITY NOT NULL,
  user_id BIGINT REFERENCES users (id)                   NOT NULL
);

-- Import - insert date
\i '/var/www/html/all/nodejs-express-and-reactjs-CMS/server/db/migration/insert_data.sql';