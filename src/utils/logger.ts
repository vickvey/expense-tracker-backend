// src/logger.ts
import winston from "winston";
import { env } from "@/config/env";

const logger = winston.createLogger({
  level: env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.colorize(),             // Color output
    winston.format.timestamp(),            // Add timestamp
    winston.format.printf(({ level, message, timestamp }) => {
      return `${timestamp} [${level}]: ${message}`;
    }),
  ),
  transports: [new winston.transports.Console()],
});

export { logger };
