const Tour = require('../Model/tourModel');
const APIFeatures = require('../Utility/apiFeatures'); //CLASS BASED Query
//File handler
// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

//Route Handlers

//Routre ALIASING-----------------------------------------------------

//CHEAP
exports.cheap5Tours = (req, res, next) => {
  req.query.limit = '5'; //How many to display in a page
  req.query.sort = '-ratingAverage,price'; //Keys to sort
  req.query.feilds = 'name,ratingsAverage,summary,difficulty,price'; //Props to display
  next();
};

//EASY TOURS
exports.easyTours = (req, res, next) => {
  req.query.sort = 'difficulty';
  req.query.feilds = 'name, difficulty';
  next();
};

//GET All-----------------------------------------------------
exports.getAllTours = async (req, res) => {
  try {
    //BUILD A SIMPLE QUERY(Functional Approach)
    // const queryObj = { ...req.query };
    // const removeProps = ['page', 'sort', 'limit', 'feilds'];
    // removeProps.forEach((props) => delete queryObj[props]);
    // //console.log(queryObj);

    // //BUILD ADVANCE QUERY
    // let advQuery = JSON.stringify(queryObj);
    // advQuery = advQuery.replace(/\b(gte|lte|gt|lt)\b/g, (match) => `$${match}`);
    // const result = JSON.parse(advQuery);

    // //STORE QUERY
    // let query = Tour.find(result);

    //CHECK FOR QUERY CHANGE

    //SORT
    // if (req.query.sort) {
    //   const sortBy = req.query.sort.split(',').join(' ');
    //   query = query.sort(sortBy);
    // } else {
    //   query = query.sort('-createdAt');
    // }

    //LIMIT FEILDS
    // if (req.query.feilds) {
    //   const feilds = req.query.feilds.split(',').join(' ');
    //   //feilds = ['name', 'price','description',]
    //   query = query.select(feilds);
    // } else {
    //   query = query.select('-__v');
    // }

    //PAGINATION

    // const page = +req.query.page || 1;
    // const limit = +req.query.limit || 10;
    // const skip = (page - 1) * limit;
    // //console.log(skip);

    // query = query.skip(skip).limit(limit);

    // if (req.query.page) {
    //   const numDocs = await Tour.countDocuments();
    //   if (skip >= numDocs) {
    //     throw new Error('You have reached the end of the page');
    //   }
    // }
    //EXECUTE QUERY
    const apiFeatures = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFeilds()
      .paginate();

    const tours = await apiFeatures.query;

    res.status(200).json({
      status: 'success',
      length: tours.length,
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

exports.getTourStats = async (req, res) => {
  try {
    const stats = await Tour.aggregate([
      //Aggregation/Pipeline Stages
      {
        //Filters all TRUE feilds
        $match: { ratingsAverage: { $gte: 4.5 } },
      },
      {
        //Specify the ID: Group by this ID
        $group: {
          _id: '$difficulty',
          //_id: '$difficulty',
          //Set name(s) of feild
          numTours: { $sum: 1 },
          sumRatings: { $sum: '$ratingsQuantity' },
          avgRating: { $avg: '$ratingsAverage' },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
        },
      },
    ]);
    res.status(200).json({
      status: 'success',
      data: {
        stats,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: `ERR:: => GET FAIL:: => ${err}`,
    });
  }
};

exports.getMothlyPlan = async (req, res) => {
  try {
    const year = +req.params.year; //2021

    const plan = await Tour.aggregate([
      {
        $unwind: '$startDates', //Destructure || Splits the feild
      },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        plan,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: `ERR:: => GET FAIL:: => ${err}`,
    });
  }
};
