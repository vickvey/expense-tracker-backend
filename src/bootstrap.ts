import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import { errorHandler } from './middleware/errorHandler';
import { ApiResponse } from '@/utils/apiResponse';
import { isAdmin, authorize } from '@/middleware/auth.middleware';
import authRouter from '@/routes/auth.routes';
import userRouter from '@/routes/user.routes';
import categoryRouter from '@/routes/category.routes';
import adminRouter from '@/routes/admin.routes';
import transactionRouter from '@/routes/transaction.routes';

function setNecessaryMiddleware(_app: Express) {
  _app.use(cors());
  _app.use(express.json());
  _app.use(express.urlencoded({ extended: true }));
}

function setRoutes(_app: Express) {
  // Health Check
  _app.get('/', (_req: Request, res: Response) => {
    res.status(200).json({ message: 'Personal Finance API is live ...' });
  });

  // Public Route
  // _app.use('/api/v1/auth', authRouter);

  // Protected Access: Admin Only
  // _app.use('/api/v1/admin', authorize, isAdmin, adminRouter);

  // Protected Access: Admin and User
  // _app.use('/api/v1/user', authorize, userRouter);
  // _app.use('/api/v1/category', authorize, categoryRouter);
  // _app.use('/api/v1/transaction', authorize, transactionRouter);

  // Error for other routes
  _app.all('/*splat', (_req: Request, res: Response) => {
    return ApiResponse.error(res, 404, 'Invalid url route');
  });
}

// Factory function to create app
function createApp(): Express {
  // Create the app instance
  const app = express();

  // Glue necessary middleware
  setNecessaryMiddleware(app);

  // Glue custom routes
  setRoutes(app);

  // Glue error handlers
  app.use(errorHandler);

  return app;
}

export { createApp };
