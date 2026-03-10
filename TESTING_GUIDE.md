# 🧪 Ejemplos de Uso y Testing

## 🚀 Iniciar la Aplicación

### 1. Iniciar Backend
```bash
cd sistema-turnos-backend
npm run dev
```

Deberías ver:
```
✅ HTTP Server listening on http://localhost:3000
✅ Socket.IO Server ready on ws://localhost:3000
```

### 2. Iniciar Frontend
```bash
cd sistema-turnos-frontend
npm run dev
```

Abre `http://localhost:5173`

---

## 💬 Probar el Chat

### Opción 1: Dos Pestañas del Navegador

1. Abre `http://localhost:5173` en la primera pestaña
2. Abre `http://localhost:5173` en una segunda pestaña
3. Ve a la tab "Chat" en ambas
4. Escribe un mensaje en la primera
5. ✅ Debería aparecer en tiempo real en la segunda

### Opción 2: Script de Prueba con Node.js

Crea un archivo `test-chat.js`:

```javascript
const io = require('socket.io-client');

const socket = io('http://localhost:3000', {
  auth: { token: 'test_user' }
});

socket.on('connect', () => {
  console.log('✅ Conectado:', socket.id);
  
  // Enviar mensaje cada 3 segundos
  setInterval(() => {
    socket.emit('chat:message', { 
      message: `Mensaje de prueba ${new Date().toLocaleTimeString()}` 
    });
    console.log('📨 Mensaje enviado');
  }, 3000);
});

socket.on('chat:message', (data) => {
  console.log('📬 Mensaje recibido:', data);
});

socket.on('disconnect', () => {
  console.log('❌ Desconectado');
});
```

Ejecutar:
```bash
node test-chat.js
```

---

## 📋 Probar Turnos en Tiempo Real

### Crear Turno con cURL

```bash
curl -X POST http://localhost:3000/api/turnos \
  -H "Content-Type: application/json" \
  -d '{
    "paciente": "Juan Pérez",
    "fecha": "2026-03-15",
    "hora": "10:30",
    "doctor": "Dra. García",
    "especialidad": "Cardiología",
    "estado": "pendiente"
  }'
```

✅ El turno debería aparecer automáticamente en el frontend

### Actualizar Turno

```bash
curl -X PUT http://localhost:3000/api/turnos/1 \
  -H "Content-Type: application/json" \
  -d '{
    "estado": "confirmado"
  }'
```

✅ El estado del turno debería actualizarse en tiempo real

### Crear Múltiples Turnos (Bash)

```bash
for i in {1..5}; do
  curl -X POST http://localhost:3000/api/turnos \
    -H "Content-Type: application/json" \
    -d "{
      \"paciente\": \"Paciente $i\",
      \"fecha\": \"2026-03-15\",
      \"hora\": \"0$i:00\",
      \"doctor\": \"Dr. López\",
      \"especialidad\": \"Medicina General\",
      \"estado\": \"pendiente\"
    }"
  sleep 1
done
```

✅ Los turnos deberían aparecer uno por uno en tiempo real

---

## 👥 Probar Indicadores de Presencia

### Simular Múltiples Usuarios

Abre 3 pestañas:
1. `http://localhost:5173`
2. `http://localhost:5173` (pestaña incógnito)
3. `http://localhost:5173` (otro navegador)

✅ En el sidebar deberías ver 3 usuarios online

### Script para Simular Usuarios

```javascript
// test-presence.js
const io = require('socket.io-client');

function createUser(username) {
  const socket = io('http://localhost:3000', {
    auth: { token: username }
  });

  socket.on('connect', () => {
    console.log(`✅ ${username} conectado`);
    socket.emit('presence:online');
  });

  socket.on('presence:user_online', (data) => {
    console.log(`👋 ${data.username} está online`);
  });

  socket.on('disconnect', () => {
    console.log(`❌ ${username} desconectado`);
  });

  return socket;
}

// Crear 3 usuarios
const user1 = createUser('Usuario1');
const user2 = createUser('Usuario2');
const user3 = createUser('Usuario3');

// Desconectar después de 10 segundos
setTimeout(() => {
  user2.disconnect();
}, 10000);
```

---

## 🔄 Probar Reconexión Automática

1. Inicia el frontend
2. Verifica que esté conectado (🟢)
3. Detén el backend (`Ctrl+C`)
4. El frontend debería mostrar "🔴 Desconectado"
5. Reinicia el backend
6. ✅ El frontend debería reconectarse automáticamente

