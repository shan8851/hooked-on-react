import { useState, useEffect, useCallback } from 'react';

interface UseCountdownProps {
  initialTime: number;
  interval?: number;
  onTick?: (timeLeft: number) => void;
  onCompleted?: () => void;
}

interface UseCountdownReturn {
  timeRemaining: number;
  start: () => void;
  pause: () => void;
  reset: () => void;
  addTime: (seconds: number) => void;
  subtractTime: (seconds: number) => void;
}

export function useCountdown({
  initialTime,
  interval = 1000,
  onTick,
  onCompleted,
}: UseCountdownProps): UseCountdownReturn {
  const [timeRemaining, setTimeReamaining] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);

  const tick = useCallback(() => {
    setTimeReamaining((prevTime) => {
      const newTime = prevTime - interval / 1000;
      // Call onTick if provided
      onTick?.(newTime);
      return newTime;
    });
  }, [interval, onTick]);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (isActive && timeRemaining > 0) {
      timer = setInterval(tick, interval);
    } else if (isActive && timeRemaining <= 0) {
      setIsActive(false);
      setTimeReamaining(0);
      onCompleted?.();
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isActive, timeRemaining, tick, onCompleted, interval]);

  const start = useCallback(() => setIsActive(true), []);
  const pause = useCallback(() => setIsActive(false), []);
  const reset = useCallback(() => setTimeReamaining(initialTime), [initialTime]);

  const addTime = useCallback((seconds: number) => {
    setTimeReamaining((prevTime) => prevTime + seconds);
  }, []);

  const subtractTime = useCallback((seconds: number) => {
    setTimeReamaining((prevTime) => prevTime - seconds);
  }, []);

  return { timeRemaining, start, pause, reset, addTime, subtractTime };
}
