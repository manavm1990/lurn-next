'use client';

import { BASE_URL } from '@/lib/constants';
import Note from '@/notes/components/note';
import { type NoteType } from '@/types/note.types';
import Alert from '@mui/material/Alert';
import Container from '@mui/material/Container';
import Link from 'next/link';
import { type ReactElement } from 'react';
import useSWR from 'swr';
import CreateNote from './components/create-note';

async function index(): Promise<NoteType[]> {
  const res = await fetch(`${BASE_URL}/api/notes/`);

  if (!res.ok) {
    throw new Error(
      'Failed to fetch data. The database 🗃️ connection 🔌 is probably down. 🥅'
    );
  }

  const data = await res.json();

  return data.items;
}

export default function NotesPage(): ReactElement {
  const { data, error: indexError } = useSWR(`${BASE_URL}/api/notes/`, index);

  return (
    <Container className="space-y-8">
      <h1>🎶</h1>
      <div className="grid grid-cols-4">
        {data?.map((note: NoteType) => (
          <Link key={note.id} href={`/notes/${note.id}`}>
            <Note noteData={note} />
          </Link>
        ))}
      </div>

      {Boolean(indexError) && (
        <Alert severity="error">
          {indexError?.message !== ''
            ? indexError?.message
            : 'Failed to fetch notes.'}
        </Alert>
      )}

      <CreateNote />
    </Container>
  );
}
