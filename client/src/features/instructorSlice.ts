import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { User, Cohort, Progress, ExerciseDifficultyRow, EngagementData, HeatmapPagination } from '@codeforge/shared';
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
  pagination?: HeatmapPagination;
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
  difficultyReport: ExerciseDifficultyRow[];
  difficultyReportLoading: boolean;
  engagement: EngagementData | null;
  engagementLoading: boolean;
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
  difficultyReport: [],
  difficultyReportLoading: false,
  engagement: null,
  engagementLoading: false,
};

export const fetchOverview = createAsyncThunk(
  'instructor/fetchOverview',
  async (cohortId: string | undefined, { rejectWithValue }) => {
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
  async (
    params: { cohortId: string; tier?: number; type?: string; collectionId?: string; page?: number; pageSize?: number },
    { rejectWithValue },
  ) => {
    const query = new URLSearchParams();
    if (params.tier) query.set('tier', String(params.tier));
    if (params.type) query.set('type', params.type);
    if (params.collectionId) query.set('collectionId', params.collectionId);
    if (params.page) query.set('page', String(params.page));
    if (params.pageSize) query.set('pageSize', String(params.pageSize));
    const qs = query.toString();
    const url = `/api/instructor/cohort/${params.cohortId}/heatmap${qs ? `?${qs}` : ''}`;
    const result = await apiFetch<HeatmapData>(url);
    if (!result.success || !result.data) {
      return rejectWithValue(result.error || 'Failed to load heatmap');
    }
    return result.data;
  },
);

export const fetchDifficultyReport = createAsyncThunk(
  'instructor/fetchDifficultyReport',
  async (
    params: { cohortId?: string; tier?: number; type?: string; collectionId?: string },
    { rejectWithValue },
  ) => {
    const query = new URLSearchParams();
    if (params.cohortId) query.set('cohortId', params.cohortId);
    if (params.tier) query.set('tier', String(params.tier));
    if (params.type) query.set('type', params.type);
    if (params.collectionId) query.set('collectionId', params.collectionId);
    const qs = query.toString();
    const result = await apiFetch<ExerciseDifficultyRow[]>(`/api/instructor/analytics/difficulty${qs ? `?${qs}` : ''}`);
    if (!result.success || !result.data) {
      return rejectWithValue(result.error || 'Failed to load difficulty report');
    }
    return result.data;
  },
);

export const fetchEngagementTimeline = createAsyncThunk(
  'instructor/fetchEngagementTimeline',
  async (params: { cohortId?: string; days?: number }, { rejectWithValue }) => {
    const query = new URLSearchParams();
    if (params.cohortId) query.set('cohortId', params.cohortId);
    if (params.days) query.set('days', String(params.days));
    const qs = query.toString();
    const result = await apiFetch<EngagementData>(`/api/instructor/analytics/engagement${qs ? `?${qs}` : ''}`);
    if (!result.success || !result.data) {
      return rejectWithValue(result.error || 'Failed to load engagement data');
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

export const resetUserPassword = createAsyncThunk(
  'instructor/resetUserPassword',
  async (userId: string, { rejectWithValue }) => {
    const result = await apiFetch<User>(`/api/users/${userId}/reset-password`, {
      method: 'POST',
    });
    if (!result.success || !result.data) {
      return rejectWithValue(result.error || 'Failed to reset password');
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
        state.cohorts.unshift({ ...action.payload, studentCount: action.payload.studentCount ?? 0 });
      })

      .addCase(updateCohort.fulfilled, (state, action) => {
        const idx = state.cohorts.findIndex((c) => c._id === action.payload._id);
        if (idx !== -1) {
          state.cohorts[idx] = { ...state.cohorts[idx], ...action.payload };
        }
      })

      .addCase(createUser.fulfilled, (state, action) => {
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
        state.students = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state) => {
        state.studentsLoading = false;
      })

      .addCase(fetchDifficultyReport.pending, (state) => {
        state.difficultyReportLoading = true;
      })
      .addCase(fetchDifficultyReport.fulfilled, (state, action) => {
        state.difficultyReportLoading = false;
        state.difficultyReport = action.payload;
      })
      .addCase(fetchDifficultyReport.rejected, (state) => {
        state.difficultyReportLoading = false;
      })

      .addCase(fetchEngagementTimeline.pending, (state) => {
        state.engagementLoading = true;
      })
      .addCase(fetchEngagementTimeline.fulfilled, (state, action) => {
        state.engagementLoading = false;
        state.engagement = action.payload;
      })
      .addCase(fetchEngagementTimeline.rejected, (state) => {
        state.engagementLoading = false;
      });
  },
});

export const { clearStudentProgress } = instructorSlice.actions;
export default instructorSlice.reducer;
