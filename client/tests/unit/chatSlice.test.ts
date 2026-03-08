import { describe, it, expect, vi, beforeEach } from 'vitest';
import reducer, {
  enterChat,
  leaveChat,
  setInRoom,
  setMessages,
  addMessage,
  setActiveUsers,
  setTypingUser,
  setPinnedMessage,
  updateReactions,
  addMention,
  clearMention,
  resetUnread,
  fetchArchivedLogs,
  fetchArchivedLog,
  deleteArchivedLog,
} from '../../src/features/chatSlice';
import type { ChatMessage } from '@codeforge/shared';

// Stub localStorage for module initialization
beforeEach(() => {
  vi.stubGlobal('localStorage', {
    getItem: vi.fn(() => null),
    setItem: vi.fn(),
    removeItem: vi.fn(),
  });
});

// ─── Helpers ─────────────────────────────────────────────────────────────────

function makeState(overrides = {}) {
  return {
    inRoom: false,
    currentCohortId: null,
    hasEnteredLobby: false,
    messages: [] as ChatMessage[],
    pinnedMessage: null,
    activeUsers: [],
    typingUsers: [],
    unreadCount: 0,
    pendingMentions: [],
    archivedLogs: [],
    archivedLogsLoading: false,
    selectedLog: null,
    selectedLogLoading: false,
    ...overrides,
  };
}

function makeMessage(overrides = {}): ChatMessage {
  return {
    _id: 'msg1',
    cohortId: 'c1',
    userId: 'u1',
    username: 'alice',
    displayName: 'Alice',
    role: 'student',
    messageType: 'text',
    content: 'Hello!',
    date: '2026-03-07',
    mentions: [],
    reactions: [],
    isPinned: false,
    createdAt: '2026-03-07T10:00:00Z',
    ...overrides,
  } as ChatMessage;
}

// ─── Reducers ────────────────────────────────────────────────────────────────

describe('chatSlice reducers', () => {
  describe('enterChat / leaveChat', () => {
    it('enterChat sets hasEnteredLobby', () => {
      const state = makeState();
      const next = reducer(state, enterChat());
      expect(next.hasEnteredLobby).toBe(true);
    });

    it('leaveChat resets room state', () => {
      const state = makeState({
        inRoom: true,
        hasEnteredLobby: true,
        messages: [makeMessage()],
        typingUsers: [{ userId: 'u1', username: 'alice', isTyping: true }],
        pinnedMessage: makeMessage(),
      });
      const next = reducer(state, leaveChat());
      expect(next.inRoom).toBe(false);
      expect(next.hasEnteredLobby).toBe(false);
      expect(next.messages).toEqual([]);
      expect(next.typingUsers).toEqual([]);
      expect(next.pinnedMessage).toBeNull();
    });
  });

  describe('setInRoom', () => {
    it('sets inRoom and cohortId', () => {
      const state = makeState();
      const next = reducer(state, setInRoom({ inRoom: true, cohortId: 'c1' }));
      expect(next.inRoom).toBe(true);
      expect(next.currentCohortId).toBe('c1');
    });

    it('resets unread count when entering room', () => {
      const state = makeState({ unreadCount: 5 });
      const next = reducer(state, setInRoom({ inRoom: true, cohortId: 'c1' }));
      expect(next.unreadCount).toBe(0);
    });
  });

  describe('addMessage', () => {
    it('appends message to array', () => {
      const state = makeState({ inRoom: true });
      const msg = makeMessage({ _id: 'msg2' });
      const next = reducer(state, addMessage(msg));
      expect(next.messages).toHaveLength(1);
      expect(next.messages[0]._id).toBe('msg2');
    });

    it('increments unreadCount when not in room', () => {
      const state = makeState({ inRoom: false, unreadCount: 3 });
      const next = reducer(state, addMessage(makeMessage()));
      expect(next.unreadCount).toBe(4);
    });

    it('does not increment unreadCount when in room', () => {
      const state = makeState({ inRoom: true, unreadCount: 0 });
      const next = reducer(state, addMessage(makeMessage()));
      expect(next.unreadCount).toBe(0);
    });
  });

  describe('setTypingUser', () => {
    it('adds typing user when isTyping is true', () => {
      const state = makeState();
      const next = reducer(state, setTypingUser({ userId: 'u1', username: 'alice', isTyping: true }));
      expect(next.typingUsers).toHaveLength(1);
    });

    it('does not add duplicate typing user', () => {
      const state = makeState({
        typingUsers: [{ userId: 'u1', username: 'alice', isTyping: true }],
      });
      const next = reducer(state, setTypingUser({ userId: 'u1', username: 'alice', isTyping: true }));
      expect(next.typingUsers).toHaveLength(1);
    });

    it('removes user when isTyping is false', () => {
      const state = makeState({
        typingUsers: [
          { userId: 'u1', username: 'alice', isTyping: true },
          { userId: 'u2', username: 'bob', isTyping: true },
        ],
      });
      const next = reducer(state, setTypingUser({ userId: 'u1', username: 'alice', isTyping: false }));
      expect(next.typingUsers).toHaveLength(1);
      expect(next.typingUsers[0].userId).toBe('u2');
    });
  });

  describe('updateReactions', () => {
    it('updates reactions on existing message', () => {
      const msg = makeMessage({ _id: 'msg1', reactions: [] });
      const state = makeState({ messages: [msg] });
      const next = reducer(state, updateReactions({
        messageId: 'msg1',
        reactions: [{ emoji: '👍', userIds: ['u1'] }],
      }));
      expect(next.messages[0].reactions).toHaveLength(1);
    });

    it('is a no-op for unknown messageId', () => {
      const state = makeState({ messages: [makeMessage()] });
      const next = reducer(state, updateReactions({
        messageId: 'unknown',
        reactions: [{ emoji: '👍', userIds: ['u1'] }],
      }));
      expect(next.messages[0].reactions).toEqual([]);
    });
  });

  describe('mentions', () => {
    it('addMention pushes to pending', () => {
      const state = makeState();
      const next = reducer(state, addMention({ from: 'bob', messageId: 'msg1', content: '@alice hi' }));
      expect(next.pendingMentions).toHaveLength(1);
    });

    it('clearMention removes by index', () => {
      const state = makeState({
        pendingMentions: [
          { from: 'bob', messageId: 'msg1', content: 'hi' },
          { from: 'carol', messageId: 'msg2', content: 'hey' },
        ],
      });
      const next = reducer(state, clearMention(0));
      expect(next.pendingMentions).toHaveLength(1);
      expect(next.pendingMentions[0].from).toBe('carol');
    });
  });

  describe('resetUnread', () => {
    it('resets unread count to 0', () => {
      const state = makeState({ unreadCount: 10 });
      const next = reducer(state, resetUnread());
      expect(next.unreadCount).toBe(0);
    });
  });
});

