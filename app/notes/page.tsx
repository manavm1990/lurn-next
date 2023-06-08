'use client';
import { BASE_URL } from '@/lib/constants';
import Note from '@/notes/components/note';
import { type NewNoteType, type NoteType } from '@/types/note.types';
import Alert from '@mui/material/Alert';
import Container from '@mui/material/Container';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, type ReactElement } from 'react';
import CreateNote from './components/create-note';

// TODO: Resolve issue with infinite fetches.

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

async function create(data: NewNoteType): Promise<NoteType> {
  const res = await fetch(`${BASE_URL}/api/notes/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData: { error: string } = await res.json();
    throw new Error(`${res.status}: ${errorData.error}`);
  }

  const returnedData = await res.json();

  return returnedData;
}

export default async function NotesPage(): Promise<ReactElement> {
  const [error, setError] = useState<string>();

  const router = useRouter();

  const notes = await index();

  return (
    <Container className="space-y-8">
      <h1>🎶</h1>
      <div className="grid grid-cols-4">
        {notes.map((note) => (
          <Link key={note.id} href={`/notes/${note.id}`}>
            <Note noteData={note} />
          </Link>
        ))}
      </div>

      <CreateNote
        onSubmit={async (data) => {
          try {
            await create({ ...data });
            router.refresh();
          } catch (error) {
            if (error instanceof Error) {
              setError(error.message);
            } else {
              setError('Something went wrong!');
            }
          }
        }}
      />

      {Boolean(error) && <Alert severity="error">{error}</Alert>}
    </Container>
  );
}
