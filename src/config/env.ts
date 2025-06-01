import { config } from 'dotenv';
import { CustomError } from '../lib/customError';

config({
  path: `.env.${process.env.NODE_ENV || 'development'}.local`,
});

const { PORT, NODE_ENV, DB_URI, JWT_SECRET, JWT_EXPIRES_IN } = process.env;

if (!PORT || !NODE_ENV || !DB_URI || !JWT_SECRET || !JWT_EXPIRES_IN) throw new CustomError('Environment variables not set', 400)

export {PORT, NODE_ENV, DB_URI, JWT_SECRET, JWT_EXPIRES_IN};