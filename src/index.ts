import {env} from "@/config/env";
import app from './server';
import connectToDatabase from './database/mongodb';
import { logger } from "./logger";

app.listen(env.PORT, async () => {
  logger.info(`Personal Finance API Server started at http://localhost:${env.PORT} ...`)

  await connectToDatabase();
});
