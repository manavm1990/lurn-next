import { useState } from 'react';

export default function useError(): [
  string | undefined,
  (error: string) => void
] {
  const [error, setError] = useState<string>();

  return [error, setError];
}
