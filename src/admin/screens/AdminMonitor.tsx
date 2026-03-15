import { useState, useEffect, useRef } from 'react';

// ── Tipos ─────────────────────────────────────────────────────────────────────
interface TurnoMonitor {
  numero: string;
  nombre: string;
  motivo: string;
  prioridad: 'alta' | 'media' | 'estandar';
}

// ── Mock data ─────────────────────────────────────────────────────────────────
const turnosDemo: TurnoMonitor[] = [
  { numero: 'T-052', nombre: 'Roberto Silva',    motivo: 'Consulta general',   prioridad: 'alta' },
  { numero: 'T-053', nombre: 'Claudia Herrera',  motivo: 'Medicina familiar',  prioridad: 'media' },
  { numero: 'T-054', nombre: 'Diego Morales',    motivo: 'Nutrición',          prioridad: 'estandar' },
  { numero: 'T-055', nombre: 'Patricia López',   motivo: 'Pediatría',          prioridad: 'alta' },
  { numero: 'T-056', nombre: 'Andrés Castillo',  motivo: 'Medicina general',   prioridad: 'estandar' },
  { numero: 'T-057', nombre: 'Valentina Torres', motivo: 'Ginecología',        prioridad: 'media' },
];

// ── Icono ─────────────────────────────────────────────────────────────────────
const sv = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.75, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
function IconMaximize() { return <svg width={16} height={16} viewBox="0 0 24 24" {...sv}><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>; }
function IconMinimize() { return <svg width={16} height={16} viewBox="0 0 24 24" {...sv}><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/></svg>; }
function IconArrowLeft() { return <svg width={16} height={16} viewBox="0 0 24 24" {...sv}><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>; }

function prioBadgeMonitor(p: TurnoMonitor['prioridad']) {
  if (p === 'alta')  return { label: 'Prioridad alta',  color: '#EF4444', bg: 'rgba(239,68,68,0.15)',  border: 'rgba(239,68,68,0.3)' };
  if (p === 'media') return { label: 'Prioridad media', color: '#F59E0B', bg: 'rgba(245,158,11,0.15)', border: 'rgba(245,158,11,0.3)' };
  return                    { label: 'Estándar',        color: '#71717A', bg: 'rgba(255,255,255,0.05)', border: '#1E1E23' };
}

