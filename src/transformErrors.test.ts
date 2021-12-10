import { Request, Response } from 'express';
import HttpError from './errors/HttpError';
import InternalServerError from './errors/InternalServerError';
import transformErrors, { ErrorTransformer } from './transformErrors';

describe('transformErrors', () => {
  it('Should transform SomeError to HttpError', () => {
    const error = new Error('SomeError');
    error.name = 'SomeError';

    const next = jest.fn();
    const transformer: ErrorTransformer = {
      SomeError: (err: Error) => new HttpError(400, 'Bad Request', err),
    };

    transformErrors(transformer)(error, {} as Request, {} as Response, next);
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(new HttpError(400, 'Bad Request', error));
  });

  it('Should not catch all unknown errors when transformUnknownErrors is false', () => {
    const next = jest.fn();
    const error = new Error('SomeError');

    transformErrors({}, false)(error, {} as Request, {} as Response, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(error);
  });

  it('Should not catch HttpErrors', () => {
    const next = jest.fn();
    const error = new HttpError(400, 'Bad Request');
    transformErrors({}, true)(error, {} as Request, {} as Response, next);

    expect(next).toHaveBeenCalledWith(error);
  });

  it('Should catch all unknown errors when transformUnknownErrors is true', () => {
    const next = jest.fn();
    const error = new Error('SomeError');

    transformErrors({}, true)(error, {} as Request, {} as Response, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(
      new InternalServerError(InternalServerError.DEFAULT_MESSAGE, error),
    );
  });

  it('Should be possible to pass along the initial error', () => {
    const error = new Error('SomeError');
    error.name = 'SomeError';

    const next = jest.fn();
    const transformer: ErrorTransformer = {
      SomeError: (err: Error) => {
        if (err.message !== 'SomeError') {
          return new HttpError(400, 'Bad Request');
        }

        return err;
      },
    };

    transformErrors(transformer)(error, {} as Request, {} as Response, next);
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(error);
  });
});
