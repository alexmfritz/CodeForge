const TOKEN_KEY = 'codeforge_token';

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

    const text = await response.text();
    try {
      return JSON.parse(text);
    } catch {
      return { success: false, error: `Unexpected response (${response.status})` };
    }
  } catch {
    return { success: false, error: 'Network error' };
  }
}
