import { z } from 'zod';

export const env = z
  .object({
    BASE_URL: z.string(),
    DB_URL: z.string(),
  })
  .parse(process.env);
