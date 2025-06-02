import { Request } from 'express';

export interface JwtPayload {
  userId: string;
  [key: string]: any; // Allow additional fields if needed
}

export interface AuthRequest extends Request {
  user?: { id: string };
}

// Define input types for type safety
export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}
