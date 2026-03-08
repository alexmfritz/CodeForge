import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Exercise, Category, Collection, ExercisesData } from '@codeforge/shared';
import { apiFetch } from '../utils/api';
import { showToast } from './uiSlice';

interface ExercisesState {
  exercises: Exercise[];
  categories: Record<string, Category>;
  collections: Collection[];
  loading: boolean;
  error: string | null;
}

const initialState: ExercisesState = {
  exercises: [],
  categories: {},
  collections: [],
  loading: false,
  error: null,
};

export const fetchExercises = createAsyncThunk<ExercisesData>(
  'exercises/fetchAll',
  async (_, { dispatch, rejectWithValue }) => {
    const result = await apiFetch<ExercisesData>('/api/exercises');
    if (!result.success || !result.data) {
      dispatch(showToast({ type: 'error', message: 'Failed to load exercises. Check your connection.' }));
      return rejectWithValue(result.error || 'Failed to load exercises');
    }
    return result.data;
  },
);

export const createExercise = createAsyncThunk(
  'exercises/create',
  async (data: Omit<Exercise, '_id' | 'slug' | 'createdAt' | 'updatedAt' | 'createdBy' | 'updatedBy' | 'isActive'>, { rejectWithValue }) => {
    const result = await apiFetch<Exercise>('/api/exercises', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    if (!result.success || !result.data) {
      return rejectWithValue(result.error || 'Failed to create exercise');
    }
    return result.data;
  },
);

export const updateExercise = createAsyncThunk(
  'exercises/update',
  async (
    { id, ...data }: { id: string } & Partial<Omit<Exercise, '_id' | 'slug' | 'createdAt' | 'updatedAt' | 'createdBy' | 'updatedBy'>>,
    { rejectWithValue },
  ) => {
    const result = await apiFetch<Exercise>(`/api/exercises/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
    if (!result.success || !result.data) {
      return rejectWithValue(result.error || 'Failed to update exercise');
    }
    return result.data;
  },
);

const exercisesSlice = createSlice({
  name: 'exercises',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExercises.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExercises.fulfilled, (state, action) => {
        state.loading = false;
        state.exercises = action.payload.exercises;
        state.categories = action.payload.categories;
        state.collections = action.payload.collections;
      })
      .addCase(fetchExercises.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(createExercise.fulfilled, (state, action) => {
        state.exercises.unshift(action.payload);
      })

      .addCase(updateExercise.fulfilled, (state, action) => {
        const idx = state.exercises.findIndex((e) => e._id === action.payload._id);
        if (idx !== -1) {
          state.exercises[idx] = action.payload;
        }
      });
  },
});

export default exercisesSlice.reducer;
