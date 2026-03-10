import { useEffect, useState } from 'react';
import socket from '../services/socket';
import { API_ENDPOINTS } from '../config/backend';

interface Turno {
  id: number;
  paciente: string;
  fecha: string;
  hora: string;
  doctor: string;
  especialidad: string;
  estado: 'confirmado' | 'pendiente' | 'cancelado';
}

export function useTurnos(doctorId?: string, date?: string) {
  const [turnos, setTurnos] = useState<Turno[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cargar turnos iniciales vía HTTP
    fetchTurnos();

    // Suscribirse a actualizaciones en tiempo real
    socket.emit('turnos:subscribe', { doctorId, date });

    // Escuchar nuevo turno
    socket.on('turnos:created', (turno) => {
      setTurnos((prev) => [...prev, turno]);
      // Notificación opcional
      showNotification(`Nuevo turno: ${turno.paciente}`);
    });

    // Escuchar actualización de turno
    socket.on('turnos:updated', (turno) => {
      setTurnos((prev) =>
        prev.map((t) => (t.id === turno.id ? turno : t))
      );
      showNotification(`Turno actualizado: ${turno.paciente}`);
    });

    // Escuchar cancelación de turno
    socket.on('turnos:cancelled', ({ turnoId, reason }) => {
      setTurnos((prev) =>
        prev.map((t) =>
          t.id === turnoId ? { ...t, estado: 'cancelado' as const } : t
        )
      );
      showNotification(`Turno cancelado: ${reason || 'Sin razón'}`);
    });

    return () => {
      socket.emit('turnos:unsubscribe');
      socket.off('turnos:created');
      socket.off('turnos:updated');
      socket.off('turnos:cancelled');
    };
  }, [doctorId, date]);

  const fetchTurnos = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_ENDPOINTS.turnos);
      const data = await response.json();
      setTurnos(data.turnos || []);
    } catch (error) {
      console.error('Error fetching turnos:', error);
    } finally {
      setLoading(false);
    }
  };

  const createTurno = async (turnoData: Omit<Turno, 'id'>) => {
    try {
      const response = await fetch(API_ENDPOINTS.turnos, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(turnoData),
      });
      return await response.json();
      // No necesitas actualizar el estado, Socket.IO lo hará automáticamente
    } catch (error) {
      console.error('Error creating turno:', error);
      throw error;
    }
  };

  const updateTurno = async (id: number, updates: Partial<Turno>) => {
    try {
      const response = await fetch(`${API_ENDPOINTS.turnos}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      return await response.json();
      // Socket.IO actualizará el estado automáticamente
    } catch (error) {
      console.error('Error updating turno:', error);
      throw error;
    }
  };

  const cancelTurno = async (id: number) => {
    try {
      const response = await fetch(`${API_ENDPOINTS.turnos}/${id}`, {
        method: 'DELETE',
      });
      return await response.json();
      // Socket.IO actualizará el estado automáticamente
    } catch (error) {
      console.error('Error cancelling turno:', error);
      throw error;
    }
  };

  return {
    turnos,
    loading,
    createTurno,
    updateTurno,
    cancelTurno,
    refetch: fetchTurnos,
  };
}

function showNotification(message: string) {
  // Implementar con tu sistema de notificaciones preferido
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification('Sistema de Turnos', { body: message });
  }
}
