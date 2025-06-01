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
    console.log(`[RESPONSE]: Success - ${statusCode} - ${message}`);
    this.send(res, statusCode, true, message, data);
  }

  // Optional shortcut for error
  static error(
    res: Response,
    message: string,
    statusCode = 400,
    errorData?: any,
  ) {
    console.error(`[RESPONSE]: Error - ${statusCode} - ${message}`);
    this.send(res, statusCode, false, message, errorData);
  }
}
