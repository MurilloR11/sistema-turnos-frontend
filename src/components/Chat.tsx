import React, { useState } from 'react';
import { useChat } from '../hooks/useChat';
import './Chat.css';

export function Chat({ roomId }: { roomId?: string }) {
  const [inputMessage, setInputMessage] = useState('');
  const { messages, sendMessage, isConnected } = useChat(roomId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputMessage);
    setInputMessage('');
  };

  return (
    <div className="chat-container">
      <div className="chat-status">
        <span className={isConnected ? 'status-online' : 'status-offline'}>
          {isConnected ? '🟢 Conectado' : '🔴 Desconectado'}
        </span>
        {roomId && <span className="room-name">Sala: {roomId}</span>}
      </div>
      
      <div className="messages">
        {messages.length === 0 ? (
          <div className="no-messages">
            <p>No hay mensajes aún. ¡Sé el primero en escribir!</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className="message">
              <div className="message-header">
                <strong className="message-username">{msg.username}</strong>
                <span className="message-time">
                  {new Date(msg.timestamp).toLocaleTimeString('es-ES', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
              <p className="message-text">{msg.message}</p>
            </div>
          ))
        )}
      </div>

      <form onSubmit={handleSubmit} className="chat-form">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Escribe un mensaje..."
          disabled={!isConnected}
          className="chat-input"
        />
        <button 
          type="submit" 
          disabled={!isConnected || !inputMessage.trim()}
          className="chat-button"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
