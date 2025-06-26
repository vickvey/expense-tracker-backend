import { createLogger, format, transports } from 'winston';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { combine, timestamp, printf, colorize } = format;

// Custom log format
const customFormat = printf(({ level, message, timestamp, context }) => {
  return `[${timestamp}] [${level.toUpperCase()}]${
    context ? ` [${context}]` : ''
  }: ${message}`;
});

const logger = createLogger({
  level: 'info',
  format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), customFormat),
  transports: [
    new transports.Console({
      format: combine(
        colorize(),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        customFormat,
      ),
    }),
    new transports.File({
      filename: path.join(__dirname, '..', 'logs', 'combined.log'),
    }),
    new transports.File({
      filename: path.join(__dirname, '..', 'logs', 'error.log'),
      level: 'error',
    }),
  ],
});

// Logger wrapper
export const appLogger = {
  info: (message: string, context?: string) =>
    logger.info(message, { context }),
  error: (message: string, context?: string) =>
    logger.error(message, { context }),
  warn: (message: string, context?: string) =>
    logger.warn(message, { context }),
  debug: (message: string, context?: string) =>
    logger.debug(message, { context }),
};

export default appLogger;
