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
  return {
    message: err.message,
    status: err.status,
    type: err.name,
    ...(isDevelopment && {
      stack: err.stack,
      ...(err.previous && {
        previous: {
          message: err.previous?.message,
          stack: err.previous?.stack,
        },
      }),
    }),
  };
}
