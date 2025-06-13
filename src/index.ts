import {env} from "@/config/env";
import app from './server';
import connectToDatabase from './database/mongodb';

app.listen(env.PORT, async () => {
  console.log(
    `INFO: Personal Finance API Server started at http://localhost:${env.PORT} ...`,
  );

  await connectToDatabase();
});
