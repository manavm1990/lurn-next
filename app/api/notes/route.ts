import { getNotes } from '@/notes/lib';

export async function GET(): Promise<Response> {
  return await getNotes();
}
