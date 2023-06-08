import { DB_URL } from '@/lib/constants';
import { type NewNoteType } from '@/types/note.types';
import 'server-only';

export async function getNotes(): Promise<Response> {
  return await fetch(`${DB_URL}/collections/notes/records`);
}

export async function getNoteById(id: string): Promise<Response> {
  return await fetch(`${DB_URL}/collections/notes/records/${id}`);
}

export async function createNote(payload: NewNoteType): Promise<Response> {
  return await fetch(`${DB_URL}/collections/notes/records`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
}
