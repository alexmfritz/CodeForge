import { io, Socket } from 'socket.io-client';
import type { ServerToClientEvents, ClientToServerEvents } from '@codeforge/shared';
import { getToken } from './api';

type TypedSocket = Socket<ServerToClientEvents, ClientToServerEvents>;

let socket: TypedSocket | null = null;

export function getSocket(): TypedSocket | null {
  return socket;
}

export function connectSocket(): TypedSocket {
  // Return existing socket if it's not fully disconnected
  if (socket && !socket.disconnected) return socket;

  // Clean up stale socket reference
  if (socket) {
    socket.removeAllListeners();
    socket.disconnect();
    socket = null;
  }

  const token = getToken();
  if (!token) throw new Error('No auth token available');

  const url = import.meta.env.DEV
    ? `http://localhost:${import.meta.env.VITE_API_PORT || 3001}`
    : window.location.origin;

  socket = io(url, {
    auth: { token },
    transports: ['websocket', 'polling'],
    reconnection: true,
    reconnectionAttempts: 10,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
  }) as TypedSocket;

  return socket;
}

export function disconnectSocket(): void {
  if (socket) {
    socket.removeAllListeners();
    socket.disconnect();
    socket = null;
  }
}
