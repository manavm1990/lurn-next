import { useState, useEffect } from 'react';

export default function useError(
  isValidating: boolean
): [string, (error: string) => void] {
  const [error, setError] = useState<string>('');

  useEffect(() => {
    // If we're not currently validating (re-fetching), clear the error.
    if (!isValidating) {
      setError('');
    }
  }, [isValidating, setError]);

  return [error, setError];
}
