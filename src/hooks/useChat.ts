import { useEffect, useState } from 'react';
import socket, { type MessagePayload } from '../services/socket';

interface Message {
  id: string;
  userId: string;
  username: string;
  message: string;
  timestamp: string;
}

export function useChat(roomId?: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Escuchar estado de conexión
    setIsConnected(socket.connected);

    socket.on('connect', () => setIsConnected(true));
    socket.on('disconnect', () => setIsConnected(false));

    // Unirse a una sala si se proporciona roomId
    if (roomId) {
      socket.emit('chat:join_room', { roomId });
      console.log(`Joined room: ${roomId}`);
    }

    // Escuchar mensajes nuevos
    socket.on('chat:message', (data: MessagePayload) => {
      setMessages((prev) => [...prev, data]);
    });

    // Escuchar usuarios que se unen
    socket.on('chat:user_joined', (data) => {
      console.log(`${data.username} joined ${data.room}`);
    });

    // Escuchar usuarios que se van
    socket.on('chat:user_left', (data) => {
      console.log(`${data.username} left ${data.room}`);
    });

    // Cleanup
    return () => {
      if (roomId) {
        socket.emit('chat:leave_room', { roomId });
      }
      socket.off('chat:message');
      socket.off('chat:user_joined');
      socket.off('chat:user_left');
      socket.off('connect');
      socket.off('disconnect');
    };
  }, [roomId]);

  const sendMessage = (message: string) => {
    if (!message.trim()) return;
    
    socket.emit('chat:message', { 
      message: message.trim(), 
      room: roomId 
    });
  };

  return { messages, sendMessage, isConnected };
}
