import {Request, Response, NextFunction} from "express";

const loggerMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction) => {
    console.log(`[REQ] - ${req.method} - ${req.originalUrl}`);
    next();
}

export default loggerMiddleware;
