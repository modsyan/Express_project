const fs = require("fs");
const express = require("express");
const app = express();

app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get("/api/v1/tours/", (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      tours,
    },
  });
});

// ? for optional parameters /api/v1/tours/:id/:name?/:age?/

app.get("/api/v1/tours/:id", (req, res) => {
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
});

app.post("/api/v1/tours/", (req, res) => {
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
});

app.patch("/api/v1/tours/:id", (req, res) => {
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
});

/** NEEDED TO MAINTAINS */
// app.patch("/api/v1/:id", (req, res) => {
//   // search if the id here
//   const updatedTour = tours.find((el) => el.id == req.params.id);
//   if (!updatedTour) {
//     res.status(404).json({
//       status: "fail",
//       message: "Invalid ID",
//       Descriptions: "out of range id.",
//     });
//   }
//   tours
//   const updateTour = res.body;
//   fs.writeFile(
//     `${__dirname}/dev-data/data/tours-simple.json`,
//     JSON.stringify(tours),
//   );

//   res.status(200).json({
//     status:"success",
//     message:"Updated successfully",
//     data:{
//       res.body;
//     }
//   })
// });

app.delete("/api/v1/tours/:id", (req, res) => {
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
});

const port = 3200;
app.listen(port, () => {
  console.log(`App Running at ${port} Port Number...`);
});
