const express = require('express');
const tourController = require('../Controllers/tourController');

//Controllers
const {
  //checkID,
  //bodyChecker,
  easyTours,
  cheap5Tours,
  getAllTours,
  addTour,
  getSingleTour,
  editTour,
  deleteTour,
  getTourStats,
  getMothlyPlan,
} = tourController;

//ROUTER
const router = express.Router();

//ROUTES
// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', addTour);
// app.get('/api/v1/tours/:id', getSingleTour);
// app.patch('/api/v1/tours/:id', editTour);

// router.param('id', checkID);

router.route('/top-5-cheap-tours').get(cheap5Tours, getAllTours);
router.route('/easy-tours').get(easyTours, getAllTours);

router.route('/tour-stats').get(getTourStats);
router.route('/monthly-plan/:year').get(getMothlyPlan);

router.route('/').get(getAllTours).post(addTour);
router.route('/:id').get(getSingleTour).patch(editTour).delete(deleteTour);

module.exports = router;
