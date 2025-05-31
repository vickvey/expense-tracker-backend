import express, {Request, Response} from "express";
import {ApiResponse} from "./lib/apiResponse";
import loggerMiddleware from "./middleware/logger.middleware";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(loggerMiddleware);


app.get('/', (req, res) => {
    ApiResponse.success(res, 200, 'Expense Tracker API is live !!');
});

app.all('/*splat', (req: Request, res: Response) => {
    ApiResponse.error(res, 'Not Found', 404);
});

// app.use(errorMiddleware);

export default app;
