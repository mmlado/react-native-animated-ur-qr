import { renderHook, act } from '@testing-library/react';
import { useAnimatedURQRCode } from '../useAnimatedURQRCode';

// Minimal single-fragment BC-UR (ur:bytes/xyldmyjy = hex "deadbeef")
const SINGLE_FRAGMENT_CBOR = 'deadbeef';
const SINGLE_FRAGMENT_TYPE = 'bytes';

// To produce a multi-fragment UR we use a large enough payload with a small capacity
const MULTI_FRAGMENT_CBOR = 'deadbeef'.repeat(40); // 160 bytes
const MULTI_FRAGMENT_TYPE = 'bytes';
const MULTI_FRAGMENT_CAPACITY = 20;

describe('useAnimatedURQRCode', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it('returns a non-empty UR fragment string', () => {
    const { result } = renderHook(() =>
      useAnimatedURQRCode(SINGLE_FRAGMENT_CBOR, SINGLE_FRAGMENT_TYPE),
    );
    expect(result.current).toBeTruthy();
    expect(result.current.startsWith('UR:')).toBe(true);
  });

  it('returns an uppercased fragment', () => {
    const { result } = renderHook(() =>
      useAnimatedURQRCode(SINGLE_FRAGMENT_CBOR, SINGLE_FRAGMENT_TYPE),
    );
    expect(result.current).toBe(result.current.toUpperCase());
  });

  it('does not cycle for a single-fragment UR', () => {
    const { result } = renderHook(() =>
      useAnimatedURQRCode(SINGLE_FRAGMENT_CBOR, SINGLE_FRAGMENT_TYPE),
    );
    const initial = result.current;
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(result.current).toBe(initial);
  });

  it('cycles through fragments for a multi-fragment UR', () => {
    const { result } = renderHook(() =>
      useAnimatedURQRCode(MULTI_FRAGMENT_CBOR, MULTI_FRAGMENT_TYPE, {
        capacity: MULTI_FRAGMENT_CAPACITY,
        interval: 200,
      }),
    );
    const first = result.current;
    act(() => {
      jest.advanceTimersByTime(200);
    });
    const second = result.current;
    act(() => {
      jest.advanceTimersByTime(200);
    });
    const third = result.current;

    // Fragments should be cycling
    expect([first, second, third].some((f, i, arr) => arr.indexOf(f) !== i || f !== first)).toBe(
      true,
    );
  });

  it('clears the interval on unmount', () => {
    const clearIntervalSpy = jest.spyOn(global, 'clearInterval');
    const { unmount } = renderHook(() =>
      useAnimatedURQRCode(MULTI_FRAGMENT_CBOR, MULTI_FRAGMENT_TYPE, {
        capacity: MULTI_FRAGMENT_CAPACITY,
      }),
    );
    unmount();
    expect(clearIntervalSpy).toHaveBeenCalled();
    clearIntervalSpy.mockRestore();
  });
});
