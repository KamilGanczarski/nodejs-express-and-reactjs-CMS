require('dotenv').config();
require('express-async-errors');

// Express
const express = require("express");
const app = express();
const { PORT } = require('./config/config');

// Mongoose
const connectDB = require('./db/connect');

// Implement middleware
require('./middleware/express')(app);

// Middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// Routers
app.use('/api/v1/auth', require('./routes/authorization'));
app.use('/api/v1/users', require('./routes/user'));
app.use('/api/v1/roles', require('./routes/role'));
app.use('/api/v1/permissions', require('./routes/permission'));
app.use('/api/v1/pages', require('./routes/page'));
app.use('/api/v1/components', require('./routes/component'));
app.use('/api/v1/content', require('./routes/content'));
app.use('/api/v1/file', require('./routes/file'));

// Middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    app.listen(PORT, () =>
      console.log(`Server is listening on port ${PORT}...`)
    );
  } catch (error) {
    console.log(error);
  }
}

start();
