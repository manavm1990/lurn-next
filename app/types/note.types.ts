import { z } from 'zod';

const NoteSchema = z.object({
  collectionId: z.string(),
  collectionName: z.string(),
  content: z.string(),
  created: z.string(),
  id: z.string(),
  title: z.string(),
  updated: z.string(),
});

export type NewNoteType = Pick<NoteType, 'title' | 'content'>;
export type NoteParamsType = Pick<NoteType, 'id'>;
export type NoteType = z.infer<typeof NoteSchema>;
