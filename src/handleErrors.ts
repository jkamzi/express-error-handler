import { ErrorRequestHandler } from 'express';
import handleInternalServerError from './handleInternalServerErrors';
import reportErrors from './reportErrors';
import transformErrors, { ErrorTransformer } from './transformErrors';

export type HandleErrorsOptions = {
  isDevelopment: boolean;
  transformers: ErrorTransformer;
  transformUnknownErrors: boolean;
};

export default function handleErrors(
  options: HandleErrorsOptions = {
    isDevelopment: false,
    transformUnknownErrors: true,
    transformers: {},
  },
): ErrorRequestHandler[] {
  return [
    transformErrors(options.transformers, options.transformUnknownErrors),
    reportErrors(options.isDevelopment),
    handleInternalServerError(options.isDevelopment),
  ];
}
