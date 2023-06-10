import { z } from 'zod';

const NoteSchema = z
  .object({
    collectionId: z.string(),
    collectionName: z.string(),

    content: z.string().min(2, { message: 'Need at least 2 characters.' }),
    created: z.string(),
    id: z.string(),
    title: z.string().min(2, { message: 'Need at least 2 characters.' }),
    updated: z.string(),
  })

  // ...ensure that the object being validated matches your schema exactly, with no missing or additional fields.
  .required()
  .strict();

export const NewNoteSchema = NoteSchema.pick({ title: true, content: true });

export type NewNoteType = Pick<NoteType, 'title' | 'content'> &
  Partial<Pick<NoteType, 'id'>>;
export type NoteParamsType = Pick<NoteType, 'id'>;
export type NoteType = z.infer<typeof NoteSchema>;
