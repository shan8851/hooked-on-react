import { useState, useEffect } from 'react';

interface UseLocalStorageReturn<T> {
  storedValue: T | undefined;
  setValue: (value: T | ((val: T | undefined) => T | undefined)) => void;
  deleteValue: () => void;
  error: Error | null;
}

export function useLocalStorage<T>(key: string, initialValue: T): UseLocalStorageReturn<T> {
  const [storedValue, setStoredValue] = useState<T | undefined>(initialValue);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item !== null) {
        setStoredValue(JSON.parse(item));
      }
    } catch (err) {
     if (err instanceof Error) {
    setError(err);
  } else {
    setError(new Error('An unknown error occurred.'));
  }
    }
  }, [key]);

  const setValue = (value: T | ((val: T | undefined) => T | undefined)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
      setStoredValue(valueToStore);
    } catch (err) {
     if (err instanceof Error) {
    setError(err);
  } else {
    setError(new Error('An unknown error occurred.'));
  }
    }
  };

  const deleteValue = () => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(undefined);
    } catch (err) {
     if (err instanceof Error) {
    setError(err);
  } else {
    setError(new Error('An unknown error occurred.'));
  }
    }
  };

  return { storedValue, setValue, deleteValue, error };
}

export type { UseLocalStorageReturn };
