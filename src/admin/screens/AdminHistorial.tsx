import { useState, useMemo } from 'react';

// ── Tipos ─────────────────────────────────────────────────────────────────────
type EstadoH  = 'atendido' | 'cancelado' | 'ausente';
type PrioH    = 'alta' | 'media' | 'estandar';

interface TurnoHistorial {
  id: string;
  numero: string;
  nombre: string;
  estado: EstadoH;
  prioridad: PrioH;
  horaIngreso: string;
  horaAtencion: string | null;
  duracion: number | null;
}

// ── Mock data (25 registros) ──────────────────────────────────────────────────
const mockHistorial: TurnoHistorial[] = [
  { id:  '1', numero: 'T-001', nombre: 'Ana Ramírez',        estado: 'atendido',  prioridad: 'alta',     horaIngreso: '08:05', horaAtencion: '08:09', duracion: 11 },
  { id:  '2', numero: 'T-002', nombre: 'Luis Pérez',         estado: 'atendido',  prioridad: 'estandar', horaIngreso: '08:10', horaAtencion: '08:22', duracion: 8  },
  { id:  '3', numero: 'T-003', nombre: 'Carmen Vega',        estado: 'cancelado', prioridad: 'estandar', horaIngreso: '08:15', horaAtencion: null,    duracion: null },
  { id:  '4', numero: 'T-004', nombre: 'Roberto Soto',       estado: 'atendido',  prioridad: 'media',    horaIngreso: '08:18', horaAtencion: '08:32', duracion: 14 },
  { id:  '5', numero: 'T-005', nombre: 'Marta Jiménez',      estado: 'atendido',  prioridad: 'alta',     horaIngreso: '08:21', horaAtencion: '08:28', duracion: 7  },
  { id:  '6', numero: 'T-006', nombre: 'Pablo Torres',       estado: 'ausente',   prioridad: 'estandar', horaIngreso: '08:30', horaAtencion: null,    duracion: null },
  { id:  '7', numero: 'T-007', nombre: 'Sandra Núñez',       estado: 'atendido',  prioridad: 'estandar', horaIngreso: '08:33', horaAtencion: '08:47', duracion: 10 },
  { id:  '8', numero: 'T-008', nombre: 'Héctor Moreno',      estado: 'atendido',  prioridad: 'media',    horaIngreso: '08:45', horaAtencion: '08:59', duracion: 9  },
  { id:  '9', numero: 'T-009', nombre: 'Elena Castro',       estado: 'atendido',  prioridad: 'alta',     horaIngreso: '08:50', horaAtencion: '08:56', duracion: 12 },
  { id: '10', numero: 'T-010', nombre: 'Diego Flores',       estado: 'cancelado', prioridad: 'estandar', horaIngreso: '09:00', horaAtencion: null,    duracion: null },
  { id: '11', numero: 'T-011', nombre: 'Rosa Mendoza',       estado: 'atendido',  prioridad: 'media',    horaIngreso: '09:05', horaAtencion: '09:18', duracion: 11 },
  { id: '12', numero: 'T-012', nombre: 'Javier Lara',        estado: 'atendido',  prioridad: 'estandar', horaIngreso: '09:12', horaAtencion: '09:25', duracion: 8  },
  { id: '13', numero: 'T-013', nombre: 'Sofía Rojas',        estado: 'atendido',  prioridad: 'alta',     horaIngreso: '09:20', horaAtencion: '09:27', duracion: 6  },
  { id: '14', numero: 'T-014', nombre: 'Marcos Suárez',      estado: 'ausente',   prioridad: 'estandar', horaIngreso: '09:25', horaAtencion: null,    duracion: null },
  { id: '15', numero: 'T-015', nombre: 'Gabriela Ortiz',     estado: 'atendido',  prioridad: 'media',    horaIngreso: '09:30', horaAtencion: '09:44', duracion: 13 },
  { id: '16', numero: 'T-016', nombre: 'Nicolás Espinoza',   estado: 'atendido',  prioridad: 'estandar', horaIngreso: '09:35', horaAtencion: '09:50', duracion: 9  },
  { id: '17', numero: 'T-017', nombre: 'Valeria Cárdenas',   estado: 'cancelado', prioridad: 'media',    horaIngreso: '09:40', horaAtencion: null,    duracion: null },
  { id: '18', numero: 'T-018', nombre: 'Rodrigo Salinas',    estado: 'atendido',  prioridad: 'estandar', horaIngreso: '09:48', horaAtencion: '10:02', duracion: 10 },
  { id: '19', numero: 'T-019', nombre: 'Camila Herrera',     estado: 'atendido',  prioridad: 'alta',     horaIngreso: '09:55', horaAtencion: '10:01', duracion: 8  },
  { id: '20', numero: 'T-020', nombre: 'Ignacio Vera',       estado: 'atendido',  prioridad: 'estandar', horaIngreso: '10:00', horaAtencion: '10:15', duracion: 11 },
  { id: '21', numero: 'T-021', nombre: 'Daniela Fuentes',    estado: 'atendido',  prioridad: 'media',    horaIngreso: '10:10', horaAtencion: '10:24', duracion: 7  },
  { id: '22', numero: 'T-022', nombre: 'Sebastián Reyes',    estado: 'ausente',   prioridad: 'estandar', horaIngreso: '10:15', horaAtencion: null,    duracion: null },
  { id: '23', numero: 'T-023', nombre: 'Fernanda Muñoz',     estado: 'atendido',  prioridad: 'estandar', horaIngreso: '10:22', horaAtencion: '10:36', duracion: 9  },
  { id: '24', numero: 'T-024', nombre: 'Tomás Araya',        estado: 'atendido',  prioridad: 'alta',     horaIngreso: '10:28', horaAtencion: '10:33', duracion: 14 },
  { id: '25', numero: 'T-025', nombre: 'Catalina Pizarro',   estado: 'cancelado', prioridad: 'estandar', horaIngreso: '10:35', horaAtencion: null,    duracion: null },
];

