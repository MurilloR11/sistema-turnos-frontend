<<<<<<< Updated upstream
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
=======
import { useState, useEffect } from 'react'
import socket from './services/socket'
import { Chat } from './components/Chat'
import { TurnosList } from './components/TurnosList'
import { usePresence } from './hooks/usePresence'
import './App.css'

function App() {
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

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div className="header-title">
            <h1>🏥 Sistema de Turnos Médicos</h1>
            <p className="subtitle">Gestión de citas y consultas en tiempo real</p>
          </div>
          <div className="status-bar">
            <span className={isConnected ? 'status-online' : 'status-offline'}>
              {isConnected ? '🟢 Conectado' : '🔴 Desconectado'}
            </span>
            <span className="online-count">👥 {onlineCount} usuarios online</span>
          </div>
        </div>
      </header>

      <div className="main-content">
        <aside className="sidebar">
          <h3>Usuarios Online</h3>
          <div className="online-users-list">
            {onlineUsers.length === 0 ? (
              <p className="no-users">No hay usuarios conectados</p>
            ) : (
              onlineUsers.map((user) => (
                <div key={user.userId} className="online-user">
                  <span className="user-status">🟢</span>
                  <span className="user-name">{user.username}</span>
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
              📋 Turnos
            </button>
            <button
              className={`tab ${activeTab === 'chat' ? 'active' : ''}`}
              onClick={() => setActiveTab('chat')}
            >
              💬 Chat
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
>>>>>>> Stashed changes
  )
}

export default App
