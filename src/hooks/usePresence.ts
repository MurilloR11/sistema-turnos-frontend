import { useEffect, useState } from 'react';
import socket from '../services/socket';

interface User {
  userId: string;
  username: string;
}

export function usePresence() {
  const [onlineUsers, setOnlineUsers] = useState<User[]>([]);
  const [typingUsers, setTypingUsers] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Marcar como online al conectar
    socket.emit('presence:online');

    // Escuchar usuarios online
    socket.on('presence:user_online', (data) => {
      setOnlineUsers((prev) => {
        if (prev.some(u => u.userId === data.userId)) return prev;
        return [...prev, data];
      });
    });

    // Escuchar usuarios offline
    socket.on('presence:user_offline', (data) => {
      setOnlineUsers((prev) => prev.filter(u => u.userId !== data.userId));
    });

    // Escuchar indicadores de escritura
    socket.on('presence:user_typing', (data) => {
      setTypingUsers((prev) => {
        const newSet = new Set(prev);
        if (data.isTyping) {
          newSet.add(data.userId);
        } else {
          newSet.delete(data.userId);
        }
        return newSet;
      });
    });

    // Marcar como offline al desmontar
    return () => {
      socket.emit('presence:offline');
      socket.off('presence:user_online');
      socket.off('presence:user_offline');
      socket.off('presence:user_typing');
    };
  }, []);

  const setTyping = (isTyping: boolean, room?: string) => {
    socket.emit('presence:typing', { isTyping, room });
  };

  return {
    onlineUsers,
    onlineCount: onlineUsers.length,
    typingUsers: Array.from(typingUsers),
    setTyping,
  };
}
