const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const flash = require('connect-flash');
const { COOKIE_KEY, COOKIE_EXPIRY } = require('../config/config');

module.exports = (app, passport) => {
  // Morgan
  app.use(morgan('dev'));

  // Cookie parser
  app.use(cookieParser());

  // Body parser
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // Cookie Session
  app.use(
    cookieSession({
      maxAge: COOKIE_EXPIRY,
      keys: [COOKIE_KEY]
    })
  );

  // Passport
  app.use(passport.initialize());
  app.use(passport.session());

  // Flash
  app.use(flash());
}