import { Request, Response } from 'express';
import HttpError from './errors/HttpError';
import reportErrors from './reportErrors';

jest.mock('express', () => {
  const express = jest.requireActual('express');
  return {
    __esModule: true,
    ...express,
    set: jest.fn(),
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };
});

describe('reportErrors', () => {
  let resMock: Partial<Response>;

  beforeEach(() => {
    resMock = {
      set: jest.fn(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('Should call next() when error is not HttpError', () => {
    const next = jest.fn();
    const err = new Error('SomeError');

    reportErrors()(err, {} as Request, {} as Response, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(err);
  });

  it('Should respond with expected status code and message when isDevelopment is false', () => {
    const next = jest.fn();

    const someError = new Error('SomeError');
    const err = new HttpError(400, 'Bad Request', someError);

    reportErrors(false)(err, {} as Request, resMock as Response, next);

    expect(next).not.toHaveBeenCalled();
    expect(resMock.set).toHaveBeenCalledWith(
      'content-type',
      'application/problem+json',
    );
    expect(resMock.status).toHaveBeenCalledTimes(1);
    expect(resMock.status).toHaveBeenLastCalledWith(400);

    expect(resMock.json).toHaveBeenCalledTimes(1);
    expect(resMock.json).toHaveBeenLastCalledWith({
      error: {
        message: 'Bad Request',
        status: 400,
        type: 'HttpError',
      },
    });
  });

  it('Should respond with expected status code and message when isDevelopment is true', () => {
    const next = jest.fn();

    const someError = new Error('SomeError');
    const err = new HttpError(400, 'Bad Request', someError);

    reportErrors(true)(err, {} as Request, resMock as Response, next);

    expect(next).not.toHaveBeenCalled();
    expect(resMock.set).toHaveBeenCalledWith(
      'content-type',
      'application/problem+json',
    );
    expect(resMock.status).toHaveBeenCalledTimes(1);
    expect(resMock.status).toHaveBeenLastCalledWith(400);

    expect(resMock.json).toHaveBeenCalledTimes(1);
    expect(resMock.json).toHaveBeenLastCalledWith({
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
