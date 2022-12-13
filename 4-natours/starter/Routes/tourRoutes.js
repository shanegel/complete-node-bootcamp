const express = require('express');
const tourController = require('../Controllers/tourController');

const {
  //checkID,
  //bodyChecker,
  getAllTours,
  addTour,
  getSingleTour,
  editTour,
  deleteTour,
} = tourController;

//ROUTER
const router = express.Router();

// router.param('id', checkID);
//ROUTES
// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', addTour);
// app.get('/api/v1/tours/:id', getSingleTour);
// app.patch('/api/v1/tours/:id', editTour);

router.route('/').get(getAllTours).post(addTour);
router.route('/:id').get(getSingleTour).patch(editTour).delete(deleteTour);

module.exports = router;
