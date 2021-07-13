# @jkamzi/express-error-handler

Usage:

```ts
export type HandleErrorsOptions = {
  // When isDevelopment is true `stack` and `previous` errors are shown
  isDevelopment: boolean;
  // Transform known error to HttpError. The original error is available
  // under `error.previous`.
  transformers: ErrorTransformer;
  // None http errors are transformed to InternalServerErrors
  transformUnknownErrors: boolean;
};
```

```ts
import express, { Request, Response } from 'express';
const app = express();

app.get('/error', (req: Request, res: Response) => {
  throw new HttpError(400, 'Bad Request');
});

const options: HandleErrorsOptions = {
  isDevelopment: process.env.NODE_ENV === 'development',
  transformUnknownErrors: true,
  transformers: {
    // Catch JsonWebTokenError and turn them into HttpErrors
    JsonWebTokenError: (err: Error) => new HttpError(401, err.message, err),
  },
};

/**
 * Should be one of the last middlewares
 */
app.use(handleErrors(options));

app.listen(8000);
```

```bash
curl http://localhost:8000/error
{
  "error": {
    "status": 400,
    "message: "Bad Request",
    "type": "HttpError",
  }
}
```

Checkout [src/errors/index.ts](src/errors/index.ts) to see what pre-defined errors are available
