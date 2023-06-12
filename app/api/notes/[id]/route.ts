import { deleteNoteById, getNoteById } from '@/notes/lib/api.service';
import { type NoteParamsType } from '@/types/note.types';

export async function GET(
  _: Request,
  context: { params: NoteParamsType }
): Promise<Response> {
  const id = context.params.id;

  return await getNoteById(id);
}

export async function DELETE(
  _: Request,
  context: { params: NoteParamsType }
): Promise<Response> {
  const id = context.params.id;

  return await deleteNoteById(id);
}
