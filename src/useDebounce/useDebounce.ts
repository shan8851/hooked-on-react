import { useEffect, useState, useRef } from 'react';

interface UseDebounceProps<T> {
  value: T;
  delay: number;
  callback?: (value: T) => void;
}

export function useDebounce<T>({ value, delay, callback }: UseDebounceProps<T>): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const lastDebouncedValue = useRef(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  useEffect(() => {
    // Only call the callback if value has changed
    if (lastDebouncedValue.current !== debouncedValue) {
      callback?.(debouncedValue);
      lastDebouncedValue.current = debouncedValue;
    }
  }, [debouncedValue, callback]);

  return debouncedValue;
}
