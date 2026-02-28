import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Assignment } from '@codeforge/shared';
import { apiFetch } from '../utils/api';

interface ExerciseSummary {
  _id: string;
  title: string;
  tier: number;
  type: string;
  category: string[];
  basePoints: number;
}

interface AssignmentDetail extends Assignment {
  exercises: ExerciseSummary[];
}

interface StudentProgressEntry {
  studentId: string;
  displayName: string;
  username: string;
  completed: number;
  total: number;
  completedExerciseIds: string[];
}

interface AssignmentProgressData {
  assignmentId: string;
  totalExercises: number;
  students: StudentProgressEntry[];
}

interface AssignmentsState {
  assignments: Assignment[];
  loading: boolean;
  selectedDetail: AssignmentDetail | null;
  detailLoading: boolean;
  progress: AssignmentProgressData | null;
  progressLoading: boolean;
}

const initialState: AssignmentsState = {
  assignments: [],
  loading: false,
  selectedDetail: null,
  detailLoading: false,
  progress: null,
  progressLoading: false,
};

export const fetchAssignments = createAsyncThunk(
  'assignments/fetchAll',
  async (cohortId: string | undefined, { rejectWithValue }) => {
    const url = cohortId ? `/api/assignments?cohortId=${cohortId}` : '/api/assignments';
    const result = await apiFetch<Assignment[]>(url);
    if (!result.success || !result.data) {
      return rejectWithValue(result.error || 'Failed to load assignments');
    }
    return result.data;
  },
);

export const fetchAssignmentDetail = createAsyncThunk(
  'assignments/fetchDetail',
  async (id: string, { rejectWithValue }) => {
    const result = await apiFetch<AssignmentDetail>(`/api/assignments/${id}`);
    if (!result.success || !result.data) {
      return rejectWithValue(result.error || 'Failed to load assignment');
    }
    return result.data;
  },
);

export const fetchAssignmentProgress = createAsyncThunk(
  'assignments/fetchProgress',
  async (id: string, { rejectWithValue }) => {
    const result = await apiFetch<AssignmentProgressData>(`/api/assignments/${id}/progress`);
    if (!result.success || !result.data) {
      return rejectWithValue(result.error || 'Failed to load progress');
    }
    return result.data;
  },
);

export const createAssignment = createAsyncThunk(
  'assignments/create',
  async (
    data: {
      title: string;
      description?: string;
      cohortId: string;
      exerciseIds: string[];
      targetStudentIds?: string[];
      dueDate?: string;
    },
    { rejectWithValue },
  ) => {
    const result = await apiFetch<Assignment>('/api/assignments', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    if (!result.success || !result.data) {
      return rejectWithValue(result.error || 'Failed to create assignment');
    }
    return result.data;
  },
);

export const updateAssignment = createAsyncThunk(
  'assignments/update',
  async (
    {
      id,
      ...data
    }: {
      id: string;
      title?: string;
      description?: string;
      exerciseIds?: string[];
      targetStudentIds?: string[];
      dueDate?: string | null;
      isActive?: boolean;
    },
    { rejectWithValue },
  ) => {
    const result = await apiFetch<Assignment>(`/api/assignments/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
    if (!result.success || !result.data) {
      return rejectWithValue(result.error || 'Failed to update assignment');
    }
    return result.data;
  },
);

export const deleteAssignment = createAsyncThunk(
  'assignments/delete',
  async (id: string, { rejectWithValue }) => {
    const result = await apiFetch<Assignment>(`/api/assignments/${id}`, {
      method: 'DELETE',
    });
    if (!result.success || !result.data) {
      return rejectWithValue(result.error || 'Failed to delete assignment');
    }
    return result.data;
  },
);

const assignmentsSlice = createSlice({
  name: 'assignments',
  initialState,
  reducers: {
    clearAssignmentDetail(state) {
      state.selectedDetail = null;
      state.progress = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssignments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAssignments.fulfilled, (state, action) => {
        state.loading = false;
        state.assignments = action.payload;
      })
      .addCase(fetchAssignments.rejected, (state) => {
        state.loading = false;
      })

      .addCase(fetchAssignmentDetail.pending, (state) => {
        state.detailLoading = true;
      })
      .addCase(fetchAssignmentDetail.fulfilled, (state, action) => {
        state.detailLoading = false;
        state.selectedDetail = action.payload;
      })
      .addCase(fetchAssignmentDetail.rejected, (state) => {
        state.detailLoading = false;
      })

      .addCase(fetchAssignmentProgress.pending, (state) => {
        state.progressLoading = true;
      })
      .addCase(fetchAssignmentProgress.fulfilled, (state, action) => {
        state.progressLoading = false;
        state.progress = action.payload;
      })
      .addCase(fetchAssignmentProgress.rejected, (state) => {
        state.progressLoading = false;
      })

      .addCase(createAssignment.fulfilled, (state, action) => {
        state.assignments.unshift(action.payload);
      })

      .addCase(updateAssignment.fulfilled, (state, action) => {
        const idx = state.assignments.findIndex((a) => a._id === action.payload._id);
        if (idx !== -1) {
          state.assignments[idx] = action.payload;
        }
        if (state.selectedDetail && state.selectedDetail._id === action.payload._id) {
          state.selectedDetail = { ...state.selectedDetail, ...action.payload };
        }
      })

      .addCase(deleteAssignment.fulfilled, (state, action) => {
        state.assignments = state.assignments.filter((a) => a._id !== action.payload._id);
      });
  },
});

export const { clearAssignmentDetail } = assignmentsSlice.actions;
export default assignmentsSlice.reducer;
