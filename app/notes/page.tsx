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
import Link from 'next/link';
import { type ReactElement } from 'react';
import useSWR from 'swr';
import { v4 as uuidv4 } from 'uuid';
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

export default function NotesPage(): ReactElement {
  const {
    data,
    error: indexError,
    mutate,
  } = useSWR(`${BASE_URL}/api/notes/`, index);
  const [error, setError] = useError();

  const addNoteOptimistically = async (
    submittedNote: NewNoteType
  ): Promise<void> => {
    const tempId = uuidv4(); // Generate a temporary ID
    const newNote: NewNoteType = {
      ...submittedNote,
      id: tempId,
      // Add any other default fields you need for a note.
    };

    setError('');

    // Optimistically update the data on the client side.
    await mutate([...(data ?? []), newNote], {
      optimisticData: [...(data ?? []), newNote],
      rollbackOnError: true,
      populateCache: true,
      revalidate: false,
    });

    try {
      // Then, attempt to POST the data to the server.
      const createdNote = await create(submittedNote);
      // If the POST request was successful, replace the temporary note
      // with the real one from the server.
      await mutate((oldData) =>
        oldData?.map((note) => (note.id === tempId ? createdNote : note))
      );
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Failed to create note 🥅.');
      }
    }
  };

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

      {Boolean(error) && <Alert severity="error">{error}</Alert>}

      <CreateNote onSubmit={addNoteOptimistically} />
    </Container>
  );
}
