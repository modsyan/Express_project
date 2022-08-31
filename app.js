const fs = require("fs");
const express = require("express");
const app = express();

app.use(express.json());

// app.get("/", (req, res) => {
//   // res.status(200).send("Hello from Server Side!");
//   res.status(200).json({
//     msg: "Hello from server side!",
//     app: "first app using express js framework",
//     date: "Aug 31 2022",
//   });
// });

// app.post('/', (req, res) => {
//   res.status(200).send("you can post to this url now...");
// });

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

const port = 4000;
app.listen(port, () => {
  console.log(`App Running at ${port} Port Number...`);
});
