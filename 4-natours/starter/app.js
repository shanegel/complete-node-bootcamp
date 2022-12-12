const express = require('express');
const app = express();

const tourRouter = require('./Routes/tourRoutes');
const userRouter = require('./Routes/userRoutes');
//Middlewares
app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', addTour);
// app.get('/api/v1/tours/:id', getSingleTour);
// app.patch('/api/v1/tours/:id', editTour);

//Mounting Routers
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

//SERVER
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
