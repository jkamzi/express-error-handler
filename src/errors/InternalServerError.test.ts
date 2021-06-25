import InternalServerError from './InternalServerError';

describe('errors InternalServerError', () => {
  it('Should set .name attribute to InternalServerError', () => {
    const e = new InternalServerError();

    expect(e.name).toEqual('InternalServerError');
  });

  it('Should set status code, message', () => {
    const e = new InternalServerError();
    expect(e.status).toEqual(500);
    expect(e.message).toEqual(InternalServerError.DEFAULT_MESSAGE);
    expect(e.previous).not.toBeDefined();
  });

  it('Should set previous when provided', () => {
    const previous = new Error('SomeError');
    const e = new InternalServerError(undefined, previous);

    expect(e.message).toEqual(InternalServerError.DEFAULT_MESSAGE);
    expect(e.previous).toBeDefined();
    expect(e.previous).toEqual(previous);
  });
});
