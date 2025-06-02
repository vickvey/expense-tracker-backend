import express, { Request, Response } from 'express';
import { ApiResponse } from './lib/apiResponse';
import loggerMiddleware from './middleware/logger.middleware';
import errorMiddleware from './middleware/error.middleware';
import authRouter from './routes/auth.routes';
// import userRouter from './routes/user.routes';
// import categoryRouter from './routes/category.routes';
// import transactionRouter from './routes/transaction.routes';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(loggerMiddleware);

app.get('/', (req: Request, res: Response) => {
  return ApiResponse.success(res, 200, 'Expense Tracker API is live !!');
});

app.use('/api/v1/auth', authRouter);
// app.use('/api/v1/user', userRouter);
// app.use('/api/v1/category', categoryRouter);
// app.use('/api/v1/transaction', transactionRouter);

app.all('/*splat', (req: Request, res: Response) => {
  return ApiResponse.error(res, 'Not Found', 404);
});

app.use(errorMiddleware);

export default app;
