import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { ChatMessage, ChatActiveUser, ChatReaction, ChatLog } from '@codeforge/shared';
import { apiFetch } from '../utils/api';

interface TypingUser {
  userId: string;
  username: string;
  isTyping: boolean;
}

interface MentionNotification {
  from: string;
  messageId: string;
  content: string;
}

interface ChatState {
  inRoom: boolean;
  currentCohortId: string | null;
  hasEnteredLobby: boolean;
  messages: ChatMessage[];
  pinnedMessage: ChatMessage | null;
  activeUsers: ChatActiveUser[];
  typingUsers: TypingUser[];
  unreadCount: number;
  pendingMentions: MentionNotification[];
  archivedLogs: Omit<ChatLog, 'messages'>[];
  archivedLogsLoading: boolean;
  selectedLog: ChatLog | null;
  selectedLogLoading: boolean;
}

const initialState: ChatState = {
  inRoom: false,
  currentCohortId: null,
  hasEnteredLobby: false,
  messages: [],
  pinnedMessage: null,
  activeUsers: [],
  typingUsers: [],
  unreadCount: 0,
  pendingMentions: [],
  archivedLogs: [],
  archivedLogsLoading: false,
  selectedLog: null,
  selectedLogLoading: false,
};

export const fetchArchivedLogs = createAsyncThunk(
  'chat/fetchArchivedLogs',
  async (cohortId: string, { rejectWithValue }) => {
    const result = await apiFetch<Omit<ChatLog, 'messages'>[]>(`/api/chat/logs/${cohortId}`);
    if (!result.success || !result.data) {
      return rejectWithValue(result.error || 'Failed to fetch logs');
    }
    return result.data;
  },
);

export const fetchArchivedLog = createAsyncThunk(
  'chat/fetchArchivedLog',
  async (logId: string, { rejectWithValue }) => {
    const result = await apiFetch<ChatLog>(`/api/chat/logs/detail/${logId}`);
    if (!result.success || !result.data) {
      return rejectWithValue(result.error || 'Failed to fetch log');
    }
    return result.data;
  },
);

export const deleteArchivedLog = createAsyncThunk(
  'chat/deleteArchivedLog',
  async (logId: string, { rejectWithValue }) => {
    const result = await apiFetch<{ deleted: boolean }>(`/api/chat/logs/${logId}`, {
      method: 'DELETE',
    });
    if (!result.success) {
      return rejectWithValue(result.error || 'Failed to delete log');
    }
    return logId;
  },
);

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    enterChat(state) {
      state.hasEnteredLobby = true;
    },
    leaveChat(state) {
      state.inRoom = false;
      state.hasEnteredLobby = false;
      state.messages = [];
      state.typingUsers = [];
      state.pinnedMessage = null;
    },
    setInRoom(state, action: PayloadAction<{ inRoom: boolean; cohortId: string | null }>) {
      state.inRoom = action.payload.inRoom;
      state.currentCohortId = action.payload.cohortId;
      if (action.payload.inRoom) {
        state.unreadCount = 0;
      }
    },
    setMessages(state, action: PayloadAction<ChatMessage[]>) {
      state.messages = action.payload;
    },
    addMessage(state, action: PayloadAction<ChatMessage>) {
      state.messages.push(action.payload);
      if (!state.inRoom) {
        state.unreadCount += 1;
      }
    },
    setActiveUsers(state, action: PayloadAction<ChatActiveUser[]>) {
      state.activeUsers = action.payload;
    },
    setTypingUser(state, action: PayloadAction<TypingUser>) {
      const { userId, isTyping } = action.payload;
      if (isTyping) {
        if (!state.typingUsers.find((t) => t.userId === userId)) {
          state.typingUsers.push(action.payload);
        }
      } else {
        state.typingUsers = state.typingUsers.filter((t) => t.userId !== userId);
      }
    },
    setPinnedMessage(state, action: PayloadAction<ChatMessage | null>) {
      state.pinnedMessage = action.payload;
    },
    updateReactions(state, action: PayloadAction<{ messageId: string; reactions: ChatReaction[] }>) {
      const msg = state.messages.find((m) => m._id === action.payload.messageId);
      if (msg) {
        msg.reactions = action.payload.reactions;
      }
    },
    addMention(state, action: PayloadAction<MentionNotification>) {
      state.pendingMentions.push(action.payload);
    },
    clearMention(state, action: PayloadAction<number>) {
      state.pendingMentions.splice(action.payload, 1);
    },
    resetUnread(state) {
      state.unreadCount = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArchivedLogs.pending, (state) => {
        state.archivedLogsLoading = true;
      })
      .addCase(fetchArchivedLogs.fulfilled, (state, action) => {
        state.archivedLogsLoading = false;
        state.archivedLogs = action.payload;
      })
      .addCase(fetchArchivedLogs.rejected, (state) => {
        state.archivedLogsLoading = false;
      })
      .addCase(fetchArchivedLog.pending, (state) => {
        state.selectedLogLoading = true;
      })
      .addCase(fetchArchivedLog.fulfilled, (state, action) => {
        state.selectedLogLoading = false;
        state.selectedLog = action.payload;
      })
      .addCase(fetchArchivedLog.rejected, (state) => {
        state.selectedLogLoading = false;
      })
      .addCase(deleteArchivedLog.fulfilled, (state, action) => {
        state.archivedLogs = state.archivedLogs.filter((l) => l._id !== action.payload);
        if (state.selectedLog?._id === action.payload) {
          state.selectedLog = null;
        }
      });
  },
});

export const {
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
} = chatSlice.actions;

export default chatSlice.reducer;
