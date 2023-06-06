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

// Types inferred from schemas
export type NoteType = z.infer<typeof NoteSchema>;
