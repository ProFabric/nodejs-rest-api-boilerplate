const mongoose = require('mongoose');
const constants = require('./constants');

mongoose.set('useCreateIndex', true);

try {
  mongoose.connect(constants.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
} catch (error) {
  mongoose.createConnection(constants.MONGO_URL);
}

// eslint-disable-next-line no-console
mongoose.connection.once('open', () => console.log('MongoDB is connected'));
