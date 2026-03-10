import { useState, useEffect } from 'react'
import socket from './services/socket'
import { Chat } from './components/Chat'
import { TurnosList } from './components/TurnosList'
import { usePresence } from './hooks/usePresence'
import { useUser } from './context/UserContext'
import { OnboardingScreen } from './components/Onboarding/OnboardingScreen'
import './App.css'

const ESTADO_LABELS: Record<string, string> = {
  'normal': 'Normal',
  'embarazada': 'Embarazada',
  'adulto_mayor': 'Adulto mayor',
  'discapacitado/a': 'Discapacitado/a',
};

function App() {
  const { isRegistered, clear } = useUser()
  const [isConnected, setIsConnected] = useState(socket.connected)
  const [currentRoom, setCurrentRoom] = useState<string>('general')
  const [activeTab, setActiveTab] = useState<'turnos' | 'chat'>('turnos')
  const { onlineUsers, onlineCount } = usePresence()

  useEffect(() => {
    socket.on('connect', () => setIsConnected(true))
    socket.on('disconnect', () => setIsConnected(false))

    return () => {
      socket.off('connect')
      socket.off('disconnect')
    }
  }, [])

  if (!isRegistered) {
    return <OnboardingScreen />
  }

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div className="header-title">
            <h1>Sistema de Turnos Médicos</h1>
            <p className="subtitle">Gestión de citas y consultas en tiempo real</p>
          </div>
          <div className="status-bar">
            <span className={isConnected ? 'status-online' : 'status-offline'}>
              <span className={`status-dot ${isConnected ? 'dot-online' : 'dot-offline'}`} />
              {isConnected ? 'Conectado' : 'Desconectado'}
            </span>
            <span className="online-count">{onlineCount} usuarios en línea</span>
          </div>
          <button
            onClick={clear}
            className="logout-btn"
            aria-label="Cerrar sesión"
          >
            Salir
          </button>
        </div>
      </header>

      <div className="main-content">
        <aside className="sidebar">
          <h3>Usuarios Online</h3>
          <div className="online-users-list">
            {onlineUsers.length === 0 ? (
              <p className="no-users">Sin usuarios conectados</p>
            ) : (
              onlineUsers.map((user) => (
                <div key={user.userId} className="online-user">
                  <span className="user-status-dot" />
                  <span className="user-name">{user.username}</span>
                  {user.estado && (
                    <span className="user-estado-badge">
                      {ESTADO_LABELS[user.estado] ?? user.estado}
                    </span>
                  )}
                </div>
              ))
            )}
          </div>
        </aside>

        <main className="main-panel">
          <div className="tabs">
            <button
              className={`tab ${activeTab === 'turnos' ? 'active' : ''}`}
              onClick={() => setActiveTab('turnos')}
            >
              Turnos
            </button>
            <button
              className={`tab ${activeTab === 'chat' ? 'active' : ''}`}
              onClick={() => setActiveTab('chat')}
            >
              Chat
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'turnos' ? (
              <TurnosList />
            ) : (
              <div className="chat-section">
                <div className="room-selector">
                  <button
                    className={currentRoom === 'general' ? 'room-active' : ''}
                    onClick={() => setCurrentRoom('general')}
                  >
                    General
                  </button>
                  <button
                    className={currentRoom === 'urgencias' ? 'room-active' : ''}
                    onClick={() => setCurrentRoom('urgencias')}
                  >
                    Urgencias
                  </button>
                  <button
                    className={currentRoom === 'consultas' ? 'room-active' : ''}
                    onClick={() => setCurrentRoom('consultas')}
                  >
                    Consultas
                  </button>
                </div>
                <Chat roomId={currentRoom} />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
