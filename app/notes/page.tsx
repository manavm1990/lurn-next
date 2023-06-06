import Note from '@/notes/components/note';
import { env } from '@/lib/constants';
import { type NoteType } from '@/types/note';
import { type ReactElement } from 'react';

async function index(): Promise<NoteType[]> {
  const res = await fetch(`${env.BASE_URL}/api/notes/`);

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  const data = await res.json();

  return data.items;
}

export default async function Notes(): Promise<ReactElement> {
  const notes = await index();

  return (
    <main className="container mx-auto px-8">
      <h1 className="text-center">🎶</h1>
      <div className="grid grid-cols-4">
        {notes.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </div>
    </main>
  );
}
