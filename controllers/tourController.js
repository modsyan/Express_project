const Tour = require('../model/tourModel');

exports.getTours = async (req, res) => {
  try {
    //  Build query
    // 1) basic filter
    const queryObj = { ...req.query };
    const excludedFields = ['fields', 'limit', 'sort', 'page'];
    excludedFields.forEach((el) => delete queryObj[el]);
    // console.log(queryObj, req.query);
    // my note -> what is the purpose of exclude elements ?? allow specific fillers not the opposite

    // 2) advance filtering

    let queryModified = JSON.stringify(queryObj).replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );
    queryModified = JSON.parse(queryModified);

    const query = Tour.find(queryModified);

    // mongoose gives as a sql query like that
    // const tours = await Tour.find()
    //   .where('duration')
    //   .equals(5)
    //   .where('difficultly')
    //   .equals('easy');

    // 2] Execute query
    const tours = await query;
    // 3] sent response

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
