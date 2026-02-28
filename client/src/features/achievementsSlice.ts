import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { AchievementDefinition } from '@codeforge/shared';
import { apiFetch } from '../utils/api';
import type { RootState } from './store';

interface EarnedInstance {
  _id: string;
  userId: string;
  achievementId: string;
  cohortId: string;
  earnedAt: string;
  metadata: Record<string, unknown>;
  definition: {
    _id: string;
    name: string;
    description: string;
    icon: string;
    criteriaType: string;
    criteriaParams: Record<string, unknown>;
    isActive: boolean;
  };
}

interface NewAchievement {
  _id: string;
  achievementId: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: string;
}

interface AchievementsState {
  definitions: AchievementDefinition[];
  earned: EarnedInstance[];
  loading: boolean;
  pendingToast: NewAchievement | null;
}

const initialState: AchievementsState = {
  definitions: [],
  earned: [],
  loading: false,
  pendingToast: null,
};

export const fetchDefinitions = createAsyncThunk(
  'achievements/fetchDefinitions',
  async (_, { rejectWithValue }) => {
    const result = await apiFetch<AchievementDefinition[]>('/api/achievements');
    if (!result.success || !result.data) {
      return rejectWithValue(result.error || 'Failed to load achievement definitions');
    }
    return result.data;
  },
);

export const fetchMyAchievements = createAsyncThunk(
  'achievements/fetchMine',
  async (_, { rejectWithValue }) => {
    const result = await apiFetch<EarnedInstance[]>('/api/achievements/mine');
    if (!result.success || !result.data) {
      return rejectWithValue(result.error || 'Failed to load earned achievements');
    }
    return result.data;
  },
);

const achievementsSlice = createSlice({
  name: 'achievements',
  initialState,
  reducers: {
    addNewlyEarned(state, action: PayloadAction<NewAchievement[]>) {
      for (const achievement of action.payload) {
        const alreadyExists = state.earned.some(
          (e) => e.achievementId === achievement.achievementId,
        );
        if (!alreadyExists) {
          state.earned.push({
            _id: achievement._id,
            userId: '',
            achievementId: achievement.achievementId,
            cohortId: '',
            earnedAt: achievement.earnedAt,
            metadata: {},
            definition: {
              _id: achievement.achievementId,
              name: achievement.name,
              description: achievement.description,
              icon: achievement.icon,
              criteriaType: '',
              criteriaParams: {},
              isActive: true,
            },
          });
        }
      }
    },
    showAchievementToast(state, action: PayloadAction<NewAchievement>) {
      state.pendingToast = action.payload;
    },
    dismissAchievementToast(state) {
      state.pendingToast = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDefinitions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDefinitions.fulfilled, (state, action) => {
        state.loading = false;
        state.definitions = action.payload;
      })
      .addCase(fetchDefinitions.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchMyAchievements.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyAchievements.fulfilled, (state, action) => {
        state.loading = false;
        state.earned = action.payload;
      })
      .addCase(fetchMyAchievements.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { addNewlyEarned, showAchievementToast, dismissAchievementToast } =
  achievementsSlice.actions;

export const selectEarnedIds = (state: RootState) =>
  new Set(state.achievements.earned.map((e) => e.achievementId));

export const selectEarnedMap = (state: RootState) => {
  const map: Record<string, EarnedInstance> = {};
  for (const e of state.achievements.earned) {
    map[e.achievementId] = e;
  }
  return map;
};

export const selectPendingToast = (state: RootState) =>
  state.achievements.pendingToast;

export default achievementsSlice.reducer;
