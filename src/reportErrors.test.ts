import { Request, Response } from 'express';
import HttpError from './errors/HttpError';
import reportErrors from './reportErrors';

describe('reportErrors', () => {
  it('Should call next() when error is not HttpError', () => {
    const next = jest.fn();
    const err = new Error('SomeError');

    reportErrors()(err, {} as Request, {} as Response, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(err);
  });

  it('Should respond with expected status code and message when isDevelopment is false', () => {
    const next = jest.fn();
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    const someError = new Error('SomeError');
    const err = new HttpError(400, 'Bad Request', someError);

    reportErrors(false)(err, {} as Request, res as Response, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenLastCalledWith(400);

    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenLastCalledWith({
      error: {
        message: 'Bad Request',
        status: 400,
        type: 'HttpError',
      },
    });
  });

  it('Should respond with expected status code and message when isDevelopment is true', () => {
    const next = jest.fn();
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    const someError = new Error('SomeError');
    const err = new HttpError(400, 'Bad Request', someError);

    reportErrors(true)(err, {} as Request, res as Response, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenLastCalledWith(400);

    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenLastCalledWith({
      error: {
        message: 'Bad Request',
        status: 400,
        type: 'HttpError',
        stack: err.stack,
        previous: {
          message: 'SomeError',
          stack: someError.stack,
        },
      },
    });
  });
});
