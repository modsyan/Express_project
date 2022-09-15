const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkIDTravial = (req, res, next, val) => {
  if (val * 1 > tours.length) {
    return res.status(404).json({
      status: 'faild',
      message: 'Not Found ID',
    });
  }
  next();
};

// @ts-ignore
exports.checkID = (req, res, next, val) => {
  if (!tours.some((e) => e.id == val)) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
      Descriptions: 'out of range id.',
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(404).json({
      status: 'fail',
      message: 'invaild properties, body is wrong',
    });
  }
  next();
};

exports.getTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    data: {
      tours,
    },
  });
};

exports.getTour = (req, res) => {
  const tour = tours.find((el) => el.id === req.params.id * 1);
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json(newTour);
    }
  );
};

exports.UpdateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: 'Updated <SUCCESS>',
    },
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
