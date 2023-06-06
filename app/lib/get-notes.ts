import 'server-only';
import { env } from './constants';

export default async function getNotes(): Promise<Response> {
  const res = await fetch(`${env.DB_HOST}/collections/notes/records`);

  return res;
}
