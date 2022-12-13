const express = require('express');

const app = express();

const tourRouter = require('./Routes/tourRoutes');
const userRouter = require('./Routes/userRoutes');
//Middlewares
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

//Mounting Routers
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