// ─── Thunk extra reducers ────────────────────────────────────────────────────

describe('chatSlice thunk handlers', () => {
  describe('fetchArchivedLogs', () => {
    it('sets loading on pending', () => {
      const state = makeState();
      const next = reducer(state, { type: fetchArchivedLogs.pending.type });
      expect(next.archivedLogsLoading).toBe(true);
    });

    it('populates logs on fulfilled', () => {
      const state = makeState({ archivedLogsLoading: true });
      const logs = [{ _id: 'log1', date: '2026-03-06' }];
      const next = reducer(state, {
        type: fetchArchivedLogs.fulfilled.type,
        payload: logs,
      });
      expect(next.archivedLogsLoading).toBe(false);
      expect(next.archivedLogs).toEqual(logs);
    });

    it('resets loading on rejected', () => {
      const state = makeState({ archivedLogsLoading: true });
      const next = reducer(state, { type: fetchArchivedLogs.rejected.type });
      expect(next.archivedLogsLoading).toBe(false);
    });
  });

  describe('fetchArchivedLog', () => {
    it('sets selected log on fulfilled', () => {
      const state = makeState({ selectedLogLoading: true });
      const log = { _id: 'log1', messages: [] };
      const next = reducer(state, {
        type: fetchArchivedLog.fulfilled.type,
        payload: log,
      });
      expect(next.selectedLogLoading).toBe(false);
      expect(next.selectedLog).toEqual(log);
    });
  });

  describe('deleteArchivedLog', () => {
    it('removes log from list', () => {
      const state = makeState({
        archivedLogs: [
          { _id: 'log1', date: '2026-03-06' },
          { _id: 'log2', date: '2026-03-05' },
        ],
      });
      const next = reducer(state, {
        type: deleteArchivedLog.fulfilled.type,
        payload: 'log1',
      });
      expect(next.archivedLogs).toHaveLength(1);
      expect(next.archivedLogs[0]._id).toBe('log2');
    });

    it('clears selectedLog if it was the deleted one', () => {
      const state = makeState({
        archivedLogs: [{ _id: 'log1' }],
        selectedLog: { _id: 'log1', messages: [] },
      });
      const next = reducer(state, {
        type: deleteArchivedLog.fulfilled.type,
        payload: 'log1',
      });
      expect(next.selectedLog).toBeNull();
    });
  });
});
