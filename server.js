const express = require('express');
const dotenv = require('dotenv');
const router = require('./routes/bootcamps');
const morgan = require('morgan');
const colors = require('colors');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');

//Load config vars
dotenv.config({ path: './config/config.env' });

//connect to database
connectDB();

const app = express();

//Body Parser
app.use(express.json());

//Dev logging Middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/bootcamps', router);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

//Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message.red}`);

  //close server & exit process
  server.close(() => process.exit(1));
});
