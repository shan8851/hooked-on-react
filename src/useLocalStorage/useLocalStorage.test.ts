import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from './useLocalStorage';

const localStorageMock = (function() {
  let store: { [key: string]: string } = {}; // <-- Index signature
  return {
    getItem(key: string): string | null {
      return store[key] || null;
    },
    setItem(key: string, value: string): void {
      store[key] = value.toString();
    },
    removeItem(key: string): void {
      delete store[key];
    },
    clear(): void {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should use stored value', () => {
    localStorage.setItem('test-key', JSON.stringify('stored value'));
    const { result } = renderHook(() => useLocalStorage('test-key', 'default value'));

    expect(result.current.storedValue).toBe('stored value');
  });

  it('should set value', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'default value'));
    act(() => {
      result.current.setValue('new value');
    });

    expect(localStorage.getItem('test-key')).toBe(JSON.stringify('new value'));
    expect(result.current.storedValue).toBe('new value');
  });

  it('should delete value', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'default value'));
    act(() => {
      result.current.deleteValue();
    });

    expect(localStorage.getItem('test-key')).toBe(null);
    expect(result.current.storedValue).toBeUndefined();
  });
});
