import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiFetch } from '../utils/api';
import type { Rating } from '@codeforge/shared';
import type { RootState } from './store';

interface RatingsState {
  ratings: Record<string, { averageStars: number; totalRatings: number }>;
  userRatings: Record<string, number>;
  loading: boolean;
}

const initialState: RatingsState = {
  ratings: {},
  userRatings: {},
  loading: false,
};

export const submitRating = createAsyncThunk(
  'ratings/submit',
  async ({ exerciseId, stars }: { exerciseId: string; stars: number }, { rejectWithValue }) => {
    const result = await apiFetch<Rating>('/api/ratings', {
      method: 'POST',
      body: JSON.stringify({ exerciseId, stars }),
    });
    if (!result.success || !result.data) {
      return rejectWithValue(result.error || 'Failed to submit rating');
    }
    return result.data;
  },
);

export const fetchBulkRatings = createAsyncThunk(
  'ratings/fetchBulk',
  async (exerciseIds: string[], { rejectWithValue }) => {
    const ids = exerciseIds.join(',');
    const result = await apiFetch<Record<string, { averageStars: number; totalRatings: number }>>(
      `/api/ratings/bulk?ids=${ids}`,
    );
    if (!result.success || !result.data) {
      return rejectWithValue(result.error || 'Failed to fetch ratings');
    }
    return result.data;
  },
);

export const fetchUserRating = createAsyncThunk(
  'ratings/fetchUserRating',
  async (exerciseId: string, { rejectWithValue }) => {
    const result = await apiFetch<Rating | null>(`/api/ratings/mine/${exerciseId}`);
    if (!result.success) {
      return rejectWithValue(result.error || 'Failed to fetch user rating');
    }
    return { exerciseId, rating: result.data };
  },
);

const ratingsSlice = createSlice({
  name: 'ratings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitRating.fulfilled, (state, action) => {
        const { exerciseId, stars } = action.payload;
        state.userRatings[exerciseId] = stars;
      })
      .addCase(fetchBulkRatings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBulkRatings.fulfilled, (state, action) => {
        state.loading = false;
        Object.assign(state.ratings, action.payload);
      })
      .addCase(fetchBulkRatings.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchUserRating.fulfilled, (state, action) => {
        const { exerciseId, rating } = action.payload;
        if (rating) {
          state.userRatings[exerciseId] = rating.stars;
        }
      });
  },
});

export const selectExerciseRating = (exerciseId: string) => (state: RootState) =>
  state.ratings.ratings[exerciseId];

export const selectUserRating = (exerciseId: string) => (state: RootState) =>
  state.ratings.userRatings[exerciseId];

export default ratingsSlice.reducer;
