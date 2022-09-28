const Tour = require('../model/tourModel');
const APIFeatures = require('../utils/apiFeatures');

// http://127.0.0.1:3200/api/v1/tours?sort=price,-rattingAverage&field=name,rattingAverage,duractoin,difficulty,price&limit=5
exports.top5cheap = (req, res, next) => {
  req.query = {
    ...req.query,
    sort: 'price,-rattingAverage',
    limit: '5',
    field: 'name,rattingAverage,duration,difficulty,price',
  };
  next();
};

exports.getTours = async (req, res) => {
  try {
    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const tours = await features.query;

    res.status(200).json({
      status: 'success',
      result: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fails',
      message: err,
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findOne({ _id: req.params.id });
    res.status(200).json({
      status: 'success',
      tour,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fails',
      message: err,
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(200).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fails',
      message: err,
    });
  }
};

exports.UpdateTour = async (req, res) => {
  try {
    // const statusMsg = await Tour.updateOne(
    //   { _id: req.params.id },
    //   { $set: { ...req.body } }
    // );
    // const updatedTour = await Tour.findOne({ _id: req.params.id });
    // to save time and bandwidth use only updateOne() but if u want to return updated doc use findOneAndUpdate() method easier of the left

    const updatedTour = await Tour.findOneAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        tour: updatedTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    // await Tour.deleteOne({ _id: req.params.id });
    await Tour.findOneAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fails',
      data: err,
    });
  }
};
