import { renderHook, act } from '@testing-library/react';
import { useCountdown } from './useCountdown';

describe('useCountdown', () => {
  jest.useFakeTimers();

  it('should decrement timeRemaining by the interval each second', () => {
    const initialTime = 10;
    const { result } = renderHook(() =>
      useCountdown({ initialTime, interval: 1000 })
    );
    act(() => {
      result.current.start();
      jest.advanceTimersByTime(1000);
    });

    expect(result.current.timeRemaining).toBe(initialTime - 1);
  });
  jest.useRealTimers();
});
