import { z } from 'zod';

const NoteSchema = z
  .object({
    // Making 💩 `optional` for optimistic updates.
    collectionId: z.string().optional(),
    collectionName: z.string().optional(),

    content: z.string().min(2, { message: 'Need at least 2 characters.' }),
    created: z.string().optional(),

    // We will use a temporary ID for optimistic updates. We need it for the `key` prop in the list.
    id: z.string(),
    title: z.string().min(2, { message: 'Need at least 2 characters.' }),
    updated: z.string().optional(),
  })

  // ...ensure that the object being validated matches your schema exactly, with no missing or additional fields.
  .strict();

export const NewNoteSchema = NoteSchema.pick({ title: true, content: true });

export type NewNoteType = Pick<NoteType, 'title' | 'content' | 'id'>;
export type NoteParamsType = Pick<NoteType, 'id'>;
export type NoteType = z.infer<typeof NoteSchema>;
