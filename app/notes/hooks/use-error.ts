import { useState, useEffect } from 'react';

export default function useError(
  isDoingSomething: boolean
): [string, (error: string) => void] {
  const [error, setError] = useState<string>('');

  useEffect(() => {
    // If we're not currently validating (re-fetching), clear the error.
    if (!isDoingSomething) {
      setError('');
    }
  }, [isDoingSomething, setError]);

  return [error, setError];
}
