import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { Progress, Review } from '@codeforge/shared';
import { apiFetch } from '../utils/api';
import type { RootState } from './store';

interface NewAchievement {
  _id: string;
  achievementId: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: string;
}

interface CompleteResponse extends Progress {
  newAchievements?: NewAchievement[];
  newReview?: Review | null;
}

function hashCode(str: string): string {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash + str.charCodeAt(i)) | 0;
  }
  return String(hash);
}

interface ProgressState {
  items: Record<string, Progress>;
  loading: boolean;
}

const initialState: ProgressState = {
  items: {},
  loading: false,
};

export const fetchProgress = createAsyncThunk(
  'progress/fetchAll',
  async (_, { rejectWithValue }) => {
    const result = await apiFetch<Progress[]>('/api/progress');
    if (!result.success || !result.data) {
      return rejectWithValue(result.error || 'Failed to load progress');
    }
    return result.data;
  },
);

export const saveSolution = createAsyncThunk(
  'progress/save',
  async ({ exerciseId, code }: { exerciseId: string; code: string }, { rejectWithValue }) => {
    const result = await apiFetch<Progress>(`/api/progress/${exerciseId}/save`, {
      method: 'POST',
      body: JSON.stringify({ code }),
    });
    if (!result.success || !result.data) {
      return rejectWithValue(result.error || 'Save failed');
    }
    return result.data;
  },
);

export const recordAttempt = createAsyncThunk(
  'progress/attempt',
  async (
    { exerciseId, codeHash, passed }: { exerciseId: string; codeHash: string; passed: boolean },
    { rejectWithValue },
  ) => {
    const result = await apiFetch<{ progress: Progress; isUnique: boolean }>(
      `/api/progress/${exerciseId}/attempt`,
      { method: 'POST', body: JSON.stringify({ codeHash, passed }) },
    );
    if (!result.success || !result.data) {
      return rejectWithValue(result.error || 'Attempt recording failed');
    }
    return result.data;
  },
);

export const markComplete = createAsyncThunk(
  'progress/complete',
  async (
    {
      exerciseId,
      attempts,
      solutionViewed,
    }: { exerciseId: string; attempts: number; solutionViewed: boolean },
    { rejectWithValue },
  ) => {
    const result = await apiFetch<CompleteResponse>(`/api/progress/${exerciseId}/complete`, {
      method: 'POST',
      body: JSON.stringify({ attempts, solutionViewed }),
    });
    if (!result.success || !result.data) {
      return rejectWithValue(result.error || 'Complete failed');
    }
    const { newAchievements, newReview, ...progress } = result.data;
    return { progress: progress as Progress, newAchievements: newAchievements ?? [], newReview: newReview ?? null };
  },
);

export const resetExercise = createAsyncThunk(
  'progress/reset',
  async (exerciseId: string, { rejectWithValue }) => {
    const result = await apiFetch<Progress | null>(`/api/progress/${exerciseId}/reset`, {
      method: 'POST',
    });
    if (!result.success) {
      return rejectWithValue(result.error || 'Reset failed');
    }
    return { exerciseId, progress: result.data };
  },
);

export const viewSolution = createAsyncThunk(
  'progress/viewSolution',
  async (exerciseId: string, { rejectWithValue }) => {
    const result = await apiFetch<Progress>(`/api/progress/${exerciseId}/view-solution`, {
      method: 'POST',
    });
    if (!result.success || !result.data) {
      return rejectWithValue(result.error || 'Failed');
    }
    return result.data;
  },
);

const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    recordLocalFailedAttempt(
      state,
      action: PayloadAction<{ exerciseId: string; code: string }>,
    ) {
      const { exerciseId, code } = action.payload;
      const item = state.items[exerciseId];
      if (!item) return;
      const h = hashCode(code.trim());
      if (!item.failedCodeHashes.includes(h)) {
        item.failedCodeHashes.push(h);
        item.uniqueAttempts += 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProgress.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProgress.fulfilled, (state, action) => {
        state.loading = false;
        const map: Record<string, Progress> = {};
        for (const p of action.payload) {
          map[p.exerciseId] = p;
        }
        state.items = map;
      })
      .addCase(fetchProgress.rejected, (state) => {
        state.loading = false;
      })
      .addCase(saveSolution.fulfilled, (state, action) => {
        state.items[action.payload.exerciseId] = action.payload;
      })
      .addCase(recordAttempt.fulfilled, (state, action) => {
        state.items[action.payload.progress.exerciseId] = action.payload.progress;
      })
      .addCase(markComplete.fulfilled, (state, action) => {
        state.items[action.payload.progress.exerciseId] = action.payload.progress;
      })
      .addCase(resetExercise.fulfilled, (state, action) => {
        const { exerciseId, progress } = action.payload;
        if (progress) {
          state.items[exerciseId] = progress;
        } else {
          delete state.items[exerciseId];
        }
      })
      .addCase(viewSolution.fulfilled, (state, action) => {
        state.items[action.payload.exerciseId] = action.payload;
      });
  },
});

export const { recordLocalFailedAttempt } = progressSlice.actions;

// Selectors
export const selectProgress = (exerciseId: string) => (state: RootState) =>
  state.progress.items[exerciseId];

export const selectIsComplete = (exerciseId: string) => (state: RootState) =>
  state.progress.items[exerciseId]?.status === 'completed';

export const selectSavedCode = (exerciseId: string) => (state: RootState) =>
  state.progress.items[exerciseId]?.currentCode ?? null;

export const selectUniqueAttempts = (exerciseId: string) => (state: RootState) =>
  state.progress.items[exerciseId]?.uniqueAttempts ?? 0;

export const selectAttempts = (exerciseId: string) => (state: RootState) =>
  state.progress.items[exerciseId]?.attempts ?? 0;

export const selectIsDuplicateCode =
  (exerciseId: string, code: string) => (state: RootState) => {
    const item = state.progress.items[exerciseId];
    if (!item) return false;
    const h = hashCode(code.trim());
    return item.failedCodeHashes.includes(h);
  };

export default progressSlice.reducer;
