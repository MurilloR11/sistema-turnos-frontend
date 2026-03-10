/**
 * Configuración de URLs del Backend
 * 
 * Cambia entre backend local y producción según necesites
 */

// Backend Local (desarrollo)
export const LOCAL_BACKEND = 'http://localhost:3000';

// Backend en Producción (Cloudflare Workers)
export const PRODUCTION_BACKEND = 'https://sistema-turnos-backend.murillosantiago28.workers.dev';

// URL activa - cambia entre LOCAL_BACKEND y PRODUCTION_BACKEND
export const BACKEND_URL = PRODUCTION_BACKEND;

// Configuración de Socket.IO
export const SOCKET_CONFIG = {
  url: BACKEND_URL,
  options: {
    auth: {
      token: 'user_demo', // Cambiar por token real de autenticación
    },
    transports: ['websocket', 'polling'],
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionAttempts: 5,
  },
};

// Endpoints de la API
export const API_ENDPOINTS = {
  turnos: `${BACKEND_URL}/api/turnos`,
  health: `${BACKEND_URL}/api/health`,
};