const PAGE_SIZE = 10;

// ── Iconos ────────────────────────────────────────────────────────────────────
const sv = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.75, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
function IconDownload() { return <svg width={14} height={14} viewBox="0 0 24 24" {...sv}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>; }
function IconChevL()    { return <svg width={14} height={14} viewBox="0 0 24 24" {...sv}><polyline points="15 18 9 12 15 6"/></svg>; }
function IconChevR()    { return <svg width={14} height={14} viewBox="0 0 24 24" {...sv}><polyline points="9 18 15 12 9 6"/></svg>; }

// ── Helpers ───────────────────────────────────────────────────────────────────
function estadoBadge(e: EstadoH) {
  if (e === 'atendido')  return { label: 'Atendido',  cls: 'badge badge--green' };
  if (e === 'cancelado') return { label: 'Cancelado', cls: 'badge badge--red' };
  return                        { label: 'Ausente',   cls: 'badge badge--amber' };
}

function prioBadge(p: PrioH) {
  if (p === 'alta')  return { label: 'Alta',     cls: 'badge badge--red' };
  if (p === 'media') return { label: 'Media',    cls: 'badge badge--amber' };
  return                    { label: 'Estándar', cls: 'badge badge--neutral' };
}

function exportarCSV(datos: TurnoHistorial[]) {
  const header = 'Numero,Nombre,Estado,Prioridad,Ingreso,Atencion,Duracion\n';
  const rows = datos.map((t) =>
    `${t.numero},"${t.nombre}",${t.estado},${t.prioridad},${t.horaIngreso},${t.horaAtencion ?? '—'},${t.duracion != null ? t.duracion + 'min' : '—'}`
  ).join('\n');
  const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url;
  a.download = 'historial.csv';
  a.click();
  URL.revokeObjectURL(url);
}

