const fs = require("fs");
const express = require("express");
const app = express();

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

const port = 4000;
app.listen(port, () => {
  console.log(`App Running at ${port} Port Number...`);
});
