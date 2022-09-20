const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is Missing, The Name Used as An Identifier with id's"],
    unique: true,
    trim: true,
  },
  duration: {
    type: Number,
    required: [true, 'A tour must have duration time'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour must have a groub size'],
  },
  difficulty: {
    type: String,
    required: [true, 'A tour must have a difficulty'],
    trim: true,
  },
  rattingAverage: {
    type: Number,
    default: 4.5,
  },
  rattingQuantity: {
    type: Number,
    defualt: 0,
  },
  price: {
    type: Number,
    required: [true, 'The Price is Missing'],
  },
  priceDisscount: {
    type: Number
  },
  summary: {
    type: String,
    trim: true,
    required: [true, 'A tour must have a discription'],
  },
  discription: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, "A tour must have a cover"],
  },
  imagese: [String], // array of strings [datayype here of the array]
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  startDates: [Date],
});


const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
