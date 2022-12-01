import 'reflect-metadata';

import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import 'express-async-errors';

import routes from './routes';
import AppError from './errors/AppError';

import './database';

const app = express();

app.use(cors({}))

app.use(express.json());

app.use(routes);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.log(err);

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3333, () => {
  console.log('Server started on port 3333');
});
