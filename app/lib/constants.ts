import { parseEnv, z } from 'znv';

export const { BASE_URL, DB_URL } = parseEnv(process.env, {
  BASE_URL: z.string().url().default('http://localhost:3000'),
  DB_URL: z.string().url().default('http://127.0.0.1:8090/api'),
});
