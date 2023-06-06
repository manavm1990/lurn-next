import { parseEnv, z } from 'znv';

export const { BASE_URL, DB_URL } = parseEnv(process.env, {
  BASE_URL: z.string().url().default('http://localhost:3000'),
  DB_URL: z.string().url().default('http://127.0.0.1:8090/api'),
});

export const env = EnvSchema.parse({
  // ⚠️ Since these have to be exposed (Material UI) to the client, we can't read them directly from `process.env`.
  BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  DB_HOST: process.env.NEXT_PUBLIC_DB_HOST,
});
