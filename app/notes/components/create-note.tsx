'use client';

import { BASE_URL } from '@/lib/constants';
import {
  NewNoteSchema,
  type NewNoteType,
  type NoteType,
} from '@/types/note.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, TextField } from '@mui/material';
import Alert from '@mui/material/Alert';
import { type ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import useSWRMutation from 'swr/mutation';

type FormValues = NewNoteType;

async function create(
  url: string,
  { arg }: { arg: FormValues }
): Promise<NoteType> {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(arg),
  });

  if (!res.ok) {
    const errorData: { error: string } = await res.json();
    throw new Error(`${res.status}: ${errorData.error}`);
  }

  const returnedData = await res.json();

  return returnedData;
}

export default function CreateNote(): ReactElement {
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<FormValues>({
    mode: 'onBlur',
    resolver: zodResolver(NewNoteSchema),
  });

  const {
    error,
    isMutating,
    reset: resetMutationState,

    trigger,
  }: {
    error: Error | undefined;
    isMutating: boolean;
    reset: () => void;
    trigger: (data: FormValues) => Promise<NoteType | undefined>;
  } = useSWRMutation(`${BASE_URL}/api/notes/`, create);

  const handleSubmitWithReset = async (data: FormValues): Promise<void> => {
    await trigger(data);
    reset();
    resetMutationState();
  };

  return (
    <form
      className="flex flex-col gap-y-4"
      onSubmit={handleSubmit(handleSubmitWithReset)}
    >
      {' '}
      {Boolean(error) && <Alert severity="error">{error?.message}</Alert>}
      <TextField
        id="title"
        label="Title"
        {...register('title')}
        error={Boolean(errors.title)}
        helperText={errors.title?.message}
      />
      <TextField
        id="content"
        label="Content"
        {...register('content')}
        error={Boolean(errors.content)}
        helperText={errors.content?.message}
      />
      <Button
        variant="contained"
        className={`${
          Object.keys(errors).length > 0 ? 'bg-gray-500' : 'bg-green-500'
        } text-white`}
        type="submit"
        disabled={Object.keys(errors).length > 0 || isMutating}
      >
        Submit
      </Button>
    </form>
  );
}
