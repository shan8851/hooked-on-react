import { useEffect, RefObject } from 'react';

type Event = MouseEvent | TouchEvent;

interface UseClickOutsideProps {
  ref: RefObject<HTMLElement>;
  callback: (event: Event) => void;
}

export function useClickOutside({ ref, callback }: UseClickOutsideProps) {
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback(event);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchend', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchend', handleClickOutside);
    };
  }, [ref, callback]);
}

export type { UseClickOutsideProps };
