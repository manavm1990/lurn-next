import { useState } from 'react';

export default function useError(): [string, (error: string) => void] {
  const [error, setError] = useState<string>('');

  return [error, setError];
}
