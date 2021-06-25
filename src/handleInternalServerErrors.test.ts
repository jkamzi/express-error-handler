import { Request, Response } from 'express';
import {
  JsonErrorDevelopmentResponse,
  JsonErrorResponse,
} from './createErrorResponse';
import InternalServerError from './errors/InternalServerError';
import handleInternalServerError from './handleInternalServerErrors';

describe('handleInternalServerError', () => {
  describe('isDevelopment = true', () => {
    it('Should respond with internal server error and stack', () => {
      const mock: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };
      const err = new InternalServerError(
        InternalServerError.DEFAULT_MESSAGE,
        new Error('SomeError'),
      );

      handleInternalServerError(true)(
        err,
        {} as Request,
        mock as Response,
        jest.fn(),
      );

      const expected: JsonErrorDevelopmentResponse = {
        message: InternalServerError.DEFAULT_MESSAGE,
        type: 'InternalServerError',
        status: 500,
        stack: err.stack,
        previous: {
          message: 'SomeError',
          stack: expect.anything(),
        },
      };

      expect(mock.status).toHaveBeenCalledTimes(1);
      expect(mock.status).toHaveBeenCalledWith(500);

      expect(mock.json).toHaveBeenCalledTimes(1);
      expect(mock.json).toHaveBeenCalledWith({ error: expected });
    });
  });

  describe('isDevelopment = false', () => {
    it('Should respond with internal server error', () => {
      const mock: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };
      const err = new InternalServerError();
      handleInternalServerError(false)(
        err,
        {} as Request,
        mock as Response,
        jest.fn(),
      );

      const expected: JsonErrorResponse = {
        message: InternalServerError.DEFAULT_MESSAGE,
        type: 'InternalServerError',
        status: 500,
      };

      expect(mock.status).toHaveBeenCalledTimes(1);
      expect(mock.status).toHaveBeenCalledWith(500);

      expect(mock.json).toHaveBeenCalledTimes(1);
      expect(mock.json).toHaveBeenCalledWith({ error: expected });
    });
  });
});
