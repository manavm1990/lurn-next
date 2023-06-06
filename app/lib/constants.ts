import { z } from 'zod';

const EnvSchema = z.object({
  BASE_URL: z.string(),
  DB_HOST: z.string(),
});

export const env = EnvSchema.parse({
  // ⚠️ Since these have to be exposed (Material UI) to the client, we can't read them directly from `process.env`.
  BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  DB_HOST: process.env.NEXT_PUBLIC_DB_HOST,
});
