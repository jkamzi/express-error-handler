import HttpError from './errors/HttpError';

export default function isHttpError(err: HttpError | Error): err is HttpError {
  return (err as HttpError).isHttpError === true;
}
