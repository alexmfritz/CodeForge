import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { User, Cohort, Progress } from '@codeforge/shared';
import { apiFetch } from '../utils/api';

interface CohortSummary {
  _id: string;
  name: string;
  studentCount: number;
  completedExercises: number;
  isActive: boolean;
}

interface OverviewData {
  totalStudents: number;
  totalCompleted: number;
  avgScore: number;
  totalScore: number;
  cohortSummary: CohortSummary[];
}

interface ExerciseSummary {
  _id: string;
  title: string;
  tier: number;
  type: string;
  category: string[];
  basePoints: number;
}

// exercise is null when the referenced exercise has been deleted from the DB
interface ProgressWithExercise extends Progress {
  exercise: ExerciseSummary | null;
}

interface StudentProgressData {
  student: User;
  progress: ProgressWithExercise[];
  summary: {
    totalExercises: number;
    completedCount: number;
    inProgressCount: number;
    totalScore: number;
    totalAttempts: number;
    tierBreakdown: Record<number, { completed: number; total: number; score: number }>;
    typeBreakdown: Record<string, { completed: number; total: number; score: number }>;
  };
}

interface CohortWithCount extends Cohort {
  studentCount: number;
}

interface HeatmapExercise {
  _id: string;
  title: string;
  tier: number;
  type: string;
}

interface HeatmapRow {
  studentId: string;
  displayName: string;
  cells: { exerciseId: string; status: string }[];
}

interface HeatmapData {
  exercises: HeatmapExercise[];
  students: HeatmapRow[];
}

interface InstructorState {
  overview: OverviewData | null;
  overviewLoading: boolean;
  students: User[];
  studentsLoading: boolean;
  selectedStudentProgress: StudentProgressData | null;
  studentProgressLoading: boolean;
  cohorts: CohortWithCount[];
  cohortsLoading: boolean;
  heatmap: HeatmapData | null;
  heatmapLoading: boolean;
}

const initialState: InstructorState = {
  overview: null,
  overviewLoading: false,
  students: [],
  studentsLoading: false,
  selectedStudentProgress: null,
  studentProgressLoading: false,
  cohorts: [],
  cohortsLoading: false,
  heatmap: null,
  heatmapLoading: false,
};

export const fetchOverview = createAsyncThunk(
  'instructor/fetchOverview',
  async (cohortId: string | undefined, { rejectWithValue }) => {
    // Build URL conditionally to avoid sending an empty cohortId query param
    const url = cohortId ? `/api/instructor/overview?cohortId=${cohortId}` : '/api/instructor/overview';
    const result = await apiFetch<OverviewData>(url);
    if (!result.success || !result.data) {
      return rejectWithValue(result.error || 'Failed to load overview');
    }
    return result.data;
  },
);

export const fetchStudents = createAsyncThunk(
  'instructor/fetchStudents',
  async (cohortId: string | undefined, { rejectWithValue }) => {
    // Always filter by role=student to avoid fetching instructors/TAs into the student list
    const params = new URLSearchParams({ role: 'student' });
    if (cohortId) params.set('cohortId', cohortId);
    const result = await apiFetch<User[]>(`/api/users?${params.toString()}`);
    if (!result.success || !result.data) {
      return rejectWithValue(result.error || 'Failed to load students');
    }
    return result.data;
  },
);

export const fetchStudentProgress = createAsyncThunk(
  'instructor/fetchStudentProgress',
  async (studentId: string, { rejectWithValue }) => {
    const result = await apiFetch<StudentProgressData>(`/api/instructor/students/${studentId}/progress`);
    if (!result.success || !result.data) {
      return rejectWithValue(result.error || 'Failed to load student progress');
    }
    return result.data;
  },
);

export const fetchCohorts = createAsyncThunk(
  'instructor/fetchCohorts',
  async (_, { rejectWithValue }) => {
    const result = await apiFetch<CohortWithCount[]>('/api/cohorts');
    if (!result.success || !result.data) {
      return rejectWithValue(result.error || 'Failed to load cohorts');
    }
    return result.data;
  },
);

export const fetchHeatmap = createAsyncThunk(
  'instructor/fetchHeatmap',
  async (cohortId: string, { rejectWithValue }) => {
    const result = await apiFetch<HeatmapData>(`/api/instructor/cohort/${cohortId}/heatmap`);
    if (!result.success || !result.data) {
      return rejectWithValue(result.error || 'Failed to load heatmap');
    }
    return result.data;
  },
);

