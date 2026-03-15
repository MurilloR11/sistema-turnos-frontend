import { useState, useEffect } from 'react';

// ── Tipos ─────────────────────────────────────────────────────────────────────
interface TurnoReciente {
  numero: string;
  nombre: string;
  hora: string;
  duracion: number;
  prioridad: 'alta' | 'media' | 'estandar';
}

interface HourBar {
  hora: string;
  cantidad: number;
}

// ── Mock data ─────────────────────────────────────────────────────────────────
const horasData: HourBar[] = [
  { hora: '08', cantidad: 4 },
  { hora: '09', cantidad: 11 },
  { hora: '10', cantidad: 18 },
  { hora: '11', cantidad: 22 },
  { hora: '12', cantidad: 15 },
  { hora: '13', cantidad: 8 },
  { hora: '14', cantidad: 19 },
  { hora: '15', cantidad: 24 },
  { hora: '16', cantidad: 14 },
  { hora: '17', cantidad: 6 },
];

const turnosRecientes: TurnoReciente[] = [
  { numero: 'T-051', nombre: 'María González',    hora: '15:42', duracion: 8,  prioridad: 'media' },
  { numero: 'T-050', nombre: 'Carlos Rodríguez',  hora: '15:31', duracion: 12, prioridad: 'alta' },
  { numero: 'T-049', nombre: 'Ana Martínez',      hora: '15:18', duracion: 6,  prioridad: 'estandar' },
  { numero: 'T-048', nombre: 'Jorge Ramírez',     hora: '15:05', duracion: 9,  prioridad: 'estandar' },
  { numero: 'T-047', nombre: 'Lucía Fernández',   hora: '14:54', duracion: 15, prioridad: 'alta' },
];

// ── Iconos ────────────────────────────────────────────────────────────────────
const sv = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

