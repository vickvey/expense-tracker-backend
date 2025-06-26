import mongoose from 'mongoose';
import { env } from '@/config/env';
import logger from '@/utils/logger';

const connectToDatabase = async () => {
  try {
    await mongoose.connect(env.MONGODB_URI);
    logger.info(`Database connected in **${env.NODE_ENV}** mode`);
  } catch (e) {
    logger.error(`Error connecting database: ${e}`);
    await mongoose.disconnect();
    process.exit(1);
  }
};

export default connectToDatabase;
