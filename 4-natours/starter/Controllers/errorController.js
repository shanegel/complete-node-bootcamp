const env = require('dotenv');

env.config({ path: './.env' });

const sendDevErr = (err, req, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

const sendProdErr = (err, req, res) => {
  if (err.isOperationsl) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: 'Fail',
      message: 'Something went wrong',
    });
  }
};

const MODE = process.env.NODE_ENV;

module.exports = (err, req, res, next) => {
  //console.log(err.stack);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'fail';

  if (MODE === 'development') {
    sendDevErr(err, res);
  } else if (MODE === 'production') {
    sendProdErr(err, res);
  }
  //next();
};
