const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const tourModel = require('../model/tourModel');

dotenv.config({ path: '../config.env' });
const DB = process.env.DATABASE_REMOTE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then((connection) => {
  console.log(
    'DB Connected Successfully with:',
    connection.connection.db.namespace
  );
});

const tours = JSON.parse(fs.readFileSync('./data/tours-simple.json', 'utf-8'));

/// import data to the database

const importData = async () => {
  try {
    await tourModel.create(tours);
    console.log('Data Successfully loaded');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

const DeleteOldData = async () => {
  try {
    await tourModel.deleteMany();
    console.log('All Docs Deleted :=)');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

// for (let tour of tours) {
//   try {
//     tourModel.create(tour)
//   } catch (err) {
//     console.log(err);
//   }
// }
// console.log(process.argv);
if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  DeleteOldData();
} else {
  console.log('Error, Usage: --import, --delete');
}
