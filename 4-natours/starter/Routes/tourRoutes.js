const express = require('express');
const tourController = require('../Controllers/tourController');

const { getAllTours, addTour, getSingleTour, editTour, deleteTour } =
  tourController;
//ROUTER
const router = express.Router();
//ROUTES
router.route('/').get(getAllTours).post(addTour);
router.route('/:id').get(getSingleTour).patch(editTour).delete(deleteTour);

module.exports = router;
