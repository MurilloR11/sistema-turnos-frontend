import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useChat } from '../hooks/useChat';
import { useUser } from '../context/UserContext';
import './Chat.css';

const AGENT_NAME = 'Soporte Técnico';

function formatTime(ts: string) {
  return new Date(ts).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
}

function AgentAvatar() {
  return (
    <div className="chat-avatar">
      <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    </div>
  );
}

function SendIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

export function Chat({ roomId }: { roomId?: string }) {
  const [input, setInput] = useState('');
  const [focused, setFocused] = useState(false);
  const { messages, sendMessage } = useChat(roomId);
  const { name } = useUser();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => { scrollToBottom(); }, [messages, scrollToBottom]);

  const resizeTextarea = () => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = '20px';
    ta.style.height = Math.min(ta.scrollHeight, 120) + 'px';
  };

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input.trim());
    setInput('');
    if (textareaRef.current) textareaRef.current.style.height = '20px';
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-screen">
      {/* Header */}
      <div className="chat-header">
        <AgentAvatar />
        <div className="chat-header-info">
          <span className="chat-header-name">{AGENT_NAME}</span>
          <div className="chat-header-status">
            <span className="chat-pulse-dot" />
            <span className="chat-header-label">En línea · responde en minutos</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="chat-messages">
        <div className="chat-day-label">HOY</div>

        {messages.map((msg) => {
          const isUser = msg.username === name;
          return isUser ? (
            <div key={msg.id} className="chat-msg chat-msg--user">
              <div className="chat-bubble chat-bubble--user">{msg.message}</div>
              <span className="chat-meta">{formatTime(msg.timestamp)}</span>
            </div>
          ) : (
            <div key={msg.id} className="chat-msg chat-msg--agent">
              <div className="chat-meta">
                <span>{msg.username}</span>
                <span>{formatTime(msg.timestamp)}</span>
              </div>
              <div className="chat-bubble chat-bubble--agent">{msg.message}</div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="chat-input-row">
        <div className={`chat-input-wrapper${focused ? ' chat-input-wrapper--focus' : ''}`}>
          <textarea
            ref={textareaRef}
            className="chat-textarea"
            value={input}
            onChange={(e) => { setInput(e.target.value); resizeTextarea(); }}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onKeyDown={handleKeyDown}
            placeholder="Escribe un mensaje..."
            rows={1}
          />
          <button
            className="chat-send-btn"
            onClick={handleSend}
            disabled={!input.trim()}
            aria-label="Enviar"
          >
            <SendIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
