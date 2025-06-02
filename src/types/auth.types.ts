import { Request } from 'express';

export interface JwtPayload {
  userId: string;
  [key: string]: any; // Allow additional fields if needed
}

export interface AuthRequest extends Request {
  user?: { id: string };
}
