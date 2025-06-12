import mongoose from 'mongoose';
import { env } from '@/config/env';

const connectToDatabase = async () => {
  try {
    await mongoose.connect(env.DB_URI);
    console.log(`INFO: Database connected in ${env.NODE_ENV} mode`);
  } catch (e) {
    console.error(`ERROR: Error connecting database: ${e}`);
    await mongoose.disconnect();
    process.exit(1);
  }
};

export default connectToDatabase;
