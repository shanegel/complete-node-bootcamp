const express = require('express');
const AppError = require('./Utility/appError');
const gblErrHandler = require('./Controllers/errorController');

const app = express();

const tourRouter = require('./Routes/tourRoutes');
const userRouter = require('./Routes/userRoutes');
//Middlewares
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

//Mounting Routers(Main Routes)
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

//Check for non-existent end-points
app.all('*', (req, res, next) => {
  // const err = new Error(
  //   `Cannot find (NON EXISTENT) ${req.originalUrl} end-pont in this API.`
  // );
  // err.status = 'fail';
  // err.statusCode = 404;
  next(
    new AppError(
      `Cannot find (NON EXISTENT) ${req.originalUrl} end-pont in this API.`,
      404
    )
  );
});

app.use(gblErrHandler);

module.exports = app;
