require('dotenv').config()
require('express-async-errors')

const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')

const express = require("express")
const app = express()

const connectDB = require('./server/db/connect')

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

const port = process.env.PORT || 3001

const start = async () => {
  try {
    // connectDB
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () => console.log(`Server is listening on port ${port}...`))
  } catch (error) {
    console.log(error)
  }
}

start()
