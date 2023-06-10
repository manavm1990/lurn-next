import { NewNoteSchema, type NewNoteType } from '@/types/note.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, TextField } from '@mui/material';
import { type ReactElement } from 'react';
import { useForm } from 'react-hook-form';

type FormValues = NewNoteType;

interface CreateNoteProps {
  onSubmit: (data: FormValues) => Promise<void>;
}

export default function CreateNote({
  onSubmit,
}: CreateNoteProps): ReactElement {
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<FormValues>({
    mode: 'onBlur',
    resolver: zodResolver(NewNoteSchema),
  });

  const handleSubmitWithReset = async (data: FormValues): Promise<void> => {
    await onSubmit(data);
    reset();
  };

  return (
    <form
      className="flex flex-col gap-y-4"
      onSubmit={handleSubmit(handleSubmitWithReset)}
    >
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
        disabled={Object.keys(errors).length > 0}
      >
        Submit
      </Button>
    </form>
  );
}
