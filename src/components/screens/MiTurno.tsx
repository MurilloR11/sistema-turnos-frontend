import { Dot } from '../ui/Dot';
import { PulseDot } from '../ui/PulseDot';
import { InfoCard } from '../ui/InfoCard';
import { IconClock, IconZap, IconTicket } from '../ui/icons';
import { useUser } from '../../context/UserContext';

const estadoInfo: Record<string, { label: string; dotColor: 'amber' | 'green' | 'red'; priority: string; priorityDesc: string }> = {
  normal:            { label: 'Normal',         dotColor: 'green', priority: 'Estándar', priorityDesc: 'Cola general' },
  embarazada:        { label: 'Embarazada',      dotColor: 'amber', priority: 'Media',    priorityDesc: 'Antes que Estándar' },
  adulto_mayor:      { label: 'Adulto mayor',    dotColor: 'amber', priority: 'Media',    priorityDesc: 'Antes que Estándar' },
  'discapacitado/a': { label: 'Discapacitado/a', dotColor: 'amber', priority: 'Media',    priorityDesc: 'Antes que Estándar' },
};

export function MiTurno() {
  const { estado } = useUser();
  const info = (estado && estadoInfo[estado]) ?? estadoInfo.normal;

  return (
    <div>
      <h1 className="screen-title">Mi Turno</h1>
      <p className="screen-subtitle">Estado actual de tu posición en la fila</p>

      <div className="queue-grid">
        {/* ── Main turno card ── */}
        <div className="main-card">
          {/* Header row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
                  letterSpacing: '0.07em',
                }}
              >
                Turno activo
              </span>
            </div>

            <span className="badge badge--amber">
              <Dot color="amber" />
              Pendiente
            </span>
          </div>

          {/* Large position number */}
          <div style={{ margin: '22px 0 20px' }}>
            <div
              className="mono"
              style={{
                fontSize: 52,
                fontWeight: 600,
                color: '#FAFAFA',
                letterSpacing: '-4px',
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
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div className="info-cell">
              <div className="micro-label">Hora de solicitud</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ color: '#52525B', display: 'flex' }}><IconClock size={13} /></span>
                <span className="mono" style={{ fontSize: 13, fontWeight: 500, color: '#FAFAFA' }}>
                  08:17 a.m.
                </span>
              </div>
            </div>

            <div className="info-cell">
              <div className="micro-label">Personas antes</div>
              <div style={{ fontSize: 13, fontWeight: 500, color: '#FAFAFA' }}>
                4 personas
              </div>
            </div>

            <div className="info-cell">
              <div className="micro-label">Tu estado</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Dot color={info.dotColor} />
                <span style={{ fontSize: 13, fontWeight: 500, color: '#FAFAFA' }}>
                  {info.label}
                </span>
              </div>
            </div>

            <div className="info-cell">
              <div className="micro-label">Tiempo estimado</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ color: '#52525B', display: 'flex' }}><IconClock size={13} /></span>
                <span style={{ fontSize: 13, fontWeight: 500, color: '#FAFAFA' }}>~15 min</span>
              </div>
            </div>
          </div>

          <div className="card-divider" />

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <PulseDot />
            <span style={{ fontSize: 12, color: '#52525B' }}>Actualizando en tiempo real</span>
          </div>
        </div>

        {/* ── Right column ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <InfoCard title="Prioridad">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div className="icon-box icon-box--amber" style={{ width: 36, height: 36 }}>
                <IconZap size={15} />
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#FAFAFA' }}>{info.priority}</div>
                <div style={{ fontSize: 11, color: '#52525B', marginTop: 3 }}>{info.priorityDesc}</div>
              </div>
            </div>
          </InfoCard>

          <InfoCard title="Acciones">
            <button className="btn-outline-danger">
              Cancelar mi turno
            </button>
          </InfoCard>
        </div>
      </div>
    </div>
  );
}
