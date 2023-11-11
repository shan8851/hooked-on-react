import { useState, useCallback } from 'react';

interface UseCopyTextReturn {
  copiedText: string;
  isCopySuccess: boolean | null;
  copy: (text: string) => void;
  error: Error | null;
}

export function useCopyText(): UseCopyTextReturn {
  const [copiedText, setCopiedText] = useState<string>('');
  const [isCopySuccess, setIsCopySuccess] = useState<boolean | null>(null);
  const [error, setError] = useState<Error | null>(null);


  const copy = useCallback(async (text: string) => {
    if (!navigator.clipboard) {
      setIsCopySuccess(false);
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      setIsCopySuccess(true);
    } catch (error) {
      setIsCopySuccess(false);
       if (error instanceof Error) {
          setError(error);
        } else {
          setError(new Error('An unknown error occurred.'));
        }
    }
  }, []);

  return { copiedText, isCopySuccess, copy, error };
}

export { UseCopyTextReturn };
