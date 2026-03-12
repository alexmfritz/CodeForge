import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getToken, setToken, clearToken, apiFetch } from '../../src/utils/api';

// ─── localStorage mocks ─────────────────────────────────────────────────────

const mockStorage: Record<string, string> = {};

beforeEach(() => {
  vi.restoreAllMocks();
  Object.keys(mockStorage).forEach((key) => delete mockStorage[key]);

  vi.stubGlobal('localStorage', {
    getItem: vi.fn((key: string) => mockStorage[key] ?? null),
    setItem: vi.fn((key: string, value: string) => {
      mockStorage[key] = value;
    }),
    removeItem: vi.fn((key: string) => {
      delete mockStorage[key];
    }),
  });
});

// ─── Token CRUD ──────────────────────────────────────────────────────────────

describe('getToken', () => {
  it('returns token from localStorage', () => {
    mockStorage['codeforge_token'] = 'abc123';
    expect(getToken()).toBe('abc123');
  });

  it('returns null when no token stored', () => {
    expect(getToken()).toBeNull();
  });

  it('returns null when localStorage throws', () => {
    vi.stubGlobal('localStorage', {
      getItem: () => {
        throw new Error('Unavailable');
      },
    });
    expect(getToken()).toBeNull();
  });
});

describe('setToken', () => {
  it('stores token in localStorage', () => {
    setToken('mytoken');
    expect(mockStorage['codeforge_token']).toBe('mytoken');
  });

  it('does not throw when localStorage unavailable', () => {
    vi.stubGlobal('localStorage', {
      setItem: () => {
        throw new Error('Unavailable');
      },
    });
    expect(() => setToken('mytoken')).not.toThrow();
  });
});

describe('clearToken', () => {
  it('removes token from localStorage', () => {
    mockStorage['codeforge_token'] = 'abc';
    clearToken();
    expect(mockStorage['codeforge_token']).toBeUndefined();
  });

  it('does not throw when localStorage unavailable', () => {
    vi.stubGlobal('localStorage', {
      removeItem: () => {
        throw new Error('Unavailable');
      },
    });
    expect(() => clearToken()).not.toThrow();
  });
});

// ─── apiFetch ────────────────────────────────────────────────────────────────

describe('apiFetch', () => {
  beforeEach(() => {
    // Prevent actual navigation — use defineProperty so href assignment doesn't throw in jsdom
    Object.defineProperty(window, 'location', {
      value: { href: '' },
      writable: true,
      configurable: true,
    });
  });

  it('sends request with Content-Type header', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      status: 200,
      text: () => Promise.resolve(JSON.stringify({ success: true, data: 'ok' })),
    });
    vi.stubGlobal('fetch', mockFetch);

    await apiFetch('/api/test');

    expect(mockFetch).toHaveBeenCalledWith('/api/test', expect.objectContaining({
      headers: expect.objectContaining({ 'Content-Type': 'application/json' }),
    }));
  });

  it('includes Authorization header when token exists', async () => {
    mockStorage['codeforge_token'] = 'testtoken';
    const mockFetch = vi.fn().mockResolvedValue({
      status: 200,
      text: () => Promise.resolve(JSON.stringify({ success: true })),
    });
    vi.stubGlobal('fetch', mockFetch);

    await apiFetch('/api/test');

    const headers = mockFetch.mock.calls[0][1].headers;
    expect(headers['Authorization']).toBe('Bearer testtoken');
  });

  it('does not include Authorization when no token', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      status: 200,
      text: () => Promise.resolve(JSON.stringify({ success: true })),
    });
    vi.stubGlobal('fetch', mockFetch);

    await apiFetch('/api/test');

    const headers = mockFetch.mock.calls[0][1].headers;
    expect(headers['Authorization']).toBeUndefined();
  });

  it('parses JSON response correctly', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      status: 200,
      text: () => Promise.resolve(JSON.stringify({ success: true, data: { id: 1 } })),
    }));

    const result = await apiFetch('/api/test');
    expect(result).toEqual({ success: true, data: { id: 1 } });
  });

  it('handles 401 by clearing token and redirecting', async () => {
    mockStorage['codeforge_token'] = 'expired';
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      status: 401,
      text: () => Promise.resolve('Unauthorized'),
    }));

    const result = await apiFetch('/api/test');

    expect(result).toEqual({ success: false, error: 'Session expired' });
    expect(mockStorage['codeforge_token']).toBeUndefined();
  });

  it('handles non-JSON response gracefully', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      status: 500,
      text: () => Promise.resolve('Internal Server Error'),
    }));

    const result = await apiFetch('/api/test');
    expect(result).toEqual({ success: false, error: 'Unexpected response (500)' });
  });

  it('handles network error', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Network failure')));

    const result = await apiFetch('/api/test');
    expect(result).toEqual({ success: false, error: 'Network error' });
  });

  it('passes custom options through', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      status: 200,
      text: () => Promise.resolve(JSON.stringify({ success: true })),
    });
    vi.stubGlobal('fetch', mockFetch);

    await apiFetch('/api/test', { method: 'POST', body: '{"foo":"bar"}' });

    expect(mockFetch).toHaveBeenCalledWith('/api/test', expect.objectContaining({
      method: 'POST',
      body: '{"foo":"bar"}',
    }));
  });
});
