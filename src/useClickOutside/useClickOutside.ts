import { useEffect } from 'react';

type Event = MouseEvent | TouchEvent;

export const useClickOutside = (
  ref: React.RefObject<HTMLElement>,
  callback: (event: Event) => void
) => {
  const handleClickOutside = (event: Event) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      callback(event);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchend', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchend', handleClickOutside);
    };
  }, [ref, callback]);
};

