const Tour = require('../Model/tourModel');

//File handler
// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

//Route Handlers
//GET All-----------------------------------------------------
exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: `ERR:: => GET FAIL:: => ${err}`,
    });
  }
};
//GET Single tour-----------------------------------------------------
exports.getSingleTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: `ERR:: => GET FAIL:: => ${err}`,
    });
  }
};
//POST-----------------------------------------------------
exports.addTour = async (req, res) => {
  // const newTour = new Tour({});
  // newTour.save();
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: `ERR:: => POST FAIL:: => ${err}`,
    });
  }
};
//PATCH-----------------------------------------------------
exports.editTour = (req, res) => {
  res.status(202).json({
    status: 'success',
    message: '<=SUCCESS=>',
  });
};
//DELETE-----------------------------------------------------
exports.deleteTour = (req, res) => {
  res.status(202).json({
    status: 'success',
    message: '<=SUCCESS=>',
  });
};