---

## 📊 Inspeccionar Eventos en DevTools

### Chrome DevTools

1. Abre DevTools (`F12`)
2. Ve a la pestaña "Network"
3. Filtra por "WS" (WebSocket)
4. Deberías ver la conexión Socket.IO
5. Haz clic en la conexión para ver los mensajes en tiempo real

### Console Logs

Pega esto en la consola del navegador:

```javascript
// Ver estado del socket
console.log({
  connected: socket.connected,
  id: socket.id,
  transport: socket.io.engine.transport.name
});

// Escuchar todos los eventos
const originalEmit = socket.emit;
socket.emit = function(...args) {
  console.log('🔵 EMIT:', args[0], args[1]);
  return originalEmit.apply(socket, args);
};

const originalOn = socket.on;
socket.on = function(event, handler) {
  return originalOn.call(socket, event, function(...args) {
    console.log('🟢 RECEIVE:', event, args);
    return handler(...args);
  });
};
```

Ahora verás todos los eventos que se emiten y reciben.

---

## 🎭 Probar Diferentes Salas de Chat

### Script para Probar Salas

```javascript
const io = require('socket.io-client');

const socket = io('http://localhost:3000');

socket.on('connect', () => {
  // Unirse a sala de urgencias
  socket.emit('chat:join_room', { roomId: 'urgencias' });
  console.log('📍 Unido a sala: urgencias');

  // Enviar mensaje a urgencias
  socket.emit('chat:message', { 
    message: 'Necesito ayuda urgente', 
    room: 'urgencias' 
  });

  // Cambiar a sala general después de 5 segundos
  setTimeout(() => {
    socket.emit('chat:leave_room', { roomId: 'urgencias' });
    socket.emit('chat:join_room', { roomId: 'general' });
    console.log('📍 Cambiado a sala: general');

    socket.emit('chat:message', { 
      message: 'Hola a todos', 
      room: 'general' 
    });
  }, 5000);
});

socket.on('chat:message', (data) => {
  console.log(`[${data.room || 'general'}] ${data.username}: ${data.message}`);
});
```

---

## 🔧 Probar Modo Producción

### Build y Preview

```bash
npm run build
npm run preview
```

### Cambiar a Backend de Producción

En `src/config/backend.ts`:

```typescript
export const BACKEND_URL = PRODUCTION_BACKEND;
```

---

## 📱 Probar en Dispositivos Móviles

1. Averigua tu IP local:
   ```bash
   # Windows
   ipconfig
   
   # Mac/Linux
   ifconfig
   ```

2. En tu dispositivo móvil, abre:
   ```
   http://[TU-IP]:5173
   ```

3. Actualiza `src/config/backend.ts`:
   ```typescript
   export const LOCAL_BACKEND = 'http://[TU-IP]:3000';
   ```

---

## ⚡ Benchmark de Rendimiento

```javascript
// benchmark.js
const io = require('socket.io-client');

const NUM_CLIENTS = 100;
const clients = [];

console.log(`Creando ${NUM_CLIENTS} conexiones...`);

for (let i = 0; i < NUM_CLIENTS; i++) {
  const socket = io('http://localhost:3000', {
    auth: { token: `user_${i}` }
  });

  socket.on('connect', () => {
    console.log(`Cliente ${i} conectado`);
    
    // Enviar 10 mensajes
    for (let j = 0; j < 10; j++) {
      socket.emit('chat:message', { 
        message: `Mensaje ${j} del cliente ${i}` 
      });
    }
  });

  clients.push(socket);
}

// Desconectar todos después de 30 segundos
setTimeout(() => {
  clients.forEach(c => c.disconnect());
  console.log('Todos los clientes desconectados');
}, 30000);
```

---

## 🎯 Casos de Uso Comunes

### Notificar nuevo turno solo a un doctor específico

En el frontend:
```typescript
socket.emit('turnos:subscribe', { doctorId: 'DR-123' });
```

### Enviar mensaje privado (si está implementado en el backend)

```typescript
socket.emit('chat:private_message', {
  to: 'user_id_123',
  message: 'Hola, ¿tienes un minuto?'
});
```

### Obtener lista de usuarios online

```typescript
socket.emit('presence:get_online_users', {}, (users) => {
  console.log('Usuarios online:', users);
});
```

---

**¡Todo listo para probar tu aplicación en tiempo real! 🚀**
