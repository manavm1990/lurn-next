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

const NoteParamsSchema = z.object({
  id: z.string(),
});

// Types inferred from schemas
export type NoteParamsType = z.infer<typeof NoteParamsSchema>;
export type NoteType = z.infer<typeof NoteSchema>;
