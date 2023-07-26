import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import process from 'process';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { errors } from 'celebrate';

import {
  messages,
  statusCodes,
  DATABASE_URL,
} from './utils/constants.js';
import NotFoundError from './errors/NotFoundError.js';
import router from './routes/index.js';
import { requestLogger, errorLogger } from './middlewares/logger.js';

const { PORT = 3000 } = process.env;
const app = express();
mongoose.connect(DATABASE_URL);
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(helmet());
app.use(limiter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(requestLogger);

app.use('/', router);
app.all('*', (req, res, next) => {
  next(new NotFoundError());
});

app.use(errorLogger);
app.use(errors({ statusCode: statusCodes.BAD_REQUEST, message: messages.VALIDATION_ERROR }));
app.use((err, req, res, next) => {
  const { statusCode = statusCodes.INTERNAL_SERVER_ERROR, message } = err;
  const isUnknownError = statusCode === statusCodes.INTERNAL_SERVER_ERROR;
  res
    .status(statusCode)
    .send({ message: isUnknownError ? messages.INTERNAL_SERVER_ERROR : message });
  next();
});

app.listen(PORT, () => {});
