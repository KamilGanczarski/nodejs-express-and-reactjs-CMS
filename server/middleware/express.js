const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const cors = require('cors');

module.exports = (app) => {
  app.use(cors());
  // Morgan
  app.use(morgan('dev'));
  
  // Cookie parser
  app.use(cookieParser(process.env.JWT_SECRET));
  
  // Body parser
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  
  // Flash
  app.use(flash());
}
