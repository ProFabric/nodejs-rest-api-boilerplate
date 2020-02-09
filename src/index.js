import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import compression from 'compression';
import helmet from 'helmet';
import passport from 'passport';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import routes from './routes';

dotenv.config();

// DB CONNECTION START

mongoose.set('useCreateIndex', true);

try {
  mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
} catch (error) {
  mongoose.createConnection(process.env.DATABASE_URL);
}

// eslint-disable-next-line no-console
mongoose.connection.once('open', () => console.log('MongoDB is connected'));

// DB CONNECTION END

const app = express();
const port = process.env.PORT || 8080;

const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

if (isProd) {
  app.use(compression());
  app.use(helmet());
}

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());

if (isDev) {
  app.use(morgan('dev'));
}

app.use('/v1', routes);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'App is running!' });
});

app.get('*', (req, res) => {
  res.status(404).json({ status: false, message: 'Not found' });
});

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`App is running on ${port}`));
