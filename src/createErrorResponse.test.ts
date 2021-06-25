import createErrorResponse from './createErrorResponse';
import HttpError from './errors/HttpError';

describe('createErrorResponse', () => {
  let errorWithPrevious: HttpError;
  let errorWithoutPrevious: HttpError;
  let someError: Error;
  beforeEach(() => {
    someError = new Error('SomeError');
    errorWithPrevious = new HttpError(400, 'Bad Request', someError);
    errorWithoutPrevious = new HttpError(400, 'Bad Request');
  });

  describe('isDevelopment = true', () => {
    it('Should respond with error body without previous when not provided', () => {
      const result = createErrorResponse(errorWithoutPrevious, true);

      expect(result).toEqual({
        message: errorWithoutPrevious.message,
        status: errorWithoutPrevious.status,
        type: errorWithoutPrevious.name,
        stack: errorWithoutPrevious.stack,
      });
    });

    it('Should include previous when provided', () => {
      const result = createErrorResponse(errorWithPrevious, true);

      expect(result).toEqual({
        message: errorWithPrevious.message,
        status: errorWithPrevious.status,
        type: errorWithPrevious.name,
        stack: errorWithPrevious.stack,
        previous: {
          message: someError.message,
          stack: someError.stack,
        },
      });
    });
  });

  describe('isDevelopment = false', () => {
    it('Should respond with error body without stack', () => {
      const result = createErrorResponse(errorWithoutPrevious, false);

      expect(result).toEqual({
        message: errorWithoutPrevious.message,
        status: errorWithoutPrevious.status,
        type: errorWithoutPrevious.name,
      });
    });

    it('Should not include previous when provided', () => {
      const result = createErrorResponse(errorWithPrevious, false);

      expect(result).toEqual({
        message: errorWithPrevious.message,
        status: errorWithPrevious.status,
        type: errorWithPrevious.name,
      });
    });
  });
});
