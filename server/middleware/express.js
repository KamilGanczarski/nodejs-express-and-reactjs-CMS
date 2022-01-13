const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const { SESSION_KEY, SESSION_EXPIRY } = require('../config/config')

module.exports = (app) => {
  // Morgan
  app.use(morgan('dev'));
  
  // Cookie parser
  app.use(cookieParser());
  
  // Body parser
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  
  // Flash
  app.use(flash());
  
  // Session
  app.use(session({
    secret: SESSION_KEY,
    resave: true,
    saveUninitialized: true,
    cookie: {
      // httpOnly: true,
      // secure: process.env.NODE_ENV === 'production',
      maxAge: SESSION_EXPIRY
    }
  }));
}
