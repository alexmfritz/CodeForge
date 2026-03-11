import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { Review } from '@codeforge/shared';
import { apiFetch } from '../utils/api';
import type { RootState } from './store';

interface ReviewState {
  pendingReview: Review | null;
  loading: boolean;
}

const initialState: ReviewState = {
  pendingReview: null,
  loading: false,
};

export const fetchPendingReview = createAsyncThunk(
  'reviews/fetchPending',
  async (_, { rejectWithValue }) => {
    const result = await apiFetch<Review | null>('/api/reviews/pending');
    if (!result.success) {
      return rejectWithValue(result.error || 'Failed to fetch pending review');
    }
    return result.data ?? null;
  },
);

export const completeReview = createAsyncThunk(
  'reviews/complete',
  async (reviewId: string, { rejectWithValue }) => {
    const result = await apiFetch<Review>(`/api/reviews/${reviewId}/complete`, {
      method: 'POST',
    });
    if (!result.success || !result.data) {
      return rejectWithValue(result.error || 'Failed to complete review');
    }
    return result.data;
  },
);

export const skipReview = createAsyncThunk(
  'reviews/skip',
  async (reviewId: string, { rejectWithValue }) => {
    const result = await apiFetch<Review>(`/api/reviews/${reviewId}/skip`, {
      method: 'POST',
    });
    if (!result.success || !result.data) {
      return rejectWithValue(result.error || 'Failed to skip review');
    }
    return result.data;
  },
);

const reviewSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    setPendingReview(state, action: PayloadAction<Review | null>) {
      state.pendingReview = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPendingReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPendingReview.fulfilled, (state, action) => {
        state.loading = false;
        state.pendingReview = action.payload;
      })
      .addCase(fetchPendingReview.rejected, (state) => {
        state.loading = false;
      })
      .addCase(completeReview.fulfilled, (state) => {
        state.pendingReview = null;
      })
      .addCase(skipReview.fulfilled, (state) => {
        state.pendingReview = null;
      });
  },
});

export const { setPendingReview } = reviewSlice.actions;

export const selectPendingReview = (state: RootState) => state.reviews.pendingReview;

export default reviewSlice.reducer;
