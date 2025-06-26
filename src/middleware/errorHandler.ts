import { Request, Response, NextFunction } from "express";

interface CustomError extends Error {
    status?: number;
}

function errorHandler(
    err: CustomError,
    _req: Request,
    res: Response,
    _next: NextFunction
) {
    const statusCode = err.status || 500;
    const message = err.message || "Internal Server Error";

    res.status(statusCode).json({ message });
}

export { errorHandler };
