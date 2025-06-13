import express, { Request, Response } from 'express';
import { ApiResponse } from '@/lib/apiResponse';
import loggerMiddleware from '@/middleware/logger.middleware';
import { isAdmin, authorize } from '@/middleware/auth.middleware';
import errorMiddleware from '@/middleware/error.middleware';
import authRouter from '@/routes/auth.routes';
import categoryRouter from '@/routes/category.routes';
import adminRouter from '@/routes/admin.routes';
import transactionRouter from '@/routes/transaction.routes';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(loggerMiddleware);

app.get('/', (req: Request, res: Response) => {
  return ApiResponse.success(res, 200, 'Personal Finance API is live !!', {
    method: req.method,
    headers: req.headers,
  });
});

app.use('/api/v1/auth', authRouter);

// app.use('/api/v1/user', authorize, userRouter); // TODO: Update it later

app.use('/api/v1/admin', authorize, isAdmin, adminRouter); // TODO: Complete this
app.use('/api/v1/category', authorize, categoryRouter);
app.use('/api/v1/transaction', authorize, transactionRouter);

app.all('/*splat', (req: Request, res: Response) => {
  console.error(`ERROR: ${req.url} is not found`);
  return ApiResponse.error(res, 404, 'Invalid url route');
});

app.use(errorMiddleware);

export default app;
