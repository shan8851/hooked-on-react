import { useState, useCallback } from 'react';

interface useCopyTextReturn {
  copiedText: string;
  isCopySuccess: boolean | null;
  copy: (text: string) => void;
}

export function useCopyText(): useCopyTextReturn {
  const [copiedText, setCopiedText] = useState<string>('');
  const [isCopySuccess, setIsCopySuccess] = useState<boolean | null>(null);

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
      console.error('Failed to copy:', error);
    }
  }, []);

  return { copiedText, isCopySuccess, copy };
}

export type { useCopyTextReturn };
