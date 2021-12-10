import { ErrorRequestHandler } from 'express';
import handleInternalServerError from './handleInternalServerErrors';
import reportErrors from './reportErrors';
import transformErrors, { ErrorTransformer } from './transformErrors';

export type HandleErrorsOptions = {
  isDevelopment: boolean;
  transformers: ErrorTransformer;
  transformUnknownErrors: boolean;
};

const defaultOptions = {
  isDevelopment: false,
  transformUnknownErrors: true,
  transformers: {},
};

export default function handleErrors(
  options: Partial<HandleErrorsOptions> = {
    ...defaultOptions,
  },
): ErrorRequestHandler[] {
  return [
    transformErrors(options.transformers, options.transformUnknownErrors),
    reportErrors(options.isDevelopment),
    handleInternalServerError(options.isDevelopment),
  ];
}