// ── Componente ────────────────────────────────────────────────────────────────
export function AdminHistorial() {
  const [filtroEstado, setFiltroEstado] = useState<'todos' | EstadoH>('todos');
  const [filtroPrio,   setFiltroPrio]   = useState<'todos' | PrioH>('todos');
  const [pagina, setPagina]             = useState(1);
  const [hoverId, setHoverId]           = useState<string | null>(null);

  const datos = useMemo(() => {
    return mockHistorial.filter((t) => {
      const okEstado = filtroEstado === 'todos' || t.estado === filtroEstado;
      const okPrio   = filtroPrio   === 'todos' || t.prioridad === filtroPrio;
      return okEstado && okPrio;
    });
  }, [filtroEstado, filtroPrio]);

  const totalPaginas = Math.ceil(datos.length / PAGE_SIZE);
  const pageDatos    = datos.slice((pagina - 1) * PAGE_SIZE, pagina * PAGE_SIZE);

  const totalAtendidos  = mockHistorial.filter((t) => t.estado === 'atendido').length;
  const totalCancelados = mockHistorial.filter((t) => t.estado !== 'atendido').length;
  const tasaAtencion    = Math.round((totalAtendidos / mockHistorial.length) * 100);
  const duraciones      = mockHistorial.filter((t) => t.duracion).map((t) => t.duracion!);
  const promDuracion    = duraciones.length
    ? Math.round(duraciones.reduce((a, b) => a + b, 0) / duraciones.length)
    : 0;

  const handleFiltroEstado = (v: typeof filtroEstado) => { setFiltroEstado(v); setPagina(1); };
  const handleFiltroPrio   = (v: typeof filtroPrio)   => { setFiltroPrio(v);   setPagina(1); };

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', marginBottom: 20 }}>
        <div>
          <h1 className="screen-title">Historial</h1>
          <p className="screen-subtitle">Registro de todos los turnos del día</p>
        </div>
        <button
          className="btn-primary"
          style={{ width: 'auto', gap: 7, padding: '9px 16px' }}
          onClick={() => exportarCSV(datos)}
        >
          <IconDownload />
          Exportar CSV
        </button>
      </div>

      {/* Resumen */}
      <div className="stat-grid" style={{ marginTop: 0, marginBottom: 16 }}>
        <div className="stat-card">
          <div className="micro-label" style={{ marginBottom: 8 }}>Total del día</div>
          <span className="mono" style={{ fontSize: 24, fontWeight: 600, color: '#FAFAFA' }}>{mockHistorial.length}</span>
          <div style={{ fontSize: 11, color: '#52525B', marginTop: 4 }}>turnos registrados</div>
        </div>
        <div className="stat-card">
          <div className="micro-label" style={{ marginBottom: 8 }}>Atendidos</div>
          <span className="mono" style={{ fontSize: 24, fontWeight: 600, color: '#22C55E' }}>{totalAtendidos}</span>
          <div style={{ fontSize: 11, color: '#52525B', marginTop: 4 }}>completados</div>
        </div>
        <div className="stat-card">
          <div className="micro-label" style={{ marginBottom: 8 }}>Tasa de atención</div>
          <span className="mono" style={{ fontSize: 24, fontWeight: 600, color: '#3B82F6' }}>{tasaAtencion}%</span>
          <div style={{ fontSize: 11, color: '#52525B', marginTop: 4 }}>{totalCancelados} no atendidos</div>
        </div>
        <div className="stat-card">
          <div className="micro-label" style={{ marginBottom: 8 }}>Prom. duración</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
            <span className="mono" style={{ fontSize: 24, fontWeight: 600, color: '#FAFAFA' }}>{promDuracion}</span>
            <span style={{ fontSize: 13, color: '#52525B' }}>min</span>
          </div>
          <div style={{ fontSize: 11, color: '#52525B', marginTop: 4 }}>por turno</div>
        </div>
      </div>

      {/* Filtros */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 6 }}>
          <span style={{ fontSize: 11, color: '#52525B', alignSelf: 'center', marginRight: 2 }}>Estado:</span>
          {(['todos', 'atendido', 'cancelado', 'ausente'] as const).map((v) => (
            <FilterChip key={v} active={filtroEstado === v} onClick={() => handleFiltroEstado(v)}>
              {v === 'todos' ? 'Todos' : v.charAt(0).toUpperCase() + v.slice(1)}
            </FilterChip>
          ))}
        </div>
        <div style={{ width: 1, height: 20, background: '#1E1E23' }} />
        <div style={{ display: 'flex', gap: 6 }}>
          <span style={{ fontSize: 11, color: '#52525B', alignSelf: 'center', marginRight: 2 }}>Prioridad:</span>
          {(['todos', 'alta', 'media', 'estandar'] as const).map((v) => (
            <FilterChip key={v} active={filtroPrio === v} onClick={() => handleFiltroPrio(v)}>
              {v === 'todos' ? 'Todas' : v === 'estandar' ? 'Estándar' : v.charAt(0).toUpperCase() + v.slice(1)}
            </FilterChip>
          ))}
        </div>
      </div>

      {/* Tabla */}
      <div className="main-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #1E1E23' }}>
                {['Turno', 'Nombre', 'Estado', 'Prioridad', 'Ingreso', 'Atención', 'Duración'].map((col) => (
                  <th
                    key={col}
                    style={{
                      padding: '12px 16px',
                      textAlign: 'left',
                      fontSize: 10,
                      fontWeight: 500,
                      color: '#52525B',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pageDatos.map((t) => {
                const isHover = hoverId === t.id;
                return (
                  <tr
                    key={t.id}
                    onMouseEnter={() => setHoverId(t.id)}
                    onMouseLeave={() => setHoverId(null)}
                    style={{
                      borderBottom: '1px solid #1C1C21',
                      background: isHover ? 'rgba(255,255,255,0.02)' : 'transparent',
                      transition: 'background 120ms ease',
                    }}
                  >
                    <td style={{ padding: '11px 16px' }}>
                      <span className="mono" style={{ fontSize: 12, fontWeight: 600, color: '#3B82F6' }}>
                        {t.numero}
                      </span>
                    </td>
                    <td style={{ padding: '11px 16px', fontWeight: 500, color: '#FAFAFA' }}>
                      {t.nombre}
                    </td>
                    <td style={{ padding: '11px 16px' }}>
                      <span className={estadoBadge(t.estado).cls}>{estadoBadge(t.estado).label}</span>
                    </td>
                    <td style={{ padding: '11px 16px' }}>
                      <span className={prioBadge(t.prioridad).cls}>{prioBadge(t.prioridad).label}</span>
                    </td>
                    <td style={{ padding: '11px 16px' }}>
                      <span className="mono" style={{ fontSize: 12, color: '#A0A0AB' }}>{t.horaIngreso}</span>
                    </td>
                    <td style={{ padding: '11px 16px' }}>
                      <span className="mono" style={{ fontSize: 12, color: t.horaAtencion ? '#A0A0AB' : '#3F3F46' }}>
                        {t.horaAtencion ?? '—'}
                      </span>
                    </td>
                    <td style={{ padding: '11px 16px' }}>
                      <span className="mono" style={{ fontSize: 12, color: t.duracion ? '#A0A0AB' : '#3F3F46' }}>
                        {t.duracion != null ? `${t.duracion} min` : '—'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {pageDatos.length === 0 && (
            <div style={{ padding: '40px 16px', textAlign: 'center', color: '#52525B', fontSize: 13 }}>
              No hay registros con los filtros seleccionados
            </div>
          )}
        </div>

        {/* Paginación */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 16px',
            borderTop: '1px solid #1C1C21',
          }}
        >
          <span style={{ fontSize: 12, color: '#52525B' }}>
            {datos.length} registros — pág. {pagina} de {totalPaginas || 1}
          </span>
          <div style={{ display: 'flex', gap: 6 }}>
            <PagBtn disabled={pagina <= 1} onClick={() => setPagina((p) => p - 1)}>
              <IconChevL />
            </PagBtn>
            {Array.from({ length: Math.min(totalPaginas, 5) }, (_, i) => {
              const p = i + 1;
              return (
                <PagBtn key={p} active={pagina === p} onClick={() => setPagina(p)}>
                  {p}
                </PagBtn>
              );
            })}
            <PagBtn disabled={pagina >= totalPaginas} onClick={() => setPagina((p) => p + 1)}>
              <IconChevR />
            </PagBtn>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Sub-componentes ───────────────────────────────────────────────────────────
function FilterChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: active ? 'rgba(59,130,246,0.1)' : 'transparent',
        border: `1px solid ${active ? 'rgba(59,130,246,0.3)' : '#1E1E23'}`,
        borderRadius: 6,
        padding: '4px 10px',
        fontSize: 12,
        fontWeight: 500,
        color: active ? '#3B82F6' : '#71717A',
        cursor: 'pointer',
        transition: 'all 150ms ease',
        fontFamily: 'inherit',
      }}
    >
      {children}
    </button>
  );
}

function PagBtn({ children, active, disabled, onClick }: {
  children: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        background: active ? 'rgba(59,130,246,0.15)' : 'transparent',
        border: `1px solid ${active ? 'rgba(59,130,246,0.3)' : '#1E1E23'}`,
        borderRadius: 5,
        padding: '4px 9px',
        fontSize: 12,
        color: active ? '#3B82F6' : disabled ? '#3F3F46' : '#A0A0AB',
        cursor: disabled ? 'not-allowed' : 'pointer',
        display: 'flex',
        alignItems: 'center',
        fontFamily: 'inherit',
        transition: 'all 120ms ease',
      }}
    >
      {children}
    </button>
  );
}
