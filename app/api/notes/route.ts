import { createNote, getNotes } from '@/notes/lib/api.service';
import { stringifyZodError } from '@/notes/lib/utils';
import { NewNoteSchema } from '@/types/note.types';
import { NextResponse } from 'next/server';

export async function GET(): Promise<Response> {
  return await getNotes();
}

export async function POST(request: Request): Promise<Response> {
  const payload = await request.json();
  const isValid = NewNoteSchema.safeParse(payload);

  if (!isValid.success) {
    return NextResponse.json(
      { error: stringifyZodError(isValid.error) },
      { status: 400 }
    );
  }

  return await createNote(payload);
}
