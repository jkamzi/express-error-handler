import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { isHttpError } from '.';
import HttpError from './errors/HttpError';
import InternalServerError from './errors/InternalServerError';

export type ErrorTransformer = {
  [key: string]: (err: Error) => HttpError | Error;
};

function addCatchAll(defaultTransformers: ErrorTransformer): ErrorTransformer {
  return {
    '*': (err: Error) =>
      new InternalServerError(InternalServerError.DEFAULT_MESSAGE, err),
    ...defaultTransformers,
  };
}

export default function transformErrors(
  transformers: ErrorTransformer = {},
  transformUnknownErrors = true,
): ErrorRequestHandler {
  const defaultTransformers = transformUnknownErrors
    ? addCatchAll(transformers)
    : transformers;

  return (
    err: Error | HttpError,
    req: Request,
    res: Response,
    next: NextFunction,
  ): void => {
    const keys = Object.keys(defaultTransformers);
    if (isHttpError(err)) {
      return next(err);
    }

    if (keys.includes(err.name)) {
      return next(defaultTransformers[err.name](err));
    }

    if (keys.includes('*')) {
      return next(defaultTransformers['*'](err));
    }

    /**
     * If we do not include a catch all transformer, it is up to the
     * user to handle the errors.
     */
    return next(err);
  };
}