// ── Componente ────────────────────────────────────────────────────────────────
export function AdminMonitor({ onExit }: { onExit: () => void }) {
  const [indice, setIndice]         = useState(0);
  const [animando, setAnimando]     = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [tiempo, setTiempo]         = useState(new Date());
  const containerRef                = useRef<HTMLDivElement>(null);

  const actual     = turnosDemo[indice];
  const proximos   = turnosDemo.slice(indice + 1, indice + 5);

  // Reloj
  useEffect(() => {
    const id = setInterval(() => setTiempo(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  // Rotación automática cada 15s
  useEffect(() => {
    const id = setInterval(() => avanzar(), 15000);
    return () => clearInterval(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [indice]);

  const avanzar = () => {
    if (indice >= turnosDemo.length - 1) return;
    setAnimando(true);
    setTimeout(() => {
      setIndice((i) => i + 1);
      setAnimando(false);
    }, 400);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().then(() => setFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setFullscreen(false)).catch(() => {});
    }
  };

  // Hora formateada
  const horaStr = tiempo.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  const prio = prioBadgeMonitor(actual.prioridad);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100vh',
        background: '#09090B',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Barra superior del monitor */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 32px',
          height: 52,
          borderBottom: '1px solid #1C1C21',
          background: '#111114',
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button
            onClick={onExit}
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid #1C1C21',
              borderRadius: 6,
              padding: '5px 10px',
              color: '#71717A',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 12,
              fontFamily: 'inherit',
              transition: 'color 150ms, background 150ms',
            }}
          >
            <IconArrowLeft />
            Salir del monitor
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="pulse-dot" />
          <span style={{ fontSize: 12, color: '#52525B' }}>Monitor en vivo</span>
        </div>

        <button
          onClick={toggleFullscreen}
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid #1C1C21',
            borderRadius: 6,
            padding: '5px 10px',
            color: '#71717A',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 12,
            fontFamily: 'inherit',
            transition: 'color 150ms, background 150ms',
          }}
        >
          {fullscreen ? <IconMinimize /> : <IconMaximize />}
          {fullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}
        </button>
      </div>

      {/* Cuerpo del monitor */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

        {/* Centro — turno actual */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 32px',
            borderRight: '1px solid #1C1C21',
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#52525B',
              marginBottom: 24,
            }}
          >
            Atendiendo ahora
          </div>

          {/* Número de turno grande */}
          <div
            style={{
              opacity: animando ? 0 : 1,
              transform: animando ? 'translateY(-16px)' : 'translateY(0)',
              transition: 'opacity 350ms ease, transform 350ms ease',
            }}
          >
            <div
              className="mono"
              style={{
                fontSize: 'clamp(80px, 14vw, 140px)',
                fontWeight: 700,
                color: '#FAFAFA',
                letterSpacing: '-0.04em',
                lineHeight: 1,
                textAlign: 'center',
              }}
            >
              {actual.numero}
            </div>

            <div
              style={{
                marginTop: 20,
                fontSize: 'clamp(20px, 3vw, 30px)',
                fontWeight: 500,
                color: '#A0A0AB',
                textAlign: 'center',
                letterSpacing: '-0.01em',
              }}
            >
              {actual.nombre}
            </div>

            <div
              style={{
                marginTop: 10,
                fontSize: 'clamp(14px, 2vw, 18px)',
                color: '#52525B',
                textAlign: 'center',
              }}
            >
              {actual.motivo}
            </div>

            {/* Badge prioridad */}
            <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center' }}>
              <span
                style={{
                  background: prio.bg,
                  border: `1px solid ${prio.border}`,
                  borderRadius: 999,
                  padding: '5px 14px',
                  fontSize: 12,
                  fontWeight: 500,
                  color: prio.color,
                }}
              >
                {prio.label}
              </span>
            </div>
          </div>

          {/* Reloj */}
          <div
            className="mono"
            style={{
              position: 'absolute',
              bottom: 80,
              fontSize: 'clamp(24px, 4vw, 40px)',
              fontWeight: 300,
              color: '#3F3F46',
              letterSpacing: '0.04em',
            }}
          >
            {horaStr}
          </div>
        </div>

        {/* Derecha — próximos turnos */}
        <div
          style={{
            width: 320,
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'column',
            padding: '32px 24px',
            gap: 0,
          }}
        >
          <div
            style={{
              fontSize: 10,
              fontWeight: 500,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#52525B',
              marginBottom: 16,
            }}
          >
            Próximos en espera
          </div>

          {proximos.length === 0 ? (
            <div style={{ fontSize: 13, color: '#3F3F46', paddingTop: 16 }}>
              No hay más turnos en espera
            </div>
          ) : (
            proximos.map((t, i) => {
              const p = prioBadgeMonitor(t.prioridad);
              return (
                <div
                  key={t.numero}
                  style={{
                    padding: '16px 0',
                    borderBottom: i < proximos.length - 1 ? '1px solid #1C1C21' : 'none',
                    opacity: 1 - i * 0.18,
                    transition: 'opacity 300ms ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span
                      className="mono"
                      style={{
                        fontSize: 22,
                        fontWeight: 700,
                        color: i === 0 ? '#3B82F6' : '#A0A0AB',
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {t.numero}
                    </span>
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 500,
                        color: p.color,
                        background: p.bg,
                        border: `1px solid ${p.border}`,
                        borderRadius: 999,
                        padding: '2px 8px',
                      }}
                    >
                      {p.label}
                    </span>
                  </div>
                  <div style={{ fontSize: 14, color: '#71717A', fontWeight: 500 }}>{t.nombre}</div>
                  <div style={{ fontSize: 12, color: '#3F3F46', marginTop: 2 }}>{t.motivo}</div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Ticker inferior */}
      <div
        style={{
          height: 44,
          background: '#111114',
          borderTop: '1px solid #1C1C21',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          flexShrink: 0,
          position: 'relative',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 40,
            animation: 'tickerScroll 25s linear infinite',
            whiteSpace: 'nowrap',
          }}
        >
          {Array.from({ length: 3 }).map((_, i) => (
            <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
              <span style={{ fontSize: 12, color: '#52525B' }}>Sistema de atención al publico operativo</span>
              <span style={{ color: '#22C55E', display: 'inline-flex', alignItems: 'center' }}>
                <span className="status-pulse" style={{ marginRight: 6 }} />
                En línea
              </span>
              <span style={{ fontSize: 12, color: '#52525B' }}>
                {proximos.length} turnos en espera
              </span>
              <span style={{ color: '#3F3F46' }}>—</span>
              <span style={{ fontSize: 12, color: '#52525B' }}>Próximo: {proximos[0]?.nombre ?? 'Sin turnos'}</span>
            </span>
          ))}
        </div>

        <style>{`
          @keyframes tickerScroll {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-33.333%); }
          }
        `}</style>
      </div>
    </div>
  );
}
