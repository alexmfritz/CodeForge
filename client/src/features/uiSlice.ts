import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Theme, Toast, Tier, ExerciseType, StatusSort } from '@codeforge/shared';
import { THEMES, DEFAULT_THEME, MIN_EDITOR_FONT_SIZE, MAX_EDITOR_FONT_SIZE, DEFAULT_EDITOR_FONT_SIZE } from '@codeforge/shared/constants';

const VALID_THEMES = new Set(THEMES.map((t) => t.id));

function getInitialTheme(): Theme {
  try {
    const stored = localStorage.getItem('theme') as Theme | null;
    return stored && VALID_THEMES.has(stored) ? stored : DEFAULT_THEME;
  } catch {
    return DEFAULT_THEME;
  }
}

function getInitialFontSize(): number {
  try {
    const stored = Number(localStorage.getItem('editorFontSize'));
    return stored >= MIN_EDITOR_FONT_SIZE && stored <= MAX_EDITOR_FONT_SIZE ? stored : DEFAULT_EDITOR_FONT_SIZE;
  } catch {
    return DEFAULT_EDITOR_FONT_SIZE;
  }
}

interface UiState {
  theme: Theme;
  editorFontSize: number;
  browseFilter: {
    search: string;
    tags: string[];
    tier: Tier | null;
    type: ExerciseType | null;
    collectionId: string | null;
    categoryPath: string[];
  };
  toast: Toast | null;
  saveStatus: 'idle' | 'saving' | 'saved';
  statusSort: StatusSort;
}

const initialState: UiState = {
  theme: getInitialTheme(),
  editorFontSize: getInitialFontSize(),
  browseFilter: {
    search: '',
    tags: [],
    tier: null,
    type: null,
    collectionId: null,
    categoryPath: [],
  },
  toast: null,
  saveStatus: 'idle',
  statusSort: 'default',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<Theme>) {
      if (VALID_THEMES.has(action.payload)) {
        state.theme = action.payload;
        try {
          localStorage.setItem('theme', action.payload);
        } catch {
          // localStorage may not be available
        }
      }
    },
    setEditorFontSize(state, action: PayloadAction<number>) {
      const size = Math.max(MIN_EDITOR_FONT_SIZE, Math.min(MAX_EDITOR_FONT_SIZE, action.payload));
      state.editorFontSize = size;
      try {
        localStorage.setItem('editorFontSize', String(size));
      } catch {
        // localStorage may not be available
      }
    },
    showToast(state, action: PayloadAction<Toast>) {
      state.toast = action.payload;
    },
    dismissToast(state) {
      state.toast = null;
    },
    setSearch(state, action: PayloadAction<string>) {
      state.browseFilter.search = action.payload;
    },
    toggleTag(state, action: PayloadAction<string>) {
      const tag = action.payload;
      const idx = state.browseFilter.tags.indexOf(tag);
      if (idx === -1) {
        state.browseFilter.tags.push(tag);
      } else {
        state.browseFilter.tags.splice(idx, 1);
      }
    },
    setTierFilter(state, action: PayloadAction<Tier | null>) {
      state.browseFilter.tier = action.payload;
    },
    setTypeFilter(state, action: PayloadAction<ExerciseType | null>) {
      state.browseFilter.type = action.payload;
    },
    setCollectionFilter(state, action: PayloadAction<string | null>) {
      state.browseFilter.collectionId = action.payload;
    },
    setCategoryPath(state, action: PayloadAction<string[]>) {
      state.browseFilter.categoryPath = action.payload;
    },
    clearFilters(state) {
      state.browseFilter = {
        search: '',
        tags: [],
        tier: null,
        type: null,
        collectionId: null,
        categoryPath: [],
      };
      state.statusSort = 'default';
    },
    setSaveStatus(state, action: PayloadAction<UiState['saveStatus']>) {
      state.saveStatus = action.payload;
    },
    setStatusSort(state, action: PayloadAction<StatusSort>) {
      state.statusSort = action.payload;
    },
  },
});

export const {
  setTheme,
  setEditorFontSize,
  showToast,
  dismissToast,
  setSearch,
  toggleTag,
  setTierFilter,
  setTypeFilter,
  setCollectionFilter,
  setCategoryPath,
  clearFilters,
  setSaveStatus,
  setStatusSort,
} = uiSlice.actions;

export default uiSlice.reducer;
