import app from './server';
import connectToDatabase from './database/mongodb';

app.listen(5500, async () => {
  console.log(`Expense Tracker Server started at http://localhost:5500 ...`);

  await connectToDatabase();
});
