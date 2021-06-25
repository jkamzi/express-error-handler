import HttpError from './HttpError';

export default class InternalServerError extends HttpError {
  public static DEFAULT_MESSAGE = 'Internal Server Error';

  constructor(message?: string, previous?: Error) {
    super(500, message || InternalServerError.DEFAULT_MESSAGE, previous);
  }
}
