import { Server as SocketIOServer } from 'socket.io';
import type { Server as HttpServer } from 'http';
import type { Express } from 'express';
import jwt from 'jsonwebtoken';
import { config } from './config.js';
import { logger } from './logger.js';
import { registerChatHandlers } from './socket/chatHandlers.js';
import type { JwtPayload, ServerToClientEvents, ClientToServerEvents } from '@codeforge/shared';

declare module 'socket.io' {
  interface Socket {
    user: JwtPayload;
  }
}

export function initSocketIO(
  httpServer: HttpServer,
  expressApp?: Express,
): SocketIOServer<ClientToServerEvents, ServerToClientEvents> {
  const io = new SocketIOServer<ClientToServerEvents, ServerToClientEvents>(httpServer, {
    cors: {
      origin: config.isDev ? ['http://localhost:5173'] : false,
      credentials: true,
    },
    path: '/socket.io',
  });

  io.use((socket, next) => {
    const token = socket.handshake.auth.token as string | undefined;
    if (!token) {
      return next(new Error('Authentication required'));
    }
    try {
      const payload = jwt.verify(token, config.jwt.secret) as JwtPayload;
      socket.user = payload;
      next();
    } catch {
      next(new Error('Invalid or expired token'));
    }
  });

  const updateCount = () => {
    if (expressApp) expressApp.set('socketConnectionCount', io.engine.clientsCount);
  };

  io.on('connection', (socket) => {
    logger.debug({ userId: socket.user.userId, role: socket.user.role }, 'Socket connected');
    updateCount();
    registerChatHandlers(io, socket);

    socket.on('disconnect', () => {
      logger.debug({ userId: socket.user.userId }, 'Socket disconnected');
      updateCount();
    });
  });

  return io;
}
