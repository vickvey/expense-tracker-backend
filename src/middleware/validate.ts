import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import { ApiResponse } from '../lib/apiResponse';

const validate =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (e) {
      if (e instanceof ZodError) {
        console.error(`[VALIDATION-ERROR]: `, e.errors);
        return ApiResponse.error(res, 'Validation Error', 400, e.issues);
      }
      return ApiResponse.error(
        res,
        '[VALIDATE MIDDLEWARE INTERNAL ERROR]',
        400,
        e,
      );
    }
  };

export default validate;
