'use client';

import { BASE_URL } from '@/lib/constants';
import { type NoteParamsType, type NoteType } from '@/types/note.types';
import Container from '@mui/material/Container';
import { type ReactElement } from 'react';
import Note from '../components/note';

async function show(id: string): Promise<NoteType> {
  const res = await fetch(`${BASE_URL}/api/notes/${id}`);

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  const data = await res.json();

  return data;
}

export default async function NotePage({
  params,
}: {
  params: NoteParamsType;
}): Promise<ReactElement> {
  const noteData = await show(params.id);
  return (
    <Container>
      <h1>Note 🆔: {params.id}</h1>
      <Note noteData={noteData} />
    </Container>
  );
}
