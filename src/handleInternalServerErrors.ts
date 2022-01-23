import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import createErrorResponse from './createErrorResponse';
import HttpError from './errors/HttpError';

export default function handleInternalServerError(
  isDevelopment = false,
): ErrorRequestHandler {
  return (
    err: HttpError,
    req: Request,
    res: Response,
    next: NextFunction,
  ): Response => {
    const json = createErrorResponse(err, isDevelopment);

    return res.status(500).json({ error: json });
  };
}
