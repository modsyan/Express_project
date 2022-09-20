const morgan = require('morgan'); // morgan module from npm
const express = require('express');
const userRouter = require('./routes/userRoute');
const tourRouter = require('./routes/tourRoute');

const app = express();

// [1] middleware /version -> applied to all requested

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.requestTime);
  next();
});

// [3] Routes // middleware applied only for specific URL
app.use('/api/v1/tours/', tourRouter);
app.use('/api/v1/users/', userRouter);

// [4] Starting the server

module.exports = app;
