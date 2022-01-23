import { isHttpError } from '.';
import HttpError from './errors/HttpError';

function errorAsUnknown(): unknown {
  const err = new HttpError(400, 'Bad Request') as unknown;

  return err;
}

describe('isHttpError', () => {
  /**
   * try { } catch (e) returns e as unknown.  This could be a HttpError
   * so this test should pass
   */
  it('Should return true when error is HttpError', () => {
    expect(isHttpError(errorAsUnknown())).toEqual(true);
  });
});
