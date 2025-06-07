import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { User } from '../models/user.model';
import { ApiResponse } from '../lib/apiResponse';
import { env } from '../config/env';
import { JwtPayload, AuthRequest } from '../types';

const authorize = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Check for authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return ApiResponse.error(
        res,
        'No token provided, Please provide auth token',
        401,
      );
    }

    // Extract token
    const token = authHeader.split(' ')[1];
    if (!token) {
      return ApiResponse.error(res, 'Invalid token format', 401);
    }

    const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;

    // Find user
    const user = await User.findById(decoded.userId);
    if (!user) {
      return ApiResponse.error(res, 'User not found', 401);
    }

    // TODO: (Optional) Add additional user validation (e.g., check if user is active)
    // if (!user.isActive) {
    //   return ApiResponse.error(res, 'User account is deactivated', 401);
    // }

    // Attach user to request
    req.user = { id: user.id };
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return ApiResponse.error(res, 'Token expired', 401, error);
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return ApiResponse.error(res, 'Invalid token', 401, error);
    }
    return ApiResponse.error(res, 'Unauthorized', 401, error);
  }
};

export default authorize;
