import { NextFunction, Request, Response } from 'express';
import createErrorResponse from './createErrorResponse';
import { NotFoundError } from './errors';

export default function handleNotFoundErrors(
  req: Request,
  res: Response,
  next: NextFunction,
): Response {
  const err = new NotFoundError();
  const json = createErrorResponse(err);

  return res.status(404).json({ error: json });
}
