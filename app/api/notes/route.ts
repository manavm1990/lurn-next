import { getNotes } from '@/notes/lib/api.service';

export async function GET(): Promise<Response> {
  return await getNotes();
}
