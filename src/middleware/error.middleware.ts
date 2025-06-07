import { Request, Response } from 'express';
import { ApiResponse } from '../lib/apiResponse';
import { CustomError } from '../lib/customError';
import { env } from '../config/env';

const errorMiddleware = (err: any, req: Request, res: Response) => {
  console.error(`
  [ERROR]: ${err.statusCode || 500} - ${err.message} - ${req.method} - ${req.originalUrl}`);

  if (err.name === 'CastError') {
    return ApiResponse.error(res, 404, 'Resource not found');
  }

  if (err.code === 11000) {
    return ApiResponse.error(res, 400, 'Duplicate field value entered');
  }

  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors)
      .map((val: any) => val.message)
      .join(', ');
    return ApiResponse.error(res, 400, message);
  }

  // Default error response
  const statusCode = (err as CustomError).statusCode || 500;
  const message = err.message || 'Internal Server Error';

  // Include stack trace in errorData for development mode
  const isDev = env.NODE_ENV === 'development';
  const errorData = isDev ? { stack: err.stack } : undefined;

  return ApiResponse.error(res, statusCode, message, errorData);
};

export default errorMiddleware;
