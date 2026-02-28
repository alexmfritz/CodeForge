import type { Server, Socket } from 'socket.io';
import type {
  ServerToClientEvents,
  ClientToServerEvents,
  ChatActiveUser,
  ChatMessage,
  ChatReaction,
} from '@codeforge/shared';
import { sendChatMessageSchema } from '@codeforge/shared/validation';
import { User } from '../models/User.js';
import {
  saveMessage,
  getTodayMessages,
  getPinnedMessage,
  pinMessage,
  unpinMessages,
  toggleReaction,
} from '../services/chatService.js';

type TypedIO = Server<ClientToServerEvents, ServerToClientEvents>;
type TypedSocket = Socket<ClientToServerEvents, ServerToClientEvents>;

// In-memory presence: roomKey → Map<socketId, ChatActiveUser>
const activeRooms = new Map<string, Map<string, ChatActiveUser>>();

// Map socketId → userId for mention lookups (fetchSockets doesn't expose custom props)
const socketUserMap = new Map<string, string>();

function getRoomKey(cohortId: string): string {
  return `chat:${cohortId}`;
}

function getActiveUsersForRoom(roomKey: string): ChatActiveUser[] {
  const room = activeRooms.get(roomKey);
  if (!room) return [];
  const byUser = new Map<string, ChatActiveUser>();
  for (const user of room.values()) {
    byUser.set(user.userId, user);
  }
  return Array.from(byUser.values());
}

