import { describe, it, expect, vi, beforeEach } from 'vitest';

// ─── Mock Setup ──────────────────────────────────────────────────────────────

const mockChatMessageCreate = vi.fn();
const mockChatMessageFind = vi.fn();
const mockChatMessageFindOne = vi.fn();
const mockChatMessageFindById = vi.fn();
const mockChatMessageFindByIdAndUpdate = vi.fn();
const mockChatMessageUpdateMany = vi.fn();
const mockChatMessageDeleteMany = vi.fn();
const mockChatMessageAggregate = vi.fn();

vi.mock('../models/ChatMessage.js', () => ({
  ChatMessage: {
    create: (...args: unknown[]) => mockChatMessageCreate(...args),
    find: (...args: unknown[]) => mockChatMessageFind(...args),
    findOne: (...args: unknown[]) => mockChatMessageFindOne(...args),
    findById: (...args: unknown[]) => mockChatMessageFindById(...args),
    findByIdAndUpdate: (...args: unknown[]) => mockChatMessageFindByIdAndUpdate(...args),
    updateMany: (...args: unknown[]) => mockChatMessageUpdateMany(...args),
    deleteMany: (...args: unknown[]) => mockChatMessageDeleteMany(...args),
    aggregate: (...args: unknown[]) => mockChatMessageAggregate(...args),
  },
}));

const mockChatLogFind = vi.fn();
const mockChatLogFindOne = vi.fn();
const mockChatLogCreate = vi.fn();
const mockChatLogCountDocuments = vi.fn();
const mockChatLogFindById = vi.fn();
const mockChatLogFindByIdAndDelete = vi.fn();
const mockChatLogDeleteMany = vi.fn();

vi.mock('../models/ChatLog.js', () => ({
  ChatLog: {
    find: (...args: unknown[]) => mockChatLogFind(...args),
    findOne: (...args: unknown[]) => mockChatLogFindOne(...args),
    create: (...args: unknown[]) => mockChatLogCreate(...args),
    countDocuments: (...args: unknown[]) => mockChatLogCountDocuments(...args),
    findById: (...args: unknown[]) => mockChatLogFindById(...args),
    findByIdAndDelete: (...args: unknown[]) => mockChatLogFindByIdAndDelete(...args),
    deleteMany: (...args: unknown[]) => mockChatLogDeleteMany(...args),
  },
}));

vi.mock('../config.js', () => ({
  config: {
    timezone: 'America/Los_Angeles',
    jwt: { secret: 'test', expiresIn: '24h' },
  },
}));

vi.mock('../logger.js', () => ({
  logger: {
    info: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
  },
}));

import {
  getTodayDateString,
  saveMessage,
  getTodayMessages,
  getPinnedMessage,
  pinMessage,
  unpinMessages,
  toggleReaction,
  archivePreviousDayLogs,
  getArchivedLogs,
  getArchivedLog,
  deleteArchivedLog,
  deleteCohortChatData,
} from '../services/chatService.js';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function makeMessage(overrides: Record<string, unknown> = {}) {
  const base = {
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
    createdAt: new Date('2026-03-07T10:00:00Z'),
    ...overrides,
  };
  return {
    ...base,
    toJSON: () => base,
  };
}

// ─── Tests: getTodayDateString ───────────────────────────────────────────────

