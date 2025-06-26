import {env} from "@/config/env";
import {createApp} from "@/bootstrap";
import connectToDatabase from '@/database/mongodb';
import { logger } from '@/utils/logger';

const app = createApp();

app.listen(env.PORT, async () => {
  logger.info(`Personal Finance API Server started at http://localhost:${env.PORT} ...`)

  await connectToDatabase();
});
