import { NextFunction, Request, Response } from 'express';
import createErrorResponse from './createErrorResponse';
import { NotFoundError } from './errors';

/**
 * Copyright (c) Rikard Jansson
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
export default function handleNotFoundErrors(
  req: Request,
  res: Response,
  next: NextFunction,
): Response {
  const err = new NotFoundError();
  const json = createErrorResponse(err);

  return res.status(404).json({ error: json });
}
