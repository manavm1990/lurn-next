import { env } from '@/lib/constants';
import 'server-only';

export async function getNotes(): Promise<Response> {
  const res = await fetch(`${env.DB_HOST}/collections/notes/records`);

  return res;
}
