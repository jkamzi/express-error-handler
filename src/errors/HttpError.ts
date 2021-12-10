export default class HttpError extends Error {
  public status: number;

  public previous: Error | undefined;

  public isHttpError = true;

  constructor(status: number, message: string, previous?: Error) {
    super(message);
    this.status = status;
    this.previous = previous;
    this.name = new.target.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
