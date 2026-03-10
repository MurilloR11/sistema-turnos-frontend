import { useTurnos } from '../hooks/useTurnos';
import './TurnosList.css';

interface TurnosListProps {
  doctorId?: string;
  date?: string;
}

export function TurnosList({ doctorId, date }: TurnosListProps) {
  const { turnos, loading, updateTurno, cancelTurno } = useTurnos(doctorId, date);

  const getEstadoBadgeClass = (estado: string) => {
    switch (estado) {
      case 'confirmado':
        return 'badge-confirmado';
      case 'pendiente':
        return 'badge-pendiente';
      case 'cancelado':
        return 'badge-cancelado';
      default:
        return '';
    }
  };

  const formatearFecha = (fecha: string) => {
    const date = new Date(fecha + 'T00:00:00');
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="turnos-loading">
        <div className="spinner"></div>
        <p>Cargando turnos...</p>
      </div>
    );
  }

  return (
    <div className="turnos-list">
      <div className="turnos-header">
        <h2>Turnos Programados ({turnos.length})</h2>
        <span className="real-time-badge">🔴 EN VIVO</span>
      </div>

      {turnos.length === 0 ? (
        <div className="no-turnos">
          <span className="no-turnos-icon">📋</span>
          <h3>No hay turnos programados</h3>
          <p>Los nuevos turnos aparecerán aquí en tiempo real</p>
        </div>
      ) : (
        <div className="turnos-grid">
          {turnos.map((turno) => (
            <div key={turno.id} className={`turno-card ${turno.estado}`}>
              <div className="turno-header">
                <div className="turno-id">#{turno.id}</div>
                <span className={`badge ${getEstadoBadgeClass(turno.estado)}`}>
                  {turno.estado.toUpperCase()}
                </span>
              </div>

              <div className="turno-body">
                <div className="turno-info-row">
                  <span className="icon">👤</span>
                  <div>
                    <p className="label">Paciente</p>
                    <p className="value">{turno.paciente}</p>
                  </div>
                </div>

                <div className="turno-info-row">
                  <span className="icon">👨‍⚕️</span>
                  <div>
                    <p className="label">Doctor</p>
                    <p className="value">{turno.doctor}</p>
                    <p className="especialidad">{turno.especialidad}</p>
                  </div>
                </div>

                <div className="turno-datetime">
                  <div className="turno-info-row">
                    <span className="icon">📅</span>
                    <div>
                      <p className="label">Fecha</p>
                      <p className="value">{formatearFecha(turno.fecha)}</p>
                    </div>
                  </div>
                  <div className="turno-info-row">
                    <span className="icon">🕐</span>
                    <div>
                      <p className="label">Hora</p>
                      <p className="value">{turno.hora}</p>
                    </div>
                  </div>
                </div>
              </div>

              {turno.estado !== 'cancelado' && (
                <div className="turno-actions">
                  {turno.estado === 'pendiente' && (
                    <button
                      onClick={() => updateTurno(turno.id, { estado: 'confirmado' })}
                      className="btn-confirmar"
                    >
                      ✅ Confirmar
                    </button>
                  )}
                  <button
                    onClick={() => cancelTurno(turno.id)}
                    className="btn-cancelar"
                  >
                    ❌ Cancelar
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
