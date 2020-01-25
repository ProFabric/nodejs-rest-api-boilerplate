const mongoose = require('mongoose');
const constants = require('./constants');

try {
  mongoose.connect(constants.MONGO_URL);
} catch (error) {
  mongoose.createConnection(constants.MONGO_URL);
}

// eslint-disable-next-line no-console
mongoose.connection.once('open', () => console.log('MongoDB is connected'));
