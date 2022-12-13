const Tour = require('../Model/tourModel');

//File handler
// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

//Route Handlers
//GET All-----------------------------------------------------
exports.getAllTours = async (req, res) => {
  try {
    //BUILD A SIMPLE QUERY
    const queryObj = { ...req.query };
    const removeProps = ['page', 'sort', 'limit', 'feilds'];
    removeProps.forEach((props) => delete queryObj[props]);
    //console.log(queryObj);

    //BUILD ADVANCE QUERY

    let advQuery = JSON.stringify(queryObj);
    advQuery = advQuery.replace(/\b(gte|lte|gt|lt)\b/g, (match) => `$${match}`);
    const result = JSON.parse(advQuery);
    //EXECUTE QUERY
    const query = Tour.find(result);
    const tours = await query;

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
exports.editTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: `ERR:: => PATCH FAIL:: => ${err}`,
    });
  }
};
//DELETE-----------------------------------------------------
exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: `ERR:: => DELETE FAIL:: => ${err}`,
    });
  }
};
