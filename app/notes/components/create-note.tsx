import { zodResolver } from '@hookform/resolvers/zod';
import { Button, TextField } from '@mui/material';
import { type ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  title: z.string().nonempty('Title is required'),
  content: z.string().nonempty('Content is required'),
});

type FormValues = z.infer<typeof formSchema>;

interface CreateNoteProps {
  onSubmit: (data: FormValues) => void;
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
    resolver: zodResolver(formSchema),
  });

  const handleSubmitWithReset = (data: FormValues): void => {
    onSubmit(data);
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
        className="bg-green-500 text-white"
        type="submit"
      >
        Submit
      </Button>
    </form>
  );
}