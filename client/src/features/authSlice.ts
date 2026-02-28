// Auth Redux slice — manages user session state, login/logout, and token lifecycle
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { User } from '@codeforge/shared';
import { apiFetch, setToken, clearToken, getToken } from '../utils/api';

// Slice state: user object, JWT token, loading flag, and error message
interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

// Hydrate token from localStorage so the session survives page reloads
const initialState: AuthState = {
  user: null,
  token: getToken(),
  loading: false,
  error: null,
};

// Async thunk: POST credentials to /api/auth/login, persist token on success
export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { username: string; password: string }, { rejectWithValue }) => {
    const result = await apiFetch<{ token: string; user: User }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    if (!result.success || !result.data) {
      return rejectWithValue(result.error || 'Login failed');
    }

    setToken(result.data.token);
    return result.data;
  },
);

// Async thunk: GET /api/auth/me to rehydrate the user from a stored token
export const fetchMe = createAsyncThunk('auth/fetchMe', async (_, { rejectWithValue }) => {
  const result = await apiFetch<User>('/api/auth/me');

  if (!result.success || !result.data) {
    clearToken();
    return rejectWithValue(result.error || 'Failed to fetch user');
  }

  return result.data;
});

// Slice definition with sync reducers (logout, clearError) and async thunk case handlers
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.error = null;
      clearToken();
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchMe.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchMe.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
