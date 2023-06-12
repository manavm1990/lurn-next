'use client';

import { BASE_URL } from '@/lib/constants';
import { type NoteType } from '@/types/note.types';
import Button from '@mui/material/Button';
import { type ReactElement } from 'react';
import useSWR from 'swr';

interface NoteProps {
  noteData: NoteType;
}

async function deleteNote(id: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/api/notes/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error('Failed to delete 🔥. 😕.');
  }
}

export default function Note({ noteData: note }: NoteProps): ReactElement {
  const { mutate } = useSWR(`${BASE_URL}/api/notes/`);

  return (
    <section
      key={note.id}
      className="flex h-64 w-64 flex-col bg-yellow-300 p-4 px-8 text-black"
    >
      <h2>{note.title}</h2>
      <p>{note.content}</p>
      <time>{note.created}</time>
      <Button
        variant="contained"
        className="mt-auto bg-red-500"
        onClick={async (e) => {
          // Don't bubble up to the parent and try to `GET`!
          e.preventDefault();
          await deleteNote(note.id);
          void mutate();
        }}
      >
        Delete 🔥
      </Button>
    </section>
  );
}
