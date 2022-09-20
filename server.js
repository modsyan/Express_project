const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });

const app = require('./app');

// Run Mode
console.log('MODE:', process.env.NODE_ENV);

// MongoDB setup
const DB = process.env.DATABASE_REMOTE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then((connection) => {
  console.log(
    'Connected Successfully with Database:',
    connection.connection.db.namespace
  );
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`App Running at ${port} Port Number...`);
});
