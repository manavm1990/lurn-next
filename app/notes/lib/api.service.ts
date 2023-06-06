import { env } from '@/lib/constants';
import 'server-only';

export async function getNotes(): Promise<Response> {
  const res = await fetch(`${env.DB_URL}/collections/notes/records`);

  return res;
}

export async function getNoteById(id: string): Promise<Response> {
  const res = await fetch(`${env.DB_URL}/collections/notes/records/${id}`);

  return res;
}
