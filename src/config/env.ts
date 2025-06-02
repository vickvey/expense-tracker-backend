import { config } from 'dotenv';
import { CustomError } from '../lib/customError';

config({
  path: `.env.${process.env.NODE_ENV || 'development'}.local`,
});

const { PORT, NODE_ENV, DB_URI, JWT_SECRET, JWT_EXPIRES_IN } = process.env;

// Validate environment variables
if (!PORT || !NODE_ENV || !DB_URI || !JWT_SECRET || !JWT_EXPIRES_IN) {
  throw new CustomError('Environment variables not set', 400);
}

// Assert types as string
export const env = {
  PORT: PORT as string | number,
  NODE_ENV: NODE_ENV as 'development' | 'production' | 'testing',
  DB_URI: DB_URI as string,
  JWT_SECRET: JWT_SECRET as string,
  JWT_EXPIRES_IN: JWT_EXPIRES_IN as string | number,
};
