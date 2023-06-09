/**
 * Since we are using Material UI, and Emotion will not work with SSR, we need to
 * do `use client`. Ideally, all data is fetched on the server, and the client
 * only renders the data. But, in this case, we are using SWR, so that's 🆒 at least.
 */
'use client';

import { BASE_URL } from '@/lib/constants';
import Note from '@/notes/components/note';
import { type NewNoteType, type NoteType } from '@/types/note.types';
import Alert from '@mui/material/Alert';
import Container from '@mui/material/Container';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { type ReactElement } from 'react';
import useSWR from 'swr';
import CreateNote from './components/create-note';
import useError from './hooks/use-error';

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
  const [error, setError] = useError();

  const { data } = useSWR(
    // Using the URL as the key, so that the data is cached.
    `${BASE_URL}/api/notes/`,

    index
  );

  const router = useRouter();

  return (
    <Container className="space-y-8">
      <h1>🎶</h1>
      <div className="grid grid-cols-4">
        {data?.map((note) => (
          <Link key={note.id} href={`/notes/${note.id}`}>
            <Note noteData={note} />
          </Link>
        ))}
      </div>

      <CreateNote onSubmit={mutation.mutate} />

      {Boolean(error) && <Alert severity="error">{error}</Alert>}
    </Container>
  );
}
