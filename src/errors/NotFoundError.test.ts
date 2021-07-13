import NotFoundError from './NotFoundError';

describe('errors NotFoundError', () => {
  it('Should set .name attribute to NotFoundError', () => {
    const e = new NotFoundError();

    expect(e.name).toEqual('NotFoundError');
  });

  it('Should set status code, message', () => {
    const e = new NotFoundError();
    expect(e.status).toEqual(404);
    expect(e.message).toEqual(NotFoundError.DEFAULT_MESSAGE);
    expect(e.previous).not.toBeDefined();
  });
});
