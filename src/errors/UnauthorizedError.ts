import HttpError from './HttpError';

export default class UnauthorizedError extends HttpError {
  public static DEFAULT_MESSAGE = 'Unauthorized Error';

  constructor(message?: string, previous?: Error) {
    super(401, message || UnauthorizedError.DEFAULT_MESSAGE, previous);
  }
}
