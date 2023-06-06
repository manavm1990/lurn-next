import { getNotes } from '@/lib';

export async function GET(): Promise<Response> {
  return await getNotes();
}
