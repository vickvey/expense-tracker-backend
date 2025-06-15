import { logger } from '@/logger';
import { Response } from 'express';

export class ApiResponse {
  private static send<T>(
    res: Response,
    statusCode: number,
    success: boolean,
    message: string,
    data?: T,
  ) {
    res.status(statusCode).json({
      success,
      message,
      data,
    });
  }

  // Optional shortcut method for successful response
  static success<T>(
    res: Response,
    statusCode = 200,
    message: string,
    data?: T,
  ) {
    logger.info(`Success - ${statusCode} - ${message}`)
    this.send(res, statusCode, true, message, data);
  }

  // Optional shortcut for error
  static error<T>(
    res: Response,
    statusCode = 400,
    message: string,
    errorData?: T,
  ) {
    logger.error(`Response Error - ${statusCode} - ${message}`, statusCode, message);
    this.send(res, statusCode, false, message, errorData);
  }
}
