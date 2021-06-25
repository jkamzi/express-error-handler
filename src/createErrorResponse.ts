/**
 * Copyright (c) Rikard Jansson
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import HttpError from './errors/HttpError';

export type PreviousErrorBody = {
  message?: string;
  stack?: string;
};

export type ErrorDevelopmentBody = {
  stack?: string;
  previous?: PreviousErrorBody;
};

export type JsonErrorResponse = {
  message: string;
  status: number;
  type: string;
};

export type JsonErrorDevelopmentResponse = JsonErrorResponse &
  ErrorDevelopmentBody;

/**
 *
 * @param err
 * @param isDevelopment
 */
export default function createErrorResponse(
  err: HttpError,
  isDevelopment = false,
): JsonErrorResponse | JsonErrorDevelopmentResponse {
  if (isDevelopment) {
    return {
      message: err.message,
      status: err.status,
      type: err.name,
      stack: err.stack,
      ...(err.previous && {
        previous: {
          message: err.previous?.message,
          stack: err.previous?.stack,
        },
      }),
    };
  }

  return {
    message: err.message,
    status: err.status,
    type: err.name,
  };
}
