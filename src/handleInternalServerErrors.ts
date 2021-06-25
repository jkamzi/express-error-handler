import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import createErrorResponse from './createErrorResponse';
import HttpError from './errors/HttpError';

/**
 * Copyright (c) Rikard Jansson
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
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