function IconUsers()  { return <svg width={15} height={15} viewBox="0 0 24 24" {...sv}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>; }
function IconCheck()  { return <svg width={15} height={15} viewBox="0 0 24 24" {...sv}><polyline points="20 6 9 17 4 12"/></svg>; }
function IconX()      { return <svg width={15} height={15} viewBox="0 0 24 24" {...sv}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>; }
function IconClock()  { return <svg width={15} height={15} viewBox="0 0 24 24" {...sv}><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 15"/></svg>; }

// ── Helpers ───────────────────────────────────────────────────────────────────
function prioLabel(p: TurnoReciente['prioridad']) {
  if (p === 'alta')     return { label: 'Alta',     cls: 'badge badge--red' };
  if (p === 'media')    return { label: 'Media',    cls: 'badge badge--amber' };
  return                       { label: 'Estándar', cls: 'badge badge--neutral' };
}

// ── Componente ────────────────────────────────────────────────────────────────
export function AdminDashboard() {
  const [enEspera,   setEnEspera]   = useState(8);
  const [atendidos,  setAtendidos]  = useState(47);
  const [cancelados] = useState(3);
  const [promEspera, setPromEspera] = useState(12);

  // Simular actualizaciones en tiempo real
  useEffect(() => {
    const id = setInterval(() => {
      setEnEspera((n)  => Math.max(0, n + (Math.random() > 0.6 ? 1 : Math.random() > 0.5 ? -1 : 0)));
      setAtendidos((n) => Math.random() > 0.7 ? n + 1 : n);
      setPromEspera((n) => {
        const delta = (Math.random() - 0.5) * 2;
        return Math.max(5, Math.round(n + delta));
      });
    }, 4000);
    return () => clearInterval(id);
  }, []);

  const maxBar = Math.max(...horasData.map((h) => h.cantidad));

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
        <div>
          <h1 className="screen-title">Dashboard</h1>
          <p className="screen-subtitle">Resumen en tiempo real del sistema</p>
        </div>

      </div>

      {/* Stat cards */}
      <div className="stat-grid">
        {/* En espera */}
        <div className="stat-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <span className="micro-label">En espera</span>
            <div className="icon-box icon-box--blue"><IconUsers /></div>
          </div>
          <div className="mono" style={{ fontSize: 30, fontWeight: 600, color: '#FAFAFA', letterSpacing: '-0.04em', lineHeight: 1 }}>
            {enEspera}
          </div>
          <div style={{ fontSize: 11, color: '#52525B', marginTop: 6 }}>personas en fila ahora</div>
        </div>

        {/* Atendidos hoy */}
        <div className="stat-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <span className="micro-label">Atendidos hoy</span>
            <div className="icon-box icon-box--green"><IconCheck /></div>
          </div>
          <div className="mono" style={{ fontSize: 30, fontWeight: 600, color: '#FAFAFA', letterSpacing: '-0.04em', lineHeight: 1 }}>
            {atendidos}
          </div>
          <div style={{ fontSize: 11, color: '#52525B', marginTop: 6 }}>turnos completados</div>
        </div>

        {/* Cancelados */}
        <div className="stat-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <span className="micro-label">Cancelados</span>
            <div className="icon-box icon-box--red"><IconX /></div>
          </div>
          <div className="mono" style={{ fontSize: 30, fontWeight: 600, color: '#FAFAFA', letterSpacing: '-0.04em', lineHeight: 1 }}>
            {cancelados}
          </div>
          <div style={{ fontSize: 11, color: '#52525B', marginTop: 6 }}>ausentes / cancelados</div>
        </div>

        {/* Tiempo promedio */}
        <div className="stat-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <span className="micro-label">Prom. espera</span>
            <div className="icon-box icon-box--amber"><IconClock /></div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
            <span className="mono" style={{ fontSize: 30, fontWeight: 600, color: '#FAFAFA', letterSpacing: '-0.04em', lineHeight: 1 }}>
              {promEspera}
            </span>
            <span style={{ fontSize: 13, color: '#52525B' }}>min</span>
          </div>
          <div style={{ fontSize: 11, color: '#52525B', marginTop: 6 }}>tiempo promedio de espera</div>
        </div>
      </div>

      {/* Segunda fila: gráfico + últimos turnos */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0,1fr) 340px',
          gap: 16,
          marginTop: 16,
        }}
      >
        {/* Gráfico de barras SVG */}
        <div className="main-card">
          <div style={{ marginBottom: 16 }}>
            <div className="card-header-title">Turnos por hora</div>
            <div className="card-header-sub">Distribución de turnos atendidos durante el día</div>
          </div>

          <div style={{ width: '100%', overflowX: 'auto' }}>
            <svg
              width="100%"
              viewBox={`0 0 ${horasData.length * 52} 130`}
              preserveAspectRatio="none"
              style={{ display: 'block', minWidth: 380 }}
            >
              {/* Líneas de guía */}
              {[0, 25, 50, 75, 100].map((pct) => {
                const y = 100 - (pct / 100) * 90;
                return (
                  <line
                    key={pct}
                    x1={0} y1={y}
                    x2={horasData.length * 52} y2={y}
                    stroke="#1E1E23"
                    strokeWidth={1}
                  />
                );
              })}

              {/* Barras */}
              {horasData.map((h, i) => {
                const barH = (h.cantidad / maxBar) * 90;
                const x    = i * 52 + 8;
                const y    = 100 - barH;
                const isHigh = h.cantidad === maxBar;
                return (
                  <g key={h.hora}>
                    <rect
                      x={x} y={y}
                      width={36} height={barH}
                      rx={3}
                      fill={isHigh ? '#3B82F6' : '#1E1E2E'}
                      stroke={isHigh ? '#2563EB' : '#27272A'}
                      strokeWidth={1}
                    />
                    {/* Valor */}
                    <text
                      x={x + 18} y={y - 5}
                      textAnchor="middle"
                      fontSize={9}
                      fill={isHigh ? '#3B82F6' : '#52525B'}
                      fontFamily="'Geist Mono', monospace"
                    >
                      {h.cantidad}
                    </text>
                    {/* Hora */}
                    <text
                      x={x + 18} y={118}
                      textAnchor="middle"
                      fontSize={9}
                      fill="#52525B"
                      fontFamily="'Inter', sans-serif"
                    >
                      {h.hora}h
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Últimos 5 turnos atendidos */}
        <div className="main-card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ marginBottom: 14 }}>
            <div className="card-header-title">Últimos atendidos</div>
            <div className="card-header-sub">5 turnos más recientes</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0, flex: 1 }}>
            {turnosRecientes.map((t, i) => {
              const prio = prioLabel(t.prioridad);
              return (
                <div
                  key={t.numero}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '10px 0',
                    borderBottom: i < turnosRecientes.length - 1 ? '1px solid #1E1E23' : 'none',
                  }}
                >
                  <span
                    className="mono"
                    style={{ fontSize: 11, color: '#3B82F6', minWidth: 38, fontWeight: 600 }}
                  >
                    {t.numero}
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 500,
                        color: '#FAFAFA',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {t.nombre}
                    </div>
                    <div style={{ fontSize: 10, color: '#52525B', marginTop: 2 }}>
                      {t.hora} · {t.duracion} min
                    </div>
                  </div>
                  <span className={prio.cls} style={{ fontSize: 9, padding: '2px 6px' }}>
                    {prio.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Tasa del día */}
          <div
            style={{
              marginTop: 14,
              paddingTop: 14,
              borderTop: '1px solid #1E1E23',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span style={{ fontSize: 11, color: '#52525B' }}>Tasa de atención</span>
            <span className="mono" style={{ fontSize: 13, fontWeight: 600, color: '#22C55E' }}>
              {Math.round((atendidos / (atendidos + cancelados)) * 100)}%
            </span>
          </div>
        </div>
      </div>

      {/* Responsive fix para la segunda fila */}
      <style>{`
        @media (max-width: 960px) {
          .dashboard-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
