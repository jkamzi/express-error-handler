import HttpError from './HttpError';

export default class NotFoundError extends HttpError {
  public static DEFAULT_MESSAGE = 'Not Found Error';

  constructor(message?: string) {
    super(404, message || NotFoundError.DEFAULT_MESSAGE);
  }
}
