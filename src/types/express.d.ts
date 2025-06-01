import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    // Add any other fields attached by your auth middleware
  };
}
