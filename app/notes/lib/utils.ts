import { type ZodError } from 'zod';

export const stringifyZodError = (error: ZodError): string => {
  return error.issues
    .map((issue) => {
      const path = issue.path.join('.');
      const message = issue.message;
      return `Currently facing issue with the field "${path}". ${message}`;
    })
    .join('\n');
};
