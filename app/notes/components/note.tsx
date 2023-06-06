import { type NoteType } from '@/types/note.types';
import { type ReactElement } from 'react';

interface NoteProps {
  noteData: NoteType;
}

export default function Note({ noteData: note }: NoteProps): ReactElement {
  return (
    <section key={note.id} className="h-64 w-64 bg-yellow-300 p-4 text-black">
      <h2>{note.title}</h2>
      <p>{note.content}</p>
      <time>{note.created}</time>
    </section>
  );
}
