import HttpError from './HttpError';

describe('errors HttpError', () => {
  it('Should set .name attribute to HttpError', () => {
    const e = new HttpError(400, 'Message');

    expect(e.name).toEqual('HttpError');
  });

  it('Should set status code, message', () => {
    const e = new HttpError(400, 'Message');
    expect(e.status).toEqual(400);
    expect(e.message).toEqual('Message');
    expect(e.previous).not.toBeDefined();
  });

  it('Should set previous when provided', () => {
    const previous = new Error('SomeError');
    const e = new HttpError(400, 'Message', previous);

    expect(e.previous).toBeDefined();
    expect(e.previous).toEqual(previous);
  });
});
