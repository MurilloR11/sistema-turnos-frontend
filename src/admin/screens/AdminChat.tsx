import { useState, useRef, useEffect } from 'react';

// ── Tipos ─────────────────────────────────────────────────────────────────────
type AutorMsg = 'usuario' | 'admin';

interface Mensaje {
  id: string;
  autor: AutorMsg;
  texto: string;
  hora: string;
}

interface Sala {
  id: string;
  usuario: string;
  ultimoMensaje: string;
  hora: string;
  noLeidos: number;
  conectado: boolean;
  agente: string | null;
  archivada: boolean;
  mensajes: Mensaje[];
}

// ── Mock data ─────────────────────────────────────────────────────────────────
const mockSalas: Sala[] = [
  {
    id: 's1',
    usuario: 'María González',
    ultimoMensaje: '¿Cuánto tiempo más debo esperar?',
    hora: '15:44',
    noLeidos: 2,
    conectado: true,
    agente: null,
    archivada: false,
    mensajes: [
      { id: 'm1', autor: 'usuario', texto: 'Hola, tengo una consulta sobre mi turno', hora: '15:38' },
      { id: 'm2', autor: 'admin',   texto: 'Hola María, con gusto te ayudo. ¿Cuál es tu número de turno?', hora: '15:39' },
      { id: 'm3', autor: 'usuario', texto: 'Es el T-053', hora: '15:40' },
      { id: 'm4', autor: 'admin',   texto: 'Tu turno está en la posición 2. Serás llamada pronto.', hora: '15:41' },
      { id: 'm5', autor: 'usuario', texto: '¿Cuánto tiempo más debo esperar?', hora: '15:44' },
    ],
  },
  {
    id: 's2',
    usuario: 'Carlos Rodríguez',
    ultimoMensaje: 'Perfecto, muchas gracias',
    hora: '15:31',
    noLeidos: 0,
    conectado: false,
    agente: 'Admin',
    archivada: false,
    mensajes: [
      { id: 'm1', autor: 'usuario', texto: 'Necesito cancelar mi turno', hora: '15:25' },
      { id: 'm2', autor: 'admin',   texto: '¿Cuál es tu número de turno?', hora: '15:26' },
      { id: 'm3', autor: 'usuario', texto: 'T-050', hora: '15:27' },
      { id: 'm4', autor: 'admin',   texto: 'Tu turno ha sido cancelado exitosamente.', hora: '15:29' },
      { id: 'm5', autor: 'usuario', texto: 'Perfecto, muchas gracias', hora: '15:31' },
    ],
  },
  {
    id: 's3',
    usuario: 'Ana Martínez',
    ultimoMensaje: 'No encuentro dónde solicitar el turno',
    hora: '15:20',
    noLeidos: 1,
    conectado: true,
    agente: null,
    archivada: false,
    mensajes: [
      { id: 'm1', autor: 'usuario', texto: 'No encuentro dónde solicitar el turno', hora: '15:20' },
    ],
  },
  {
    id: 's4',
    usuario: 'Jorge Ramírez',
    ultimoMensaje: 'Ok, entendido',
    hora: '14:55',
    noLeidos: 0,
    conectado: false,
    agente: 'Admin',
    archivada: false,
    mensajes: [
      { id: 'm1', autor: 'usuario', texto: '¿Cómo sé cuando me llaman?', hora: '14:50' },
      { id: 'm2', autor: 'admin',   texto: 'La pantalla principal se actualiza automáticamente cuando es tu turno.', hora: '14:52' },
      { id: 'm3', autor: 'usuario', texto: 'Ok, entendido', hora: '14:55' },
    ],
  },
];

// ── Iconos ────────────────────────────────────────────────────────────────────
const sv = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.75, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
function IconSend()    { return <svg width={15} height={15} viewBox="0 0 24 24" {...sv}><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>; }
function IconArchive() { return <svg width={13} height={13} viewBox="0 0 24 24" {...sv}><polyline points="21 8 21 21 3 21 3 8"/><rect x="1" y="3" width="22" height="5"/><line x1="10" y1="12" x2="14" y2="12"/></svg>; }

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