describe('getTodayDateString', () => {
  it('returns a date string in YYYY-MM-DD format', () => {
    const result = getTodayDateString();
    expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});

// ─── Tests: saveMessage ──────────────────────────────────────────────────────

describe('saveMessage', () => {
  beforeEach(() => vi.clearAllMocks());

  it('creates a message with correct fields and today date', async () => {
    const created = makeMessage();
    mockChatMessageCreate.mockResolvedValue(created);

    const result = await saveMessage({
      cohortId: 'c1',
      userId: 'u1',
      username: 'alice',
      displayName: 'Alice',
      role: 'student',
      messageType: 'text',
      content: 'Hello!',
    });

    expect(mockChatMessageCreate).toHaveBeenCalledOnce();
    const callArg = mockChatMessageCreate.mock.calls[0][0];
    expect(callArg.cohortId).toBe('c1');
    expect(callArg.content).toBe('Hello!');
    expect(callArg.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(callArg.reactions).toEqual([]);
    expect(callArg.isPinned).toBe(false);
    expect(result).toEqual(created.toJSON());
  });

  it('passes optional exerciseLink through', async () => {
    const created = makeMessage();
    mockChatMessageCreate.mockResolvedValue(created);

    await saveMessage({
      cohortId: 'c1',
      userId: 'u1',
      username: 'alice',
      displayName: 'Alice',
      role: 'student',
      messageType: 'exercise_link',
      content: 'Check this out',
      exerciseLink: { exerciseId: 'ex1', title: 'Test', tier: 1, type: 'js' },
    });

    const callArg = mockChatMessageCreate.mock.calls[0][0];
    expect(callArg.exerciseLink).toEqual({ exerciseId: 'ex1', title: 'Test', tier: 1, type: 'js' });
  });

  it('defaults mentions to empty array', async () => {
    const created = makeMessage();
    mockChatMessageCreate.mockResolvedValue(created);

    await saveMessage({
      cohortId: 'c1',
      userId: 'u1',
      username: 'alice',
      displayName: 'Alice',
      role: 'student',
      messageType: 'text',
      content: 'Hi',
    });

    const callArg = mockChatMessageCreate.mock.calls[0][0];
    expect(callArg.mentions).toEqual([]);
  });
});

// ─── Tests: getTodayMessages ─────────────────────────────────────────────────

describe('getTodayMessages', () => {
  beforeEach(() => vi.clearAllMocks());

  it('queries by cohortId and today date, returns sorted', async () => {
    const msgs = [makeMessage(), makeMessage({ _id: 'msg2' })];
    mockChatMessageFind.mockReturnValue({
      sort: () => msgs,
    });

    const result = await getTodayMessages('c1');
    expect(result).toHaveLength(2);
    expect(mockChatMessageFind).toHaveBeenCalledWith(
      expect.objectContaining({ cohortId: 'c1' }),
    );
  });
});

// ─── Tests: pinMessage ───────────────────────────────────────────────────────

describe('pinMessage', () => {
  beforeEach(() => vi.clearAllMocks());

  it('unpins existing messages then pins new one', async () => {
    mockChatMessageUpdateMany.mockResolvedValue({});
    const pinned = makeMessage({ isPinned: true });
    mockChatMessageFindByIdAndUpdate.mockResolvedValue(pinned);

    const result = await pinMessage('c1', 'msg1');

    expect(mockChatMessageUpdateMany).toHaveBeenCalledOnce();
    expect(mockChatMessageFindByIdAndUpdate).toHaveBeenCalledWith(
      'msg1',
      { isPinned: true },
      { new: true },
    );
    expect(result).toBeTruthy();
  });

  it('returns null if message not found', async () => {
    mockChatMessageUpdateMany.mockResolvedValue({});
    mockChatMessageFindByIdAndUpdate.mockResolvedValue(null);

    const result = await pinMessage('c1', 'missing');
    expect(result).toBeNull();
  });
});

// ─── Tests: unpinMessages ────────────────────────────────────────────────────

describe('unpinMessages', () => {
  beforeEach(() => vi.clearAllMocks());

  it('updates all pinned messages for cohort and date', async () => {
    mockChatMessageUpdateMany.mockResolvedValue({});
    await unpinMessages('c1');
    expect(mockChatMessageUpdateMany).toHaveBeenCalledOnce();
  });
});

// ─── Tests: toggleReaction ───────────────────────────────────────────────────

describe('toggleReaction', () => {
  beforeEach(() => vi.clearAllMocks());

  it('returns null when message not found', async () => {
    mockChatMessageFindById.mockResolvedValue(null);
    const result = await toggleReaction('missing', 'u1', '👍');
    expect(result).toBeNull();
  });

  it('adds a new reaction emoji', async () => {
    const msg = {
      reactions: [] as Array<{ emoji: string; userIds: string[] }>,
      save: vi.fn().mockResolvedValue(undefined),
      toJSON: vi.fn().mockReturnValue({ reactions: [{ emoji: '👍', userIds: ['u1'] }] }),
    };
    mockChatMessageFindById.mockResolvedValue(msg);

    const result = await toggleReaction('msg1', 'u1', '👍');

    expect(msg.reactions).toHaveLength(1);
    expect(msg.reactions[0].emoji).toBe('👍');
    expect(msg.save).toHaveBeenCalledOnce();
    expect(result).toBeTruthy();
  });

  it('adds user to existing reaction emoji', async () => {
    const msg = {
      reactions: [{ emoji: '👍', userIds: ['u1'] }],
      save: vi.fn().mockResolvedValue(undefined),
      toJSON: vi.fn().mockReturnValue({ reactions: [{ emoji: '👍', userIds: ['u1', 'u2'] }] }),
    };
    mockChatMessageFindById.mockResolvedValue(msg);

    await toggleReaction('msg1', 'u2', '👍');

    expect(msg.reactions[0].userIds).toContain('u2');
    expect(msg.save).toHaveBeenCalledOnce();
  });

  it('removes user from existing reaction when toggled again', async () => {
    const msg = {
      reactions: [{ emoji: '👍', userIds: [{ toString: () => 'u1' }, { toString: () => 'u2' }] }] as Array<{
        emoji: string;
        userIds: Array<string | { toString: () => string }>;
      }>,
      save: vi.fn().mockResolvedValue(undefined),
      toJSON: vi.fn().mockReturnValue({ reactions: [{ emoji: '👍', userIds: ['u2'] }] }),
    };
    // findById resolves the mock with a userIds array matching String(id) === userId
    // The service does: existing.userIds.findIndex((id) => String(id) === userId)
    mockChatMessageFindById.mockResolvedValue(msg);

    await toggleReaction('msg1', 'u1', '👍');

    // u1 should be spliced out
    expect(msg.reactions[0].userIds).toHaveLength(1);
    expect(msg.save).toHaveBeenCalledOnce();
  });

  it('removes the emoji entry entirely when last user toggles off', async () => {
    const msg = {
      reactions: [{ emoji: '👍', userIds: [{ toString: () => 'u1' }] }] as Array<{
        emoji: string;
        userIds: Array<string | { toString: () => string }>;
      }>,
      save: vi.fn().mockResolvedValue(undefined),
      toJSON: vi.fn().mockReturnValue({ reactions: [] }),
    };
    mockChatMessageFindById.mockResolvedValue(msg);

    await toggleReaction('msg1', 'u1', '👍');

    // After splice, length is 0 so the filter removes the emoji entry
    expect(msg.reactions).toHaveLength(0);
    expect(msg.save).toHaveBeenCalledOnce();
  });
});

// ─── Tests: archivePreviousDayLogs ───────────────────────────────────────────

describe('archivePreviousDayLogs', () => {
  beforeEach(() => vi.clearAllMocks());

  it('skips when no previous-day messages exist', async () => {
    mockChatMessageAggregate.mockResolvedValue([]);
    await archivePreviousDayLogs();
    expect(mockChatLogCreate).not.toHaveBeenCalled();
  });

  it('archives messages from previous days and deletes originals', async () => {
    mockChatMessageAggregate.mockResolvedValue([
      { _id: { cohortId: 'c1', date: '2026-03-06' } },
    ]);
    mockChatLogFindOne.mockResolvedValue(null); // not already archived
    const messages = [
      makeMessage({ _id: 'msg1', userId: 'u1', date: '2026-03-06' }),
      makeMessage({ _id: 'msg2', userId: 'u2', date: '2026-03-06' }),
    ];
    mockChatMessageFind.mockReturnValue({
      sort: () => messages,
    });
    mockChatLogCreate.mockResolvedValue({});
    mockChatMessageDeleteMany.mockResolvedValue({});

    await archivePreviousDayLogs();

    expect(mockChatLogCreate).toHaveBeenCalledOnce();
    const createArg = mockChatLogCreate.mock.calls[0][0];
    expect(createArg.cohortId).toBe('c1');
    expect(createArg.date).toBe('2026-03-06');
    expect(createArg.messageCount).toBe(2);
    expect(mockChatMessageDeleteMany).toHaveBeenCalledWith({ cohortId: 'c1', date: '2026-03-06' });
  });

  it('skips already-archived day-cohort combos', async () => {
    mockChatMessageAggregate.mockResolvedValue([
      { _id: { cohortId: 'c1', date: '2026-03-06' } },
    ]);
    mockChatLogFindOne.mockResolvedValue({ _id: 'existing' }); // already archived

    await archivePreviousDayLogs();

    expect(mockChatLogCreate).not.toHaveBeenCalled();
  });
});

// ─── Tests: getArchivedLogs ──────────────────────────────────────────────────

describe('getArchivedLogs', () => {
  beforeEach(() => vi.clearAllMocks());

  it('returns paginated results when pagination provided', async () => {
    const logs = [{ _id: 'log1', date: '2026-03-06', toJSON: () => ({ _id: 'log1', date: '2026-03-06' }) }];
    mockChatLogFind.mockReturnValue({
      sort: () => ({
        select: () => ({
          skip: () => ({
            limit: () => logs,
          }),
        }),
      }),
    });
    mockChatLogCountDocuments.mockResolvedValue(15);

    const result = await getArchivedLogs('c1', { page: 1, pageSize: 10 });

    expect(result).toHaveProperty('items');
    expect(result).toHaveProperty('totalPages', 2);
    expect(result).toHaveProperty('totalItems', 15);
  });

  it('returns flat array when no pagination', async () => {
    const logs = [
      { _id: 'log1', toJSON: () => ({ _id: 'log1' }) },
      { _id: 'log2', toJSON: () => ({ _id: 'log2' }) },
    ];
    mockChatLogFind.mockReturnValue({
      sort: () => ({ select: () => logs }),
    });

    const result = await getArchivedLogs('c1');

    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(2);
  });
});

// ─── Tests: getArchivedLog ───────────────────────────────────────────────────

describe('getArchivedLog', () => {
  beforeEach(() => vi.clearAllMocks());

  it('returns log JSON when found', async () => {
    const log = { _id: 'log1', toJSON: () => ({ _id: 'log1', date: '2026-03-06' }) };
    mockChatLogFindById.mockResolvedValue(log);

    const result = await getArchivedLog('log1');
    expect(result).toEqual({ _id: 'log1', date: '2026-03-06' });
  });

  it('returns null when not found', async () => {
    mockChatLogFindById.mockResolvedValue(null);
    const result = await getArchivedLog('missing');
    expect(result).toBeNull();
  });
});

// ─── Tests: deleteArchivedLog ────────────────────────────────────────────────

describe('deleteArchivedLog', () => {
  beforeEach(() => vi.clearAllMocks());

  it('calls findByIdAndDelete', async () => {
    mockChatLogFindByIdAndDelete.mockResolvedValue({ _id: 'log1' });
    await deleteArchivedLog('log1');
    expect(mockChatLogFindByIdAndDelete).toHaveBeenCalledWith('log1');
  });
});

// ─── Tests: deleteCohortChatData ─────────────────────────────────────────────

describe('deleteCohortChatData', () => {
  beforeEach(() => vi.clearAllMocks());

  it('deletes both messages and logs for cohort', async () => {
    mockChatMessageDeleteMany.mockResolvedValue({});
    mockChatLogDeleteMany.mockResolvedValue({});

    await deleteCohortChatData('c1');

    expect(mockChatMessageDeleteMany).toHaveBeenCalledWith({ cohortId: 'c1' });
    expect(mockChatLogDeleteMany).toHaveBeenCalledWith({ cohortId: 'c1' });
  });
});
