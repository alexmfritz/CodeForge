import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { LeaderboardEntry, LeaderboardHighlight, LeaderboardPeriod } from '@codeforge/shared';
import { apiFetch } from '../utils/api';

interface LeaderboardState {
  entries: LeaderboardEntry[];
  highlights: LeaderboardHighlight[];
  filterCohortId: string | null; // null = user's cohort, 'all' = all cohorts
  filterPeriod: LeaderboardPeriod;
  loading: boolean;
  highlightsLoading: boolean;
}

const initialState: LeaderboardState = {
  entries: [],
  highlights: [],
  filterCohortId: null,
  filterPeriod: 'all',
  loading: false,
  highlightsLoading: false,
};

interface FetchLeaderboardArgs {
  cohortId: string | null;
  period: LeaderboardPeriod;
}

export const fetchLeaderboard = createAsyncThunk(
  'leaderboard/fetchEntries',
  async ({ cohortId, period }: FetchLeaderboardArgs, { rejectWithValue }) => {
    const params = new URLSearchParams();
    if (cohortId) params.set('cohortId', cohortId);
    if (period !== 'all') params.set('period', period);
    const qs = params.toString();
    const result = await apiFetch<LeaderboardEntry[]>(`/api/leaderboard${qs ? `?${qs}` : ''}`);
    if (!result.success || !result.data) {
      return rejectWithValue(result.error || 'Failed to load leaderboard');
    }
    return result.data;
  },
);

export const fetchHighlights = createAsyncThunk(
  'leaderboard/fetchHighlights',
  async (cohortId: string | null, { rejectWithValue }) => {
    const params = cohortId ? `?cohortId=${cohortId}` : '';
    const result = await apiFetch<LeaderboardHighlight[]>(`/api/leaderboard/highlights${params}`);
    if (!result.success || !result.data) {
      return rejectWithValue(result.error || 'Failed to load highlights');
    }
    return result.data;
  },
);

const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {
    setFilterCohortId(state, action: PayloadAction<string | null>) {
      state.filterCohortId = action.payload;
    },
    setFilterPeriod(state, action: PayloadAction<LeaderboardPeriod>) {
      state.filterPeriod = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaderboard.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLeaderboard.fulfilled, (state, action) => {
        state.loading = false;
        state.entries = action.payload;
      })
      .addCase(fetchLeaderboard.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchHighlights.pending, (state) => {
        state.highlightsLoading = true;
      })
      .addCase(fetchHighlights.fulfilled, (state, action) => {
        state.highlightsLoading = false;
        state.highlights = action.payload;
      })
      .addCase(fetchHighlights.rejected, (state) => {
        state.highlightsLoading = false;
      });
  },
});

export const { setFilterCohortId, setFilterPeriod } = leaderboardSlice.actions;
export default leaderboardSlice.reducer;
