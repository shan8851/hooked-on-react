import { renderHook } from '@testing-library/react';
import { useClickOutside } from './useClickOutside';

describe('useClickOutside', () => {
  it('should execute callback when a click is triggered outside', () => {
    const mockRef = {
      current: document.createElement('div'),
    };
    const mockCallback = jest.fn();
    renderHook(() => useClickOutside(mockRef, mockCallback));
    document.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    expect(mockCallback).toHaveBeenCalled();
  });
});
