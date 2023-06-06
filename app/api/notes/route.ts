import getNotes from '../../lib/get-notes';

export async function GET(): Promise<Response> {
  return await getNotes();
}
