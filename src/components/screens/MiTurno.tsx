import { useState } from 'react';
import { Dot } from '../ui/Dot';
import { PulseDot } from '../ui/PulseDot';
import { InfoCard } from '../ui/InfoCard';
import { IconClock, IconZap, IconTicket } from '../ui/icons';

const mono = { fontFamily: "'Geist Mono', 'Courier New', monospace" };

function CancelButton() {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      className="btn-outline-danger"
      style={{
        background: hovered ? 'rgba(239,68,68,0.06)' : 'transparent',
        borderColor: hovered ? '#EF4444' : '#27272A',
        color: hovered ? '#EF4444' : '#71717A',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      Cancelar mi turno
    </button>
  );
}

export function MiTurno() {
  return (
    <div>
      <h1
        style={{
          fontSize: 18,
          fontWeight: 600,
          color: '#FAFAFA',
          letterSpacing: '-0.02em',
          margin: 0,
        }}
      >
        Mi Turno
      </h1>
      <p style={{ fontSize: 13, color: '#71717A', marginTop: 4 }}>
        Estado actual de tu posición en la fila
      </p>

      <div className="queue-grid">
        {/* Main turno card */}
        <div className="main-card">
          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div className="icon-box icon-box--blue">
                <IconTicket size={13} />
              </div>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: '#71717A',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                }}
              >
                Turno activo
              </span>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                background: 'rgba(245,158,11,0.06)',
                border: '1px solid rgba(245,158,11,0.12)',
                borderRadius: 999,
                padding: '3px 10px 3px 8px',
              }}
            >
              <Dot color="amber" />
              <span style={{ fontSize: 11, fontWeight: 500, color: '#F59E0B' }}>Pendiente</span>
            </div>
          </div>

          {/* Position block */}
          <div style={{ marginTop: 20, marginBottom: 20 }}>
            <div
              style={{
                ...mono,
                fontSize: 48,
                fontWeight: 600,
                color: '#FAFAFA',
                letterSpacing: '-3px',
                lineHeight: 1,
              }}
            >
              #5
            </div>
            <div style={{ fontSize: 12, color: '#52525B', marginTop: 8 }}>
              Tu posición actual en la fila
            </div>
          </div>

          <div className="card-divider" />

          {/* Info grid 2×2 */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 20,
            }}
          >
            <div className="info-cell">
              <div className="micro-label">Hora de solicitud</div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  marginTop: 6,
                }}
              >
                <span style={{ color: '#52525B', display: 'flex' }}><IconClock size={13} /></span>
                <span style={{ ...mono, fontSize: 13, fontWeight: 500, color: '#FAFAFA' }}>
                  08:17 a.m.
                </span>
              </div>
            </div>

            <div className="info-cell">
              <div className="micro-label">Personas antes</div>
              <div style={{ fontSize: 13, fontWeight: 500, color: '#FAFAFA', marginTop: 6 }}>
                4 personas
              </div>
            </div>

            <div className="info-cell">
              <div className="micro-label">Tu estado</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6 }}>
                <Dot color="amber" />
                <span style={{ fontSize: 13, fontWeight: 500, color: '#FAFAFA' }}>Embarazada</span>
              </div>
            </div>

            <div className="info-cell">
              <div className="micro-label">Posición en fila</div>
              <div style={{ ...mono, fontSize: 13, fontWeight: 500, color: '#FAFAFA', marginTop: 6 }}>
                #5 de 12
              </div>
            </div>
          </div>

          <div className="card-divider" />

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <PulseDot />
            <span style={{ fontSize: 12, color: '#52525B' }}>
              Actualizando en tiempo real
            </span>
          </div>
        </div>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <InfoCard title="Prioridad">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div className="icon-box icon-box--amber" style={{ width: 36, height: 36 }}>
                <IconZap size={15} />
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#FAFAFA' }}>
                  Media
                </div>
                <div style={{ fontSize: 11, color: '#52525B', marginTop: 2 }}>
                  Antes que Estándar
                </div>
              </div>
            </div>
          </InfoCard>

          <InfoCard title="Acciones">
            <CancelButton />
          </InfoCard>
        </div>
      </div>
    </div>
  );
}
