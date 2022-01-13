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
app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1', require('./routes/api'));

// Middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () =>
      console.log(`Server is listening on port ${PORT}...`)
    );
  } catch (error) {
    console.log(error);
  }
}

start();
