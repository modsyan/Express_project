const express = require('express');
const fs = require('fs');

const router = express.Router();

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

const getTours = (req, res) => {
  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    data: {
      tours,
    },
  });
};
const getTour = (req, res) => {
  const tour = tours.find((el) => el.id == req.params.id);
  if (!tour) {
    res.status(404).json({
      status: "fail",
      message: "Invalid ID",
      Descriptions: "out of range id.",
    });
  }
  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
};
const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  let newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json(newTour);
    }
  );
};
const UpdateTour = (req, res) => {
  if (req.params.id > tours.length) {
    res.status(404).json({
      status: "fail",
      message: "Invalid ID",
      Descriptions: "out of range id.",
    });
  }
  console.log(req.body);
  res.status(200).json({
    status: "success",
    data: {
      tour: "Updated <SUCCESS>",
    },
  });
};
const deleteTour = (req, res) => {
  if (req.params.id > tours.length) {
    res.status(404).json({
      status: "fail",
      message: "Invalid ID",
      Descriptions: "out of range id.",
    });
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
};

router
  .route('/')
  .get(getTours)
  .post(createTour);

router
  .route("/:id")
  .get(getTour)
  .patch(UpdateTour)
  .delete(deleteTour);


module.exports = router;
