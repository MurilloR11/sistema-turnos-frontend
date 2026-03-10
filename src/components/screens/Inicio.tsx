import { useState } from 'react';
import { StatCard } from '../ui/StatCard';
import { Dot } from '../ui/Dot';
import { IconTicket, IconClock } from '../ui/icons';
import type { Screen } from '../Sidebar';

interface InicioProps {
  onNavigate: (screen: Screen) => void;
}

const mono = { fontFamily: "'Geist Mono', 'Courier New', monospace" };

export function Inicio({ onNavigate }: InicioProps) {
  return (
    <div>
      {/* Page heading */}
      <h1
        style={{
          fontSize: 18,
          fontWeight: 600,
          color: '#FAFAFA',
          letterSpacing: '-0.02em',
          margin: 0,
        }}
      >
        Inicio
      </h1>
      <p style={{ fontSize: 13, color: '#71717A', marginTop: 4 }}>
        Resumen de actividad del sistema de turnos
      </p>

      {/* Stat grid */}
      <div className="stat-grid">
        <StatCard label="Tu posición" accent="blue">
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
            <span
              style={{
                ...mono,
                fontSize: 22,
                fontWeight: 600,
                color: '#FAFAFA',
                letterSpacing: '-0.03em',
              }}
            >
              #5
            </span>
            <span style={{ fontSize: 10, color: '#71717A' }}>de 12</span>
          </div>
        </StatCard>

        <StatCard label="En espera ahora" accent="green">
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
            <span
              style={{
                ...mono,
                fontSize: 22,
                fontWeight: 600,
                color: '#FAFAFA',
                letterSpacing: '-0.03em',
              }}
            >
              12
            </span>
            <span style={{ fontSize: 10, color: '#71717A' }}>personas</span>
          </div>
        </StatCard>

        <StatCard label="Tu estado" accent="amber">
          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <Dot color="amber" />
            <span style={{ fontSize: 14, fontWeight: 500, color: '#FAFAFA' }}>
              Embarazada
            </span>
          </div>
          <div style={{ fontSize: 11, color: '#71717A', marginTop: 4, paddingLeft: 13 }}>
            Prioridad media
          </div>
        </StatCard>

        <StatCard label="Turno activo">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: '#3F3F46', display: 'flex' }}>
              <IconTicket size={14} />
            </span>
            <span style={{ fontSize: 13, color: '#3F3F46' }}>
              Sin turno activo
            </span>
          </div>
        </StatCard>
      </div>

      {/* Request card */}
      <div className="main-card" style={{ maxWidth: 'min(520px, 100%)', marginTop: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div className="icon-box icon-box--blue">
            <IconTicket size={15} />
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#FAFAFA' }}>
              Solicitar turno
            </div>
            <div style={{ fontSize: 12, color: '#71717A', marginTop: 1 }}>
              Ingresa a la fila de espera para ser atendido
            </div>
          </div>
        </div>

        <div className="card-divider" />

        {/* Priority row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
          }}
        >
          <div>
            <div className="micro-label">Tu prioridad asignada</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6 }}>
              <Dot color="amber" />
              <span style={{ fontSize: 12, color: '#A1A1AA' }}>
                Media — antes que Estándar
              </span>
            </div>
          </div>
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <div
              style={{
                ...mono,
                fontSize: 22,
                fontWeight: 600,
                color: '#3B82F6',
                letterSpacing: '-0.03em',
              }}
            >
              ~#5
            </div>
            <div style={{ fontSize: 10, color: '#52525B' }}>
              posición estimada
            </div>
          </div>
        </div>

        <div className="card-divider" />

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <span style={{ color: '#52525B', display: 'flex' }}><IconClock size={13} /></span>
          <span style={{ fontSize: 11, color: '#52525B' }}>Tiempo estimado: ~15 min</span>
        </div>

        <RequestButton onNavigate={onNavigate} />
      </div>
    </div>
  );
}

function RequestButton({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      className="btn-primary"
      style={{
        background: hovered
          ? 'linear-gradient(180deg, #2563EB 0%, #1D4ED8 100%)'
          : 'linear-gradient(180deg, #3B82F6 0%, #2563EB 100%)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onNavigate('miturno')}
    >
      Solicitar mi turno
    </button>
  );
}

