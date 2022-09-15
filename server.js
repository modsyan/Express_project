const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });

const app = require('./app');

// mongo setup

const DB = process.env.DATABASE_REMOTE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose.connect(DB).then((con) => {
  console.log('DB Connection Successfually');
});

app.listen(port, () => {
  console.log(`App Running at ${port} Port Number...`);
});
