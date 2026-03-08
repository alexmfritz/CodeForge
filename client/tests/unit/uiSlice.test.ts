import { describe, it, expect, vi, beforeEach } from 'vitest';
import reducer, {
  setTheme,
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
} from '../../src/features/uiSlice';

// ─── Helpers ─────────────────────────────────────────────────────────────────

beforeEach(() => {
  vi.stubGlobal('localStorage', {
    getItem: vi.fn(() => null),
    setItem: vi.fn(),
    removeItem: vi.fn(),
  });
});

function makeState(overrides = {}) {
  return {
    theme: 'midnight' as const,
    browseFilter: {
      search: '',
      tags: [],
      tier: null,
      type: null,
      collectionId: null,
      categoryPath: [],
    },
    toast: null,
    saveStatus: 'idle' as const,
    statusSort: 'default' as const,
    ...overrides,
  };
}

// ─── Theme ───────────────────────────────────────────────────────────────────

describe('setTheme', () => {
  it('sets a valid theme', () => {
    const state = makeState();
    const next = reducer(state, setTheme('nord'));
    expect(next.theme).toBe('nord');
  });

  it('ignores an invalid theme value', () => {
    const state = makeState({ theme: 'midnight' });
    const next = reducer(state, setTheme('not-a-theme' as never));
    expect(next.theme).toBe('midnight');
  });
});

// ─── Toast ───────────────────────────────────────────────────────────────────

describe('showToast / dismissToast', () => {
  it('sets toast', () => {
    const state = makeState();
    const toast = { message: 'Hello!', type: 'success' as const };
    const next = reducer(state, showToast(toast));
    expect(next.toast).toEqual(toast);
  });

  it('dismisses toast', () => {
    const state = makeState({ toast: { message: 'Hi', type: 'info' } });
    const next = reducer(state, dismissToast());
    expect(next.toast).toBeNull();
  });

  it('dismissToast is a no-op when already null', () => {
    const state = makeState();
    const next = reducer(state, dismissToast());
    expect(next.toast).toBeNull();
  });
});

// ─── Filters ─────────────────────────────────────────────────────────────────

describe('filter reducers', () => {
  it('setSearch updates search string', () => {
    const state = makeState();
    const next = reducer(state, setSearch('hello'));
    expect(next.browseFilter.search).toBe('hello');
  });

  it('toggleTag adds a tag', () => {
    const state = makeState();
    const next = reducer(state, toggleTag('js'));
    expect(next.browseFilter.tags).toContain('js');
  });

  it('toggleTag removes an existing tag', () => {
    const state = makeState({
      browseFilter: { ...makeState().browseFilter, tags: ['js', 'css'] },
    });
    const next = reducer(state, toggleTag('js'));
    expect(next.browseFilter.tags).toEqual(['css']);
  });

  it('setTierFilter sets tier', () => {
    const state = makeState();
    const next = reducer(state, setTierFilter(3));
    expect(next.browseFilter.tier).toBe(3);
  });

  it('setTierFilter clears with null', () => {
    const state = makeState({ browseFilter: { ...makeState().browseFilter, tier: 2 } });
    const next = reducer(state, setTierFilter(null));
    expect(next.browseFilter.tier).toBeNull();
  });

  it('setTypeFilter sets type', () => {
    const state = makeState();
    const next = reducer(state, setTypeFilter('css'));
    expect(next.browseFilter.type).toBe('css');
  });

  it('setCollectionFilter sets collectionId', () => {
    const state = makeState();
    const next = reducer(state, setCollectionFilter('col1'));
    expect(next.browseFilter.collectionId).toBe('col1');
  });

  it('setCategoryPath updates path', () => {
    const state = makeState();
    const next = reducer(state, setCategoryPath(['js', 'arrays']));
    expect(next.browseFilter.categoryPath).toEqual(['js', 'arrays']);
  });

  it('clearFilters resets all filter state', () => {
    const state = makeState({
      browseFilter: {
        search: 'hello',
        tags: ['js'],
        tier: 2,
        type: 'css',
        collectionId: 'col1',
        categoryPath: ['js'],
      },
      statusSort: 'completed',
    });
    const next = reducer(state, clearFilters());
    expect(next.browseFilter).toEqual({
      search: '',
      tags: [],
      tier: null,
      type: null,
      collectionId: null,
      categoryPath: [],
    });
    expect(next.statusSort).toBe('default');
  });
});

// ─── Save Status ─────────────────────────────────────────────────────────────

describe('setSaveStatus', () => {
  it('transitions idle → saving', () => {
    const state = makeState();
    const next = reducer(state, setSaveStatus('saving'));
    expect(next.saveStatus).toBe('saving');
  });

  it('transitions saving → saved', () => {
    const state = makeState({ saveStatus: 'saving' });
    const next = reducer(state, setSaveStatus('saved'));
    expect(next.saveStatus).toBe('saved');
  });

  it('transitions saved → idle', () => {
    const state = makeState({ saveStatus: 'saved' });
    const next = reducer(state, setSaveStatus('idle'));
    expect(next.saveStatus).toBe('idle');
  });
});

// ─── Status Sort ─────────────────────────────────────────────────────────────

describe('setStatusSort', () => {
  it('sets status sort value', () => {
    const state = makeState();
    const next = reducer(state, setStatusSort('completed'));
    expect(next.statusSort).toBe('completed');
  });
});
