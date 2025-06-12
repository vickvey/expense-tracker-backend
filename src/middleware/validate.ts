import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import { ApiResponse } from '@/lib/apiResponse';

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
        return ApiResponse.error(res, 400, 'Validation Error', e.issues);
      }
      return ApiResponse.error(
        res,
        400,
        '[VALIDATE MIDDLEWARE INTERNAL ERROR]',
        e,
      );
    }
  };

export default validate;