export function registerChatHandlers(io: TypedIO, socket: TypedSocket): void {
  let currentRoom: string | null = null;
  let currentCohortId: string | null = null;

  socketUserMap.set(socket.id, socket.user.userId);

  socket.on('chat:join', async (data) => {
    try {
      const { cohortId } = data;
      const roomKey = getRoomKey(cohortId);

      // Leave previous room if any
      if (currentRoom) {
        socket.leave(currentRoom);
        const roomUsers = activeRooms.get(currentRoom);
        if (roomUsers) {
          roomUsers.delete(socket.id);
          io.to(currentRoom).emit('chat:active-users', getActiveUsersForRoom(currentRoom));
        }
      }

      const user = await User.findById(socket.user.userId).lean();
      if (!user) {
        socket.emit('chat:error', 'User not found');
        return;
      }

      // Students can only join their own cohort
      if (socket.user.role === 'student' && String(user.cohortId) !== cohortId) {
        socket.emit('chat:error', 'Not authorized for this cohort');
        return;
      }

      currentRoom = roomKey;
      currentCohortId = cohortId;
      socket.join(roomKey);

      // Track active user
      if (!activeRooms.has(roomKey)) {
        activeRooms.set(roomKey, new Map());
      }
      const activeUser: ChatActiveUser = {
        userId: String(user._id),
        username: user.username,
        displayName: user.displayName,
        role: user.role,
      };
      activeRooms.get(roomKey)!.set(socket.id, activeUser);

      // Send history + pinned + active users to joining user
      const history = await getTodayMessages(cohortId);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      socket.emit('chat:history', history as any);

      const pinned = await getPinnedMessage(cohortId);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      socket.emit('chat:pinned', pinned as any);

      const activeUsers = getActiveUsersForRoom(roomKey);
      io.to(roomKey).emit('chat:active-users', activeUsers);
      io.to(roomKey).emit('chat:user-joined', activeUser);
    } catch (err) {
      console.error('[Chat] Error joining room:', err);
      socket.emit('chat:error', 'Failed to join room');
    }
  });

  socket.on('chat:leave', () => {
    handleLeave();
  });

  socket.on('disconnect', () => {
    handleLeave();
    socketUserMap.delete(socket.id);
  });

  function handleLeave() {
    if (!currentRoom) return;
    socket.leave(currentRoom);

    const roomUsers = activeRooms.get(currentRoom);
    if (roomUsers) {
      const leavingUser = roomUsers.get(socket.id);
      roomUsers.delete(socket.id);

      const activeUsers = getActiveUsersForRoom(currentRoom);
      io.to(currentRoom).emit('chat:active-users', activeUsers);

      if (leavingUser) {
        io.to(currentRoom).emit('chat:user-left', leavingUser);
      }
    }

    currentRoom = null;
    currentCohortId = null;
  }

  socket.on('chat:send-message', async (data) => {
    if (!currentRoom || !currentCohortId) {
      socket.emit('chat:error', 'Not in a chat room');
      return;
    }

    const validation = sendChatMessageSchema.safeParse(data);
    if (!validation.success) {
      socket.emit('chat:error', 'Invalid message format');
      return;
    }

    try {
      const user = await User.findById(socket.user.userId).lean();
      if (!user) return;

      const message = await saveMessage({
        cohortId: currentCohortId,
        userId: String(user._id),
        username: user.username,
        displayName: user.displayName,
        role: user.role,
        messageType: data.messageType,
        content: data.content,
        exerciseLink: data.exerciseLink,
        codeSnippet: data.codeSnippet,
        mentions: data.mentions,
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      io.to(currentRoom).emit('chat:message', message as any);

      // Send @mention notifications via in-memory lookup
      if (data.mentions && data.mentions.length > 0) {
        const roomSockets = await io.in(currentRoom).fetchSockets();
        for (const s of roomSockets) {
          if (s.id === socket.id) continue;
          const uid = socketUserMap.get(s.id);
          if (!uid) continue;
          const mentioned = await User.findById(uid).lean();
          if (mentioned && data.mentions.includes(mentioned.username)) {
            s.emit('chat:mention', {
              from: user.displayName,
              messageId: String(message._id),
              content: data.content.substring(0, 100),
            });
          }
        }
      }
    } catch (err) {
      console.error('[Chat] Error saving message:', err);
      socket.emit('chat:error', 'Failed to send message');
    }
  });

  socket.on('chat:typing', (isTyping) => {
    if (!currentRoom) return;
    socket.to(currentRoom).emit('chat:typing', {
      userId: socket.user.userId,
      username: '',
      isTyping,
    });
  });

  socket.on('chat:pin', async (messageId) => {
    try {
      if (!currentRoom || !currentCohortId) return;
      if (socket.user.role === 'student') {
        socket.emit('chat:error', 'Only instructors and TAs can pin messages');
        return;
      }
      const pinned = await pinMessage(currentCohortId, messageId);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      io.to(currentRoom).emit('chat:pinned', pinned as any);
    } catch (err) {
      console.error('[Chat] Error pinning message:', err);
      socket.emit('chat:error', 'Failed to pin message');
    }
  });

  socket.on('chat:unpin', async () => {
    try {
      if (!currentRoom || !currentCohortId) return;
      if (socket.user.role === 'student') {
        socket.emit('chat:error', 'Only instructors and TAs can unpin messages');
        return;
      }
      await unpinMessages(currentCohortId);
      io.to(currentRoom).emit('chat:pinned', null);
    } catch (err) {
      console.error('[Chat] Error unpinning message:', err);
      socket.emit('chat:error', 'Failed to unpin message');
    }
  });

  socket.on('chat:react', async (data) => {
    try {
      if (!currentRoom) return;
      const updated = await toggleReaction(data.messageId, socket.user.userId, data.emoji);
      if (updated) {
        io.to(currentRoom).emit('chat:reaction', {
          messageId: data.messageId,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          reactions: updated.reactions as any,
        });
      }
    } catch (err) {
      console.error('[Chat] Error toggling reaction:', err);
      socket.emit('chat:error', 'Failed to toggle reaction');
    }
  });

  socket.on('chat:get-active-users', (cohortId) => {
    const roomKey = getRoomKey(cohortId);
    const users = getActiveUsersForRoom(roomKey);
    socket.emit('chat:active-users', users);
  });
}
