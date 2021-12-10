import UnauthorizedError from './UnauthorizedError';

describe('errors UnauthorizedError', () => {
  it('Should set .name attribute to UnauthorizedError', () => {
    const e = new UnauthorizedError();

    expect(e.name).toEqual('UnauthorizedError');
  });

  it('Should set status code, message', () => {
    const e = new UnauthorizedError();
    expect(e.status).toEqual(401);
    expect(e.message).toEqual(UnauthorizedError.DEFAULT_MESSAGE);
    expect(e.previous).not.toBeDefined();
  });

  it('Should set previous when provided', () => {
    const previous = new Error('SomeError');
    const e = new UnauthorizedError(undefined, previous);

    expect(e.message).toEqual(UnauthorizedError.DEFAULT_MESSAGE);
    expect(e.previous).toBeDefined();
    expect(e.previous).toEqual(previous);
  });
});
