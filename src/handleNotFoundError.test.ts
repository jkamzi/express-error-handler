import { Request, Response } from 'express';
import { JsonErrorResponse } from './createErrorResponse';
import { NotFoundError } from './errors';
import handleNotFoundError from './handleNotFoundError';

describe('handleNotFoundError', () => {
  it('Should respond with Not Found Error', () => {
    const mock: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    handleNotFoundError({} as Request, mock as Response, jest.fn());

    const expected: JsonErrorResponse = {
      message: NotFoundError.DEFAULT_MESSAGE,
      type: 'NotFoundError',
      status: 404,
    };

    expect(mock.status).toHaveBeenCalledTimes(1);
    expect(mock.status).toHaveBeenCalledWith(404);

    expect(mock.json).toHaveBeenCalledTimes(1);
    expect(mock.json).toHaveBeenCalledWith({ error: expected });
  });
});
