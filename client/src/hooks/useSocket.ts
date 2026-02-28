import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../features/store';
import { showToast } from '../features/uiSlice';
import { connectSocket, disconnectSocket } from '../utils/socket';
import {
  setMessages,
  addMessage,
  setActiveUsers,
  setTypingUser,
  setPinnedMessage,
  updateReactions,
  addMention,
} from '../features/chatSlice';

export function useSocket() {
  const token = useAppSelector((s) => s.auth.token);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!token) {
      disconnectSocket();
      return;
    }

    const socket = connectSocket();

    function onHistory(messages: Parameters<typeof setMessages>[0]) {
      dispatch(setMessages(messages));
    }
    function onMessage(message: Parameters<typeof addMessage>[0]) {
      dispatch(addMessage(message));
    }
    function onActiveUsers(users: Parameters<typeof setActiveUsers>[0]) {
      dispatch(setActiveUsers(users));
    }
    function onTyping(data: Parameters<typeof setTypingUser>[0]) {
      dispatch(setTypingUser(data));
    }
    function onPinned(message: Parameters<typeof setPinnedMessage>[0]) {
      dispatch(setPinnedMessage(message));
    }
    function onReaction(data: Parameters<typeof updateReactions>[0]) {
      dispatch(updateReactions(data));
    }
    function onMention(data: Parameters<typeof addMention>[0]) {
      dispatch(addMention(data));
      dispatch(
        showToast({
          message: `${data.from} mentioned you: "${data.content}"`,
          type: 'success',
        }),
      );
    }
    function onError(error: string) {
      console.error('[Socket] chat:error:', error);
      dispatch(showToast({ message: error, type: 'error' }));
    }

    socket.on('chat:history', onHistory);
    socket.on('chat:message', onMessage);
    socket.on('chat:active-users', onActiveUsers);
    socket.on('chat:typing', onTyping);
    socket.on('chat:pinned', onPinned);
    socket.on('chat:reaction', onReaction);
    socket.on('chat:mention', onMention);
    socket.on('chat:error', onError);

    return () => {
      socket.off('chat:history', onHistory);
      socket.off('chat:message', onMessage);
      socket.off('chat:active-users', onActiveUsers);
      socket.off('chat:typing', onTyping);
      socket.off('chat:pinned', onPinned);
      socket.off('chat:reaction', onReaction);
      socket.off('chat:mention', onMention);
      socket.off('chat:error', onError);
    };
  }, [token, dispatch]);
}