// ── Componente ────────────────────────────────────────────────────────────────
export function AdminChat() {
  const [salas, setSalas]       = useState<Sala[]>(mockSalas);
  const [salaId, setSalaId]     = useState<string>(mockSalas[0].id);
  const [input, setInput]       = useState('');
  const [mobilePanelOpen, setMobilePanelOpen] = useState(false);
  const messagesEndRef          = useRef<HTMLDivElement>(null);

  const sala = salas.find((s) => s.id === salaId)!;
  const salasFiltradas = salas.filter((s) => !s.archivada);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [sala?.mensajes]);

  // Marcar leídos al abrir sala
  const abrirSala = (id: string) => {
    setSalas((ss) => ss.map((s) => s.id === id ? { ...s, noLeidos: 0 } : s));
    setSalaId(id);
    setMobilePanelOpen(false);
  };

  const enviar = () => {
    const texto = input.trim();
    if (!texto) return;
    const nuevoMsg: Mensaje = {
      id: Date.now().toString(),
      autor: 'admin',
      texto,
      hora: new Date().toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' }),
    };
    setSalas((ss) =>
      ss.map((s) => {
        if (s.id !== salaId) return s;
        return {
          ...s,
          mensajes: [...s.mensajes, nuevoMsg],
          ultimoMensaje: texto,
          hora: nuevoMsg.hora,
          agente: s.agente ?? 'Admin',
        };
      })
    );
    setInput('');
  };

  const archivar = (id: string) => {
    setSalas((ss) => ss.map((s) => s.id === id ? { ...s, archivada: true } : s));
    const siguiente = salasFiltradas.find((s) => s.id !== id);
    if (siguiente) setSalaId(siguiente.id);
  };

  const totalNoLeidos = salas.reduce((acc, s) => acc + s.noLeidos, 0);

  return (
    <div
      style={{
        display: 'flex',
        height: '100%',
        gap: 0,
        overflow: 'hidden',
      }}
    >
      {/* ── Panel izquierdo: lista de salas ── */}
      <div
        style={{
          width: 300,
          flexShrink: 0,
          borderRight: '1px solid #1C1C21',
          display: 'flex',
          flexDirection: 'column',
          background: '#111114',
          overflow: 'hidden',
        }}
      >
        {/* Header lista */}
        <div
          style={{
            padding: '16px 16px 12px',
            borderBottom: '1px solid #1C1C21',
            flexShrink: 0,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="card-header-title">Conversaciones</span>
            {totalNoLeidos > 0 && (
              <span
                style={{
                  background: '#EF4444',
                  color: '#fff',
                  borderRadius: 999,
                  fontSize: 9,
                  fontWeight: 700,
                  padding: '2px 6px',
                  lineHeight: '14px',
                }}
              >
                {totalNoLeidos}
              </span>
            )}
          </div>
          <div className="card-header-sub">{salasFiltradas.length} conversaciones activas</div>
        </div>

        {/* Lista de salas */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {salasFiltradas.length === 0 ? (
            <div style={{ padding: 24, textAlign: 'center', color: '#52525B', fontSize: 13 }}>
              No hay conversaciones activas
            </div>
          ) : (
            salasFiltradas.map((s) => {
              const isActiva = s.id === salaId;
              return (
                <button
                  key={s.id}
                  onClick={() => abrirSala(s.id)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: isActiva ? 'rgba(59,130,246,0.06)' : 'transparent',
                    borderLeft: `2px solid ${isActiva ? '#3B82F6' : 'transparent'}`,
                    border: 'none',
                    borderBottom: '1px solid #1C1C21',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'background 120ms ease',
                    fontFamily: 'inherit',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActiva) (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.02)';
                  }}
                  onMouseLeave={(e) => {
                    if (!isActiva) (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                    {/* Avatar */}
                    <div
                      style={{
                        width: 32, height: 32,
                        borderRadius: '50%',
                        background: s.conectado ? 'rgba(34,197,94,0.1)' : 'rgba(255,255,255,0.04)',
                        border: `1px solid ${s.conectado ? 'rgba(34,197,94,0.2)' : '#1E1E23'}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 10,
                        fontWeight: 700,
                        color: s.conectado ? '#22C55E' : '#52525B',
                        flexShrink: 0,
                        position: 'relative',
                      }}
                    >
                      {getInitials(s.usuario)}
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6 }}>
                        <span
                          style={{
                            fontSize: 13,
                            fontWeight: s.noLeidos > 0 ? 600 : 500,
                            color: s.noLeidos > 0 ? '#FAFAFA' : '#A0A0AB',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {s.usuario}
                        </span>
                        <span style={{ fontSize: 10, color: '#3F3F46', flexShrink: 0 }}>{s.hora}</span>
                      </div>
                      <div
                        style={{
                          fontSize: 11,
                          color: s.noLeidos > 0 ? '#71717A' : '#3F3F46',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          marginTop: 2,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 4,
                          justifyContent: 'space-between',
                        }}
                      >
                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {s.ultimoMensaje}
                        </span>
                        {s.noLeidos > 0 && (
                          <span
                            style={{
                              background: '#EF4444',
                              color: '#fff',
                              borderRadius: 999,
                              fontSize: 9,
                              fontWeight: 700,
                              padding: '1px 5px',
                              flexShrink: 0,
                            }}
                          >
                            {s.noLeidos}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Sin agente */}
                  {!s.agente && (
                    <div style={{ marginTop: 6, marginLeft: 41 }}>
                      <span className="badge badge--red" style={{ fontSize: 9, padding: '2px 6px' }}>
                        Sin agente asignado
                      </span>
                    </div>
                  )}
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* ── Panel derecho: conversación ── */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          minWidth: 0,
        }}
      >
        {!sala ? (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#52525B', fontSize: 13 }}>
            Selecciona una conversación
          </div>
        ) : (
          <>
            {/* Header conversación */}
            <div
              style={{
                padding: '12px 20px',
                borderBottom: '1px solid #1C1C21',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: '#111114',
                flexShrink: 0,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div
                  style={{
                    width: 32, height: 32,
                    borderRadius: '50%',
                    background: sala.conectado ? 'rgba(34,197,94,0.1)' : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${sala.conectado ? 'rgba(34,197,94,0.2)' : '#1E1E23'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 10,
                    fontWeight: 700,
                    color: sala.conectado ? '#22C55E' : '#52525B',
                    flexShrink: 0,
                  }}
                >
                  {getInitials(sala.usuario)}
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500, color: '#FAFAFA' }}>{sala.usuario}</div>
                  <div style={{ fontSize: 11, color: sala.conectado ? '#22C55E' : '#52525B', marginTop: 1, display: 'flex', alignItems: 'center', gap: 4 }}>
                    {sala.conectado ? <><span className="status-pulse" style={{ background: '#22C55E' }} /> En línea</> : 'Desconectado'}
                    {sala.agente && (
                      <span style={{ color: '#3F3F46', marginLeft: 6 }}>· Agente: {sala.agente}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Archivar */}
              <button
                onClick={() => archivar(sala.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  background: 'transparent',
                  border: '1px solid #1E1E23',
                  borderRadius: 6,
                  padding: '5px 10px',
                  fontSize: 12,
                  color: '#71717A',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  transition: 'all 150ms ease',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = '#27272A';
                  (e.currentTarget as HTMLButtonElement).style.color = '#A0A0AB';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = '#1E1E23';
                  (e.currentTarget as HTMLButtonElement).style.color = '#71717A';
                }}
              >
                <IconArchive />
                Archivar
              </button>
            </div>

            {/* Mensajes */}
            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
              }}
            >
              {sala.mensajes.map((msg) => {
                const esAdmin = msg.autor === 'admin';
                return (
                  <div
                    key={msg.id}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: esAdmin ? 'flex-end' : 'flex-start',
                    }}
                  >
                    <div
                      style={{
                        maxWidth: '72%',
                        padding: '9px 13px',
                        borderRadius: esAdmin ? '12px 12px 3px 12px' : '12px 12px 12px 3px',
                        background: esAdmin ? '#3B82F6' : '#16161A',
                        border: esAdmin ? 'none' : '1px solid #1E1E23',
                        fontSize: 13,
                        color: esAdmin ? '#fff' : '#FAFAFA',
                        lineHeight: 1.55,
                      }}
                    >
                      {msg.texto}
                    </div>
                    <span style={{ fontSize: 10, color: '#3F3F46', marginTop: 4 }}>
                      {esAdmin ? 'Tú' : sala.usuario} · {msg.hora}
                    </span>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div
              style={{
                padding: '12px 16px',
                borderTop: '1px solid #1C1C21',
                background: '#111114',
                display: 'flex',
                gap: 8,
                flexShrink: 0,
              }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); enviar(); } }}
                placeholder={sala.conectado ? 'Escribe una respuesta...' : 'El usuario está desconectado'}
                disabled={!sala.conectado}
                className="form-input"
                style={{ flex: 1, padding: '9px 12px' }}
              />
              <button
                onClick={enviar}
                disabled={!input.trim() || !sala.conectado}
                className="btn-primary"
                style={{ width: 'auto', padding: '9px 14px', gap: 0 }}
              >
                <IconSend />
              </button>
            </div>
          </>
        )}
      </div>

      {/* Responsive: en mobile mostrar solo un panel a la vez */}
      <style>{`
        @media (max-width: 640px) {
          .admin-chat-left  { display: ${mobilePanelOpen ? 'flex' : 'none'} !important; }
          .admin-chat-right { display: ${!mobilePanelOpen ? 'flex' : 'none'} !important; }
        }
      `}</style>
    </div>
  );
}