export const createCohort = createAsyncThunk(
  'instructor/createCohort',
  async (data: { name: string; startDate: string; endDate?: string }, { rejectWithValue }) => {
    const result = await apiFetch<CohortWithCount>('/api/cohorts', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    if (!result.success || !result.data) {
      return rejectWithValue(result.error || 'Failed to create cohort');
    }
    return result.data;
  },
);

export const updateCohort = createAsyncThunk(
  'instructor/updateCohort',
  async ({ id, ...data }: { id: string; name?: string; startDate?: string; endDate?: string; isActive?: boolean }, { rejectWithValue }) => {
    const result = await apiFetch<CohortWithCount>(`/api/cohorts/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
    if (!result.success || !result.data) {
      return rejectWithValue(result.error || 'Failed to update cohort');
    }
    return result.data;
  },
);

export const createUser = createAsyncThunk(
  'instructor/createUser',
  async (data: { firstName: string; lastName: string; docNumber: string; role: string; cohortId?: string }, { rejectWithValue }) => {
    const result = await apiFetch<User>('/api/users', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    if (!result.success || !result.data) {
      return rejectWithValue(result.error || 'Failed to create user');
    }
    return result.data;
  },
);

export const bulkCreateUsers = createAsyncThunk(
  'instructor/bulkCreateUsers',
  async (data: { users: { firstName: string; lastName: string; docNumber: string }[]; cohortId: string }, { rejectWithValue }) => {
    const result = await apiFetch<User[]>('/api/users/bulk', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    if (!result.success || !result.data) {
      return rejectWithValue(result.error || 'Failed to create users');
    }
    return result.data;
  },
);

export const updateUser = createAsyncThunk(
  'instructor/updateUser',
  async ({ id, ...data }: { id: string; isActive?: boolean; role?: string; cohortId?: string | null }, { rejectWithValue }) => {
    const result = await apiFetch<User>(`/api/users/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
    if (!result.success || !result.data) {
      return rejectWithValue(result.error || 'Failed to update user');
    }
    return result.data;
  },
);

export const fetchAllUsers = createAsyncThunk(
  'instructor/fetchAllUsers',
  async (_, { rejectWithValue }) => {
    const result = await apiFetch<User[]>('/api/users');
    if (!result.success || !result.data) {
      return rejectWithValue(result.error || 'Failed to load users');
    }
    return result.data;
  },
);

const instructorSlice = createSlice({
  name: 'instructor',
  initialState,
  reducers: {
    clearStudentProgress(state) {
      state.selectedStudentProgress = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOverview.pending, (state) => {
        state.overviewLoading = true;
      })
      .addCase(fetchOverview.fulfilled, (state, action) => {
        state.overviewLoading = false;
        state.overview = action.payload;
      })
      .addCase(fetchOverview.rejected, (state) => {
        state.overviewLoading = false;
      })

      .addCase(fetchStudents.pending, (state) => {
        state.studentsLoading = true;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.studentsLoading = false;
        state.students = action.payload;
      })
      .addCase(fetchStudents.rejected, (state) => {
        state.studentsLoading = false;
      })

      .addCase(fetchStudentProgress.pending, (state) => {
        state.studentProgressLoading = true;
      })
      .addCase(fetchStudentProgress.fulfilled, (state, action) => {
        state.studentProgressLoading = false;
        state.selectedStudentProgress = action.payload;
      })
      .addCase(fetchStudentProgress.rejected, (state) => {
        state.studentProgressLoading = false;
      })

      .addCase(fetchCohorts.pending, (state) => {
        state.cohortsLoading = true;
      })
      .addCase(fetchCohorts.fulfilled, (state, action) => {
        state.cohortsLoading = false;
        state.cohorts = action.payload;
      })
      .addCase(fetchCohorts.rejected, (state) => {
        state.cohortsLoading = false;
      })

      .addCase(fetchHeatmap.pending, (state) => {
        state.heatmapLoading = true;
      })
      .addCase(fetchHeatmap.fulfilled, (state, action) => {
        state.heatmapLoading = false;
        state.heatmap = action.payload;
      })
      .addCase(fetchHeatmap.rejected, (state) => {
        state.heatmapLoading = false;
      })

      .addCase(createCohort.fulfilled, (state, action) => {
        // Prepend so the new cohort appears at the top of the list immediately
        state.cohorts.unshift({ ...action.payload, studentCount: action.payload.studentCount ?? 0 });
      })

      .addCase(updateCohort.fulfilled, (state, action) => {
        const idx = state.cohorts.findIndex((c) => c._id === action.payload._id);
        if (idx !== -1) {
          state.cohorts[idx] = { ...state.cohorts[idx], ...action.payload };
        }
      })

      .addCase(createUser.fulfilled, (state, action) => {
        // Only add to the student list; instructors/TAs are managed separately in UserManager
        if (action.payload.role === 'student') {
          state.students.push(action.payload);
        }
      })

      .addCase(bulkCreateUsers.fulfilled, (state, action) => {
        state.students.push(...action.payload);
      })

      .addCase(updateUser.fulfilled, (state, action) => {
        const idx = state.students.findIndex((s) => s._id === action.payload._id);
        if (idx !== -1) {
          state.students[idx] = action.payload;
        }
      })

      .addCase(fetchAllUsers.pending, (state) => {
        state.studentsLoading = true;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.studentsLoading = false;
        // UserManager needs all roles, so this overwrites the student-only list
        state.students = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state) => {
        state.studentsLoading = false;
      });
  },
});

export const { clearStudentProgress } = instructorSlice.actions;
export default instructorSlice.reducer;
