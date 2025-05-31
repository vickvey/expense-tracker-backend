// utils/apiResponse.ts
import { Response } from 'express';

export class ApiResponse {
  static send<T>(
    res: Response,
    statusCode: number,
    success: boolean,
    message: string,
    data?: T,
  ) {
    if (success) {
      console.log(
        `[RES] - ${success ? 'success' : 'error'} - ${res.statusCode} - ${message}`,
      );
    } else {
      console.error(
        `[RES] - ${success ? 'success' : 'error'} - ${res.statusCode} - ${message}`,
      );
    }
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
    this.send(res, 200, true, message, data);
  }

  // Optional shortcut for error
  static error(
    res: Response,
    message: string,
    statusCode = 400,
    errorData?: any,
  ) {
    this.send(res, statusCode, false, message, errorData);
  }
}
