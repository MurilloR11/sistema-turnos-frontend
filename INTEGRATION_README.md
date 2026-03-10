# Sistema de Turnos - Frontend con Socket.IO

Frontend React + TypeScript + Vite integrado con Socket.IO para gestión de turnos médicos en tiempo real.

## 🚀 Características

- ✅ **Actualización en tiempo real** de turnos con Socket.IO
- 💬 **Chat en tiempo real** con salas múltiples (General, Urgencias, Consultas)
- 👥 **Indicadores de presencia** - usuarios online/offline
- 📋 **Gestión de turnos** - confirmar, actualizar y cancelar
- 🎨 **UI moderna y responsive** con animaciones

## 📦 Instalación

```bash
npm install
```

## 🔧 Configuración

### 1. Backend Local

Asegúrate de que el backend esté corriendo en `http://localhost:3000`:

```bash
cd sistema-turnos-backend
npm run dev
```

### 2. Actualizar URL del Socket

Si tu backend está en una URL diferente, actualiza `src/services/socket.ts`:

```typescript
const SOCKET_URL = 'http://localhost:3000'; // Cambiar según sea necesario
```

## 🎯 Uso

### Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Build de Producción

```bash
npm run build
```

### Vista Previa

```bash
npm run preview
```

## 📁 Estructura del Proyecto

```
src/
├── services/
│   └── socket.ts           # Configuración de Socket.IO
├── hooks/
│   ├── useChat.ts          # Hook para chat en tiempo real
│   ├── usePresence.ts      # Hook para usuarios online
│   └── useTurnos.ts        # Hook para gestión de turnos
├── components/
│   ├── Chat.tsx            # Componente de chat
│   ├── Chat.css
│   ├── TurnosList.tsx      # Lista de turnos en tiempo real
│   └── TurnosList.css
├── App.tsx                 # Componente principal
├── App.css
└── main.tsx
```

## 🔌 Eventos Socket.IO

### Eventos que Escucha el Cliente

- `connected` - Confirmación de conexión
- `chat:message` - Mensaje nuevo de chat
- `chat:user_joined` - Usuario se unió a sala
- `chat:user_left` - Usuario salió de sala
- `presence:user_online` - Usuario conectado
- `presence:user_offline` - Usuario desconectado
- `presence:user_typing` - Usuario escribiendo
- `turnos:created` - Turno creado
- `turnos:updated` - Turno actualizado
- `turnos:cancelled` - Turno cancelado
- `error` - Error del servidor

### Eventos que Emite el Cliente

- `chat:message` - Enviar mensaje
- `chat:join_room` - Unirse a sala
- `chat:leave_room` - Salir de sala
- `presence:online` - Marcar como online
- `presence:offline` - Marcar como offline
- `presence:typing` - Indicador de escritura
- `turnos:subscribe` - Suscribirse a actualizaciones
- `turnos:unsubscribe` - Desuscribirse

## 🎨 Características de la UI

### Tabs Principales

1. **📋 Turnos** - Gestión de turnos en tiempo real
   - Ver todos los turnos
   - Confirmar turnos pendientes
   - Cancelar turnos
   - Actualizaciones automáticas con Socket.IO

2. **💬 Chat** - Mensajería en tiempo real
   - Salas: General, Urgencias, Consultas
   - Mensajes instantáneos
   - Historial de conversaciones

### Sidebar

- Lista de usuarios conectados en tiempo real
- Estado online/offline con indicador verde

### Header

- Estado de conexión Socket.IO
- Contador de usuarios online

## 🔒 Autenticación

Actualmente usa un token demo. Para implementar autenticación real:

1. Actualiza `src/services/socket.ts`:

```typescript
auth: {
  token: localStorage.getItem('auth_token') || 'user_demo',
}
```

2. Implementa login y almacena el token en localStorage

## 🧪 Testing de Conexión

Abre la consola del navegador y verifica:

```javascript
// Estado de conexión
console.log('Connected:', socket.connected);
console.log('Socket ID:', socket.id);

// Transporte usado (websocket o polling)
console.log('Transport:', socket.io.engine.transport.name);
```

## ⚠️ Troubleshooting

### El Socket.IO no se conecta

1. Verifica que el backend esté corriendo en `http://localhost:3000`
2. Revisa la consola del navegador para errores
3. Verifica que el backend tenga CORS configurado correctamente

### Los turnos no se actualizan en tiempo real

1. Asegúrate de estar conectado al Socket.IO (indicador verde en el header)
2. Verifica que el backend esté emitiendo los eventos correctamente
3. Revisa la consola para errores

### El chat no funciona

1. Verifica la conexión Socket.IO
2. Asegúrate de haber seleccionado una sala
3. Revisa que el backend tenga implementados los handlers de chat

## 📚 Tecnologías Utilizadas

- **React 19** - Framework UI
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Socket.IO Client** - WebSockets en tiempo real
- **CSS3** - Estilos con animaciones

## 🚀 Deploy

### Cloudflare Pages (usando Wrangler)

```bash
npm run deploy
```

**Nota:** Recuerda actualizar la URL del backend en producción en `src/services/socket.ts`

## 📝 Licencia

ISC
