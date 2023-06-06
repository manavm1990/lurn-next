import { type ReactElement } from 'react';
import { z } from 'zod';
import { env } from '../lib/constants';

const Note = z.object({
  collectionId: z.string(),
  collectionName: z.string(),
  content: z.string(),
  created: z.string(),
  id: z.string(),
  title: z.string(),
  updated: z.string(),
});

// Types inferred from schemas
type NoteType = z.infer<typeof Note>;

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
    <main>
      <h1>🎶</h1>
      {notes.map((note) => (
        // TODO: Move this to a component
        <section key={note.id}>
          <h2>{note.title}</h2>
          <p>{note.content}</p>
          <time>{note.created}</time>
        </section>
      ))}
    </main>
  );
}
