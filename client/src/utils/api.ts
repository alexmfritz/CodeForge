// API utility — JWT-aware fetch wrapper and token lifecycle helpers
// localStorage key for persisting the JWT across page reloads
const TOKEN_KEY = 'codeforge_token';

// Token accessors: read, write, and clear the JWT from localStorage
export function getToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setToken(token: string): void {
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch {
    // localStorage may not be available
  }
}

export function clearToken(): void {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch {
    // localStorage may not be available
  }
}

// apiFetch: wraps fetch to auto-inject Bearer token and redirect to /login on 401 (expired session)
export async function apiFetch<T>(
  url: string,
  options: RequestInit = {},
): Promise<{ success: boolean; data?: T; error?: string }> {
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, { ...options, headers });

    if (response.status === 401) {
      clearToken();
      window.location.href = '/login';
      return { success: false, error: 'Session expired' };
    }

    const data = await response.json();
    return data;
  } catch {
    return { success: false, error: 'Network error' };
  }
}
