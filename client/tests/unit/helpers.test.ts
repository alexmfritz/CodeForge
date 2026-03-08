import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { debounce, clamp, calcPercent } from '../../src/utils/helpers';

// ─── debounce ────────────────────────────────────────────────────────────────

describe('debounce', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('delays execution by the specified time', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);

    debounced('a');
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledOnce();
    expect(fn).toHaveBeenCalledWith('a');
  });

  it('resets the timer on repeated calls', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);

    debounced('a');
    vi.advanceTimersByTime(50);
    debounced('b');
    vi.advanceTimersByTime(50);

    // Only 100ms since last call to debounced('b'), not yet fired
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(50);
    expect(fn).toHaveBeenCalledOnce();
    expect(fn).toHaveBeenCalledWith('b');
  });

  it('flush() fires the pending invocation immediately', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);

    debounced('x');
    debounced.flush();

    expect(fn).toHaveBeenCalledOnce();
    expect(fn).toHaveBeenCalledWith('x');
  });

  it('flush() is a no-op when nothing is pending', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);

    debounced.flush();
    expect(fn).not.toHaveBeenCalled();
  });

  it('flush() prevents the timer from firing again', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);

    debounced('a');
    debounced.flush();
    vi.advanceTimersByTime(200);

    expect(fn).toHaveBeenCalledOnce();
  });

  it('flush() uses the most recent arguments', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);

    debounced('a');
    debounced('b');
    debounced('c');
    debounced.flush();

    expect(fn).toHaveBeenCalledWith('c');
  });

  it('can be called again after flush', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);

    debounced('first');
    debounced.flush();

    debounced('second');
    vi.advanceTimersByTime(100);

    expect(fn).toHaveBeenCalledTimes(2);
    expect(fn).toHaveBeenLastCalledWith('second');
  });
});

// ─── clamp ───────────────────────────────────────────────────────────────────

describe('clamp', () => {
  it('returns value when within range', () => {
    expect(clamp(5, 0, 10)).toBe(5);
  });

  it('returns min when value is below range', () => {
    expect(clamp(-5, 0, 10)).toBe(0);
  });

  it('returns max when value is above range', () => {
    expect(clamp(15, 0, 10)).toBe(10);
  });

  it('returns min when value equals min', () => {
    expect(clamp(0, 0, 10)).toBe(0);
  });

  it('returns max when value equals max', () => {
    expect(clamp(10, 0, 10)).toBe(10);
  });
});

// ─── calcPercent ─────────────────────────────────────────────────────────────

describe('calcPercent', () => {
  it('calculates percentage correctly', () => {
    expect(calcPercent(3, 10)).toBe(30);
  });

  it('returns 0 when total is 0', () => {
    expect(calcPercent(5, 0)).toBe(0);
  });

  it('returns 100 when completed equals total', () => {
    expect(calcPercent(10, 10)).toBe(100);
  });

  it('rounds to nearest integer', () => {
    expect(calcPercent(1, 3)).toBe(33); // 33.333...
  });

  it('handles 0 completed', () => {
    expect(calcPercent(0, 10)).toBe(0);
  });
});
