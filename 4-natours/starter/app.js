const express = require('express');

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
  res.status(404).json({
    status: 'FAIL',
    message: `Cannot find (NON EXISTENT) ${req.originalUrl} end-pont in this API.`,
  });
  next();
});
module.exports = app;
