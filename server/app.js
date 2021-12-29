require('dotenv').config();
require('express-async-errors');

const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

const express = require("express");
const app = express();
const passport = require('passport');
const { PORT } = require('./config/config');

// Mongoose
const connectDB = require('./db/connect');
require('./models/User');

// Implement middleware
require('./middleware/express')(app, passport);

// Passport setup
require('./services/passport/passport')(passport)
require('./services/passport/strategies/local-signup')(passport)
require('./services/passport/strategies/local-login')(passport)

// Routers
require('./routes/auth')(app, passport);
require('./routes/api')(app, passport);

const start = async () => {
  try {
    // connectDB
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));
  } catch (error) {
    console.log(error);
  }
}

start();
