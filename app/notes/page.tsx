'use client';

import { BASE_URL } from '@/lib/constants';
import Note from '@/notes/components/note';
import { type NoteType } from '@/types/note.types';
import Container from '@mui/material/Container';
import Link from 'next/link';
import { type ReactElement } from 'react';
import CreateNote from './components/create-note';

async function index(): Promise<NoteType[]> {
  const res = await fetch(`${BASE_URL}/api/notes/`);

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  const data = await res.json();

  return data.items;
}

export default async function NotesPage(): Promise<ReactElement> {
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
        onSubmit={(data) => {
          console.log(data);
        }}
      />
    </Container>
  );
}
