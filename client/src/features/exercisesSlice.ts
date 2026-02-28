import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Exercise, Category, Collection, ExercisesData } from '@codeforge/shared';
import { apiFetch } from '../utils/api';
import { setServerReachable } from './uiSlice';

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
      dispatch(setServerReachable(false));
      return rejectWithValue(result.error || 'Failed to load exercises');
    }
    dispatch(setServerReachable(true));
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
      });
  },
});

export default exercisesSlice.reducer;
