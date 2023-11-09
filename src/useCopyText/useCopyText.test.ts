import { renderHook, act, waitFor } from '@testing-library/react';
import { useCopyText } from './useCopyText';

// beforeAll(() => {
//   // Mock clipboard
//   Object.assign(navigator, {
//     clipboard: {
//       writeText: jest.fn(),
//     },
//   });
//   (navigator.clipboard.writeText as jest.Mock).mockImplementation(text => Promise.resolve(text));
// });

describe('useCopyText', () => {
  beforeAll(() => {
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn().mockImplementation(text => Promise.resolve(text)),
      },
    });
  });

  it('copies text to the clipboard', async () => {
    const { result } = renderHook(() => useCopyText());

    act(() => {
      result.current.copy('test text');
    });

    await waitFor(() => result.current.isCopySuccess === true);

    expect(result.current.copiedText).toBe('test text');
    expect(result.current.isCopySuccess).toBe(true);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('test text');
  });

  it('handles clipboard copy failure', async () => {
    (navigator.clipboard.writeText as jest.Mock).mockImplementation(() => Promise.reject(new Error('copy failed')));

    const { result } = renderHook(() => useCopyText());

    act(() => {
      result.current.copy('test text');
    });

    await waitFor(() => result.current.isCopySuccess === false);

    expect(result.current.isCopySuccess).toBe(false);
  });
});
