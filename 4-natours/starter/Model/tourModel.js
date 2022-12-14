const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlenght: [100, 'Max lenght reached. Reduce the characters used.'],
    minlenght: [50, 'Max lenght reached. Reduce the characters used.'],
  },
  duration: {
    type: Number,
    required: [true, 'A tour must have a duration'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour must have a group size'],
  },
  ratingsAverage: {
    type: Number,
    min: [1, 'Min rating should be 1. Change rating.'],
    max: [5, 'Max rating should be 5. Change rating.'],
    default: 4.5,
  },
  ratingQuantity: {
    type: Number,
    default: 0,
  },
  difficulty: {
    type: String,
    required: [true, 'A tour must have a difficulty level'],
    enum: {
      values: ['easy', 'hard', 'difficult'],
      message: 'Only easy, hard and difficult are accepted as difficulty.',
    },
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true,
    required: [true, 'A tour summary must have a details'],
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, 'A tour must have a cover'],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  startDates: [Date],
  secretTour: {
    type: Boolean,
    default: false,
  },
  //...of tour property
});

//QUERY MIDDLEWARE
//'find'
tourSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });
  next();
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
