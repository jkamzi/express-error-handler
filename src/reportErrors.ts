import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import createErrorResponse from './createErrorResponse';
import HttpError from './errors/HttpError';
import isHttpError from './isHttpError';

export default function reportErrors(
  isDevelopment = false,
): ErrorRequestHandler {
  return (
    err: Error | HttpError,
    req: Request,
    res: Response,
    next: NextFunction,
  ): Response | void => {
    if (!isHttpError(err)) {
      return next(err);
    }

    const message = createErrorResponse(err, isDevelopment);
    res.set('content-type', 'application/problem+json');

    return res.status(err.status).json({
      error: message,
    });
  };
}
