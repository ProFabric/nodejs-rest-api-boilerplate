import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

mongoose.set('useCreateIndex', true);

try {
  mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
} catch (error) {
  mongoose.createConnection(process.env.DATABASE_URL);
}

// eslint-disable-next-line no-console
mongoose.connection.once('open', () => console.log('MongoDB is connected'));
