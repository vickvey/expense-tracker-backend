import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import User from '@/models/user.model';
import { ApiResponse } from '@/lib/apiResponse';
import { env } from '@/config/env';
import { JwtPayload, AuthRequest } from '@/types';

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
        401,
        'No token provided, Please provide auth token',
      );
    }

    // Extract token
    const token = authHeader.split(' ')[1];
    if (!token) {
      return ApiResponse.error(res, 401, 'Invalid token format');
    }

    const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;

    // Find user
    const user = await User.findById(decoded.userId);
    if (!user) {
      return ApiResponse.error(res, 401, 'User not found');
    }

    // TODO: (Optional) Add additional user validation (e.g., check if user is active)
    // if (!user.isActive) {
    //   return ApiResponse.error(res, 'User account is deactivated', 401);
    // }

    // Attach user to request
    req.user = { id: user._id, role: user.role };
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return ApiResponse.error(res, 401, 'Token expired', error);
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return ApiResponse.error(res, 401, 'Invalid token', error);
    }
    return ApiResponse.error(res, 401, 'Unauthorized', error);
  }
};

function isAdmin(req: AuthRequest, res: Response, next: NextFunction) {
  if (req.user?.role !== 'admin') {
    return ApiResponse.error(res, 403, 'Forbidden: Admins only');
  }
  next();
}

export { authorize, isAdmin };
