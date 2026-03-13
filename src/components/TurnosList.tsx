import { useTurnos } from '../hooks/useTurnos';
import { IconTicket, IconClock } from './ui/icons';
import { Dot } from './ui/Dot';
import { PulseDot } from './ui/PulseDot';
import './TurnosList.css';

interface TurnosListProps {
  doctorId?: string;
  date?: string;
}

function estadoToColor(estado: string): 'green' | 'amber' | 'red' {
  if (estado === 'confirmado') return 'green';
  if (estado === 'cancelado')  return 'red';
  return 'amber';
}

function estadoLabel(estado: string): string {
  if (estado === 'confirmado') return 'Confirmado';
  if (estado === 'cancelado')  return 'Cancelado';
  return 'Pendiente';
}

function formatearFecha(fecha: string) {
  return new Date(fecha + 'T00:00:00').toLocaleDateString('es-ES', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
}

export function TurnosList({ doctorId, date }: TurnosListProps) {
  const { turnos, loading, updateTurno, cancelTurno } = useTurnos(doctorId, date);

  if (loading) {
    return (
      <div className="tl-loading">
        <div className="tl-spinner" />
        <span style={{ fontSize: 13, color: '#52525B', marginTop: 12 }}>Cargando turnos...</span>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="tl-header">
        <div>
          <h2 className="screen-title">Turnos programados</h2>
          <p className="screen-subtitle">{turnos.length} turno{turnos.length !== 1 ? 's' : ''} registrado{turnos.length !== 1 ? 's' : ''}</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <PulseDot />
          <span style={{ fontSize: 11, color: '#52525B' }}>En vivo</span>
        </div>
      </div>

      {/* Empty state */}
      {turnos.length === 0 ? (
        <div className="tl-empty">
          <div className="tl-empty-icon">
            <IconTicket size={20} />
          </div>
          <div style={{ fontSize: 14, fontWeight: 500, color: '#3F3F46', marginTop: 14 }}>
            No hay turnos programados
          </div>
          <div style={{ fontSize: 12, color: '#52525B', marginTop: 4 }}>
            Los nuevos turnos aparecerán aquí en tiempo real
          </div>
        </div>
      ) : (
        <div className="tl-grid">
          {turnos.map((turno) => (
            <div key={turno.id} className={`tl-card tl-card--${turno.estado}`}>
              {/* Card header */}
              <div className="tl-card-head">
                <span className="mono" style={{ fontSize: 12, fontWeight: 600, color: '#52525B' }}>
                  #{turno.id}
                </span>
                <span className={`badge badge--${turno.estado === 'confirmado' ? 'green' : turno.estado === 'cancelado' ? 'red' : 'amber'}`}>
                  <Dot color={estadoToColor(turno.estado)} />
                  {estadoLabel(turno.estado)}
                </span>
              </div>

              <div className="card-divider" style={{ margin: '12px 0' }} />

              {/* Paciente & doctor */}
              <div className="tl-info-rows">
                <div className="tl-row">
                  <div className="tl-row-icon">
                    <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <div>
                    <div className="micro-label" style={{ marginBottom: 2 }}>Paciente</div>
                    <div style={{ fontSize: 13, fontWeight: 500, color: '#FAFAFA' }}>{turno.paciente}</div>
                  </div>
                </div>

                <div className="tl-row">
                  <div className="tl-row-icon">
                    <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  </div>
                  <div>
                    <div className="micro-label" style={{ marginBottom: 2 }}>Doctor</div>
                    <div style={{ fontSize: 13, fontWeight: 500, color: '#FAFAFA' }}>{turno.doctor}</div>
                    <div style={{ fontSize: 11, color: '#52525B', marginTop: 1 }}>{turno.especialidad}</div>
                  </div>
                </div>
              </div>

              {/* Date & time */}
              <div className="tl-datetime">
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ color: '#52525B', display: 'flex' }}>
                    <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                  </span>
                  <span style={{ fontSize: 12, color: '#A0A0AB' }}>{formatearFecha(turno.fecha)}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ color: '#52525B', display: 'flex' }}><IconClock size={12} /></span>
                  <span className="mono" style={{ fontSize: 12, color: '#A0A0AB' }}>{turno.hora}</span>
                </div>
              </div>

              {/* Actions */}
              {turno.estado !== 'cancelado' && (
                <div className="tl-actions">
                  {turno.estado === 'pendiente' && (
                    <button
                      className="tl-btn tl-btn--confirm"
                      onClick={() => updateTurno(turno.id, { estado: 'confirmado' })}
                    >
                      Confirmar
                    </button>
                  )}
                  <button
                    className="tl-btn tl-btn--cancel"
                    onClick={() => cancelTurno(turno.id)}
                  >
                    Cancelar
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
