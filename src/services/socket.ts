import { io, Socket } from 'socket.io-client';
import { SOCKET_CONFIG } from '../config/backend';

interface ServerToClientEvents {
  connected: (data: { clientId: string; timestamp: string }) => void;
  'chat:message': (data: MessagePayload) => void;
  'chat:user_joined': (data: UserEvent) => void;
  'chat:user_left': (data: UserEvent) => void;
  'presence:user_online': (data: { userId: string; username: string; estado?: string }) => void;
  'presence:user_offline': (data: { userId: string; username: string }) => void;
  'presence:user_typing': (data: { userId: string; isTyping: boolean; room?: string }) => void;
  'turnos:created': (data: TurnoPayload) => void;
  'turnos:updated': (data: TurnoPayload) => void;
  'turnos:cancelled': (data: { turnoId: number; reason?: string }) => void;
  error: (data: ErrorPayload) => void;
}

interface ClientToServerEvents {
  'chat:message': (data: { message: string; room?: string }) => void;
  'chat:join_room': (data: { roomId: string }) => void;
  'chat:leave_room': (data: { roomId: string }) => void;
  'presence:online': (data?: { username: string; estado: string }) => void;
  'presence:offline': () => void;
  'presence:typing': (data: { isTyping: boolean; room?: string }) => void;
  'turnos:subscribe': (data: { doctorId?: string; date?: string }) => void;
  'turnos:unsubscribe': () => void;
}

export interface MessagePayload {
  id: string;
  userId: string;
  username: string;
  message: string;
  room?: string;
  timestamp: string;
}

export interface TurnoPayload {
  id: number;
  paciente: string;
  fecha: string;
  hora: string;
  doctor: string;
  especialidad: string;
  estado: 'confirmado' | 'pendiente' | 'cancelado';
  timestamp?: string;
}

export interface ErrorPayload {
  code: string;
  message: string;
  timestamp: string;
}

export interface UserEvent {
  userId: string;
  username: string;
  room: string;
}

// Crear conexión Socket.IO con tipo seguro
export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  SOCKET_CONFIG.url,
  SOCKET_CONFIG.options
);

// Event listeners de conexión
socket.on('connect', () => {
  console.log('✅ Connected to Socket.IO server:', socket.id);
});

socket.on('disconnect', (reason) => {
  console.log('❌ Disconnected:', reason);
});

socket.on('error', (error) => {
  console.error('Socket error:', error);
});

socket.on('connected', (data) => {
  console.log('🎉 Server confirmed connection:', data);
});

export default socket;
