const fs = require('fs');
//File handler
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

//Route Handlers
//GET All-----------------------------------------------------
exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    timeStamp: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};
//GET Single tour-----------------------------------------------------
exports.getSingleTour = (req, res) => {
  const id = +req.params.id;
  const tour = tours.find((el) => el.id === id);
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'ERR:: => GET FAIL:: => Invalid ID',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: tour,
    },
  });
};
//POST-----------------------------------------------------
exports.addTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  //Added new tour to memory
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err) {
        res.status(404).json({
          status: 'fail',
          message: 'ERR:: => POST FAIL:: => !! ',
        });
      }
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};
//PATCH-----------------------------------------------------
exports.editTour = (req, res) => {
  const id = +req.params.id;
  const tour = tours.find((el) => el.id === id);
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'ERR:: => PATCH FAIL:: => Invalid ID',
    });
  }
  res.status(202).json({
    status: 'success',
    message: '<=SUCCESS=>',
  });
};
//DELETE-----------------------------------------------------
exports.deleteTour = (req, res) => {
  const id = +req.params.id;
  const tour = tours.find((el) => el.id === id);
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'ERR:: => DELETE FAIL:: => Invalid ID',
    });
  }
  res.status(202).json({
    status: 'success',
    message: '<=SUCCESS=>',
  });
};
