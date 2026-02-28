import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { DashboardStats } from '@codeforge/shared';
import { apiFetch } from '../utils/api';

interface DashboardState {
  stats: DashboardStats | null;
  loading: boolean;
}

const initialState: DashboardState = {
  stats: null,
  loading: false,
};

export const fetchDashboardStats = createAsyncThunk(
  'dashboard/fetchStats',
  async (_, { rejectWithValue }) => {
    const result = await apiFetch<DashboardStats>('/api/progress/stats');
    if (!result.success || !result.data) {
      return rejectWithValue(result.error || 'Failed to load stats');
    }
    return result.data;
  },
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardStats.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchDashboardStats.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default dashboardSlice.reducer;
