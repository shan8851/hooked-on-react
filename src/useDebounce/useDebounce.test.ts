import { renderHook, act } from '@testing-library/react';
import { useDebounce } from './useDebounce';

jest.useFakeTimers();

describe('useDebounce', () => {

  it('should update value after specified delay', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce({ value, delay }),
      { initialProps: { value: 'initial', delay: 500 } }
    );

    expect(result.current).toBe('initial');

    // Simulate a value change
    rerender({ value: 'changed', delay: 300 });

    // Fast-forward time by 600ms
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current).toBe('changed');
  });

  it('should not update value before specified delay', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce({ value, delay }),
      { initialProps: { value: 'initial', delay: 500 } }
    );

    rerender({ value: 'changed', delay: 500 });

    // Fast-forward time by just below the delay time
    act(() => {
      jest.advanceTimersByTime(499);
    });

    expect(result.current).toBe('initial');
  });

  it('should only update once for multiple quick changes', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce({ value, delay }),
      { initialProps: { value: 'initial', delay: 500 } }
    );

    rerender({ value: 'changed1', delay: 400 });
    rerender({ value: 'changed2', delay: 500 });

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe('changed2');
  });

  it('should call the callback with the correct value', () => {
    const callback = jest.fn();
    const { rerender } = renderHook(
      ({ value, delay, callback }) => useDebounce({ value, delay, callback }),
      { initialProps: { value: 'initial', delay: 500, callback } }
    );

    rerender({ value: 'changed', delay: 500, callback });

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(callback).toHaveBeenCalledWith('changed');
  });
  jest.useRealTimers();
});
