# @jkamzi/express-error-handler

Usage:

```ts
app.use(
  errorReporter({
    // When isDevelopment is true `stack` and `previous` errors are shown
    isDevelopment: process.env.NODE_ENV === 'development',
    // None http errors are transformed to InternalServerErrors
    transformUnknownErrors: true,
    // Transform known error to HttpError. The original error is available
    // under `error.previous`.
    transform: {
      JsonWebTokenError: (err: Error) =>
        new HttpError(HttpStatus.UNAUTHORIZED, err.message, err),
    },
  }),
);
```

Or:

```ts
const isDevelopment = process.env.NODE_ENV === 'development';
const transform: ErrorTransformer = {
  JsonWebTokenError: (err: Error) =>
    new HttpError(HttpStatus.UNAUTHORIZED, err.message, err),
  // See transformUnknownErrors above
  '*': (err: Error) =>
    new InternalServerError(InternalServerError.DEFAULT_MESSAGE, err),
};

app.use(transformErrors(transform));
app.use(reportErrors(isDevelopment));
app.use(handleInternalServerErrors(isDevelopment));
```
