import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../lib/apiResponse';
import { CustomError } from '../lib/customError';
import { NODE_ENV } from '../config/env';

const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(`
  [ERROR]: ${err.statusCode || 500} - ${err.message} - ${req.method} - ${req.originalUrl}`);

  if (err.name === 'CastError') {
    return ApiResponse.error(res, 'Resource not found', 404);
  }

  if (err.code === 11000) {
    return ApiResponse.error(res, 'Duplicate field value entered', 400);
  }

  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors)
      .map((val: any) => val.message)
      .join(', ');
    return ApiResponse.error(res, message, 400);
  }

  // Default error response
  const statusCode = (err as CustomError).statusCode || 500;
  const message = err.message || 'Internal Server Error';

  // Include stack trace in errorData for development mode
  const isDev = NODE_ENV === 'development';
  const errorData = isDev ? { stack: err.stack } : undefined;

  return ApiResponse.error(res, message, statusCode, errorData);
};

export default errorMiddleware;
