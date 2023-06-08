import { useState } from 'react';

export default function useError(): [
  string | null,
  (error: string | null) => void
] {
  const [error, setError] = useState<string | null>(null);

  return [error, setError];
}
