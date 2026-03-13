import { StatCard } from '../ui/StatCard';
import { Dot } from '../ui/Dot';
import { IconTicket, IconClock } from '../ui/icons';
import { useUser } from '../../context/UserContext';
import type { Screen } from '../Sidebar';

interface InicioProps {
  onNavigate: (screen: Screen) => void;
}

const estadoInfo: Record<string, { label: string; dotColor: 'amber' | 'green' | 'red'; priority: string; accentCard: 'blue' | 'green' | 'amber' }> = {
  normal:            { label: 'Normal',          dotColor: 'green', priority: 'Prioridad estándar', accentCard: 'green' },
  embarazada:        { label: 'Embarazada',       dotColor: 'amber', priority: 'Prioridad media',    accentCard: 'amber' },
  adulto_mayor:      { label: 'Adulto mayor',     dotColor: 'amber', priority: 'Prioridad media',    accentCard: 'amber' },
  'discapacitado/a': { label: 'Discapacitado/a',  dotColor: 'amber', priority: 'Prioridad media',    accentCard: 'amber' },
};

export function Inicio({ onNavigate }: InicioProps) {
  const { estado } = useUser();
  const info = (estado && estadoInfo[estado]) ?? estadoInfo.normal;

  return (
    <div>
      <h1 className="screen-title">Inicio</h1>
      <p className="screen-subtitle">Resumen de actividad del sistema de turnos</p>

      {/* Stat grid — 4 cols desktop, 2 tablet, 1 mobile */}
      <div className="stat-grid">
        <StatCard label="Tu posición" accent="blue">
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 5, marginTop: 6 }}>
            <span className="mono" style={{ fontSize: 26, fontWeight: 600, color: '#FAFAFA', letterSpacing: '-0.04em' }}>
              #5
            </span>
            <span style={{ fontSize: 11, color: '#52525B' }}>de 12</span>
          </div>
        </StatCard>

        <StatCard label="En espera ahora" accent="green">
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 5, marginTop: 6 }}>
            <span className="mono" style={{ fontSize: 26, fontWeight: 600, color: '#FAFAFA', letterSpacing: '-0.04em' }}>
              12
            </span>
            <span style={{ fontSize: 11, color: '#52525B' }}>personas</span>
          </div>
        </StatCard>

        <StatCard label="Tu estado" accent={info.accentCard}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginTop: 6 }}>
            <Dot color={info.dotColor} />
            <span style={{ fontSize: 13, fontWeight: 500, color: '#FAFAFA' }}>
              {info.label}
            </span>
          </div>
          <div style={{ fontSize: 11, color: '#52525B', marginTop: 5, paddingLeft: 13 }}>
            {info.priority}
          </div>
        </StatCard>

        <StatCard label="Turno activo">
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginTop: 6 }}>
            <span style={{ color: '#3F3F46', display: 'flex' }}>
              <IconTicket size={14} />
            </span>
            <span style={{ fontSize: 13, color: '#3F3F46' }}>Sin turno activo</span>
          </div>
        </StatCard>
      </div>

      {/* Request card */}
      <div className="main-card" style={{ maxWidth: 'min(520px, 100%)', marginTop: 24 }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div className="icon-box icon-box--blue">
            <IconTicket size={15} />
          </div>
          <div>
            <div className="card-header-title">Solicitar turno</div>
            <div className="card-header-sub">Ingresa a la fila de espera para ser atendido</div>
          </div>
        </div>

        <div className="card-divider" />

        {/* Priority row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          <div>
            <div className="micro-label" style={{ marginBottom: 8 }}>Tu prioridad asignada</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Dot color={info.dotColor} />
              <span style={{ fontSize: 12, color: '#A0A0AB' }}>
                {info.priority} — {info.label}
              </span>
            </div>
          </div>
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <div className="mono" style={{ fontSize: 22, fontWeight: 600, color: '#3B82F6', letterSpacing: '-0.04em' }}>
              ~#5
            </div>
            <div style={{ fontSize: 10, color: '#52525B', marginTop: 2 }}>posición estimada</div>
          </div>
        </div>

        <div className="card-divider" />

        <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 16 }}>
          <span style={{ color: '#52525B', display: 'flex' }}><IconClock size={13} /></span>
          <span style={{ fontSize: 11, color: '#52525B' }}>Tiempo estimado de espera: ~15 min</span>
        </div>

        {/* Fix: navigate to 'solicitar', not 'miturno' */}
        <button className="btn-primary" onClick={() => onNavigate('solicitar')}>
          Solicitar mi turno
        </button>
      </div>
    </div>
  );
}
