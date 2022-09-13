const fs = require("fs");
const morgan = require("morgan"); // morgan module from npm
const express = require("express");
const app = express();

// [1] middleware

app.use(morgan("dev"));

app.use(express.json());


app.use((req, res, next) => {
  console.log("Hello from middle ware");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.requestTime);
  next();
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// [2] Route Handlers

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
    `${__dirname}/dev-data/data/tours-simple.json`,
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

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "this route not yet defined",
  });
};

const createNewUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "this route not yet defined",
  });
};

const getUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "this route not yet defined",
  });
};
const updateUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "this route not yet defined",
  });

};
const deleteUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "this route not yet defined",
  });
};

// app.get("/api/v1/tours/", getTours);
// app.post("/api/v1/tours/", createTour);
// app.get("/api/v1/tours/:id", getTour);
// app.patch("/api/v1/tours/:id", UpdateTour);
// app.delete("/api/v1/tours/:id", deleteTour);

// [3] Routes

const tourRouter = express.Router();
const userRouter = express.Router();

tourRouter
  .route('/')
  .get(getTours)
  .post(createTour);

tourRouter
  .route("/:id")
  .get(getTour)
  .patch(UpdateTour)
  .delete(deleteTour);

userRouter
  .route("/")
  .get(getAllUsers)
  .post(createNewUser);

userRouter
  .route(":id")
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

app.use('/api/v1/tours/', tourRouter);
app.use('/api/v1/users/', userRouter);

// [4] Starting the server

const port = 3200;
app.listen(port, () => {
  console.log(`App Running at ${port} Port Number...`);
});
