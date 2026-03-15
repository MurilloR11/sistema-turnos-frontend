import { useState, useEffect } from 'react';

// ── Tipos ─────────────────────────────────────────────────────────────────────
type Estado   = 'esperando' | 'llamado' | 'atendiendo' | 'ausente';
type Prioridad = 'alta' | 'media' | 'estandar';

interface TurnoFila {
  id: string;
  numero: string;
  nombre: string;
  estado: Estado;
  prioridad: Prioridad;
  horaIngreso: string;
  minutosEspera: number;
  posicion: number;
}

// ── Mock data ─────────────────────────────────────────────────────────────────
const mockFila: TurnoFila[] = [
  { id: '1',  numero: 'T-052', nombre: 'Roberto Silva',       estado: 'atendiendo', prioridad: 'alta',     horaIngreso: '15:40', minutosEspera: 5,  posicion: 0 },
  { id: '2',  numero: 'T-053', nombre: 'Claudia Herrera',     estado: 'llamado',    prioridad: 'media',    horaIngreso: '15:43', minutosEspera: 8,  posicion: 1 },
  { id: '3',  numero: 'T-054', nombre: 'Diego Morales',       estado: 'esperando',  prioridad: 'estandar', horaIngreso: '15:44', minutosEspera: 7,  posicion: 2 },
  { id: '4',  numero: 'T-055', nombre: 'Patricia López',      estado: 'esperando',  prioridad: 'alta',     horaIngreso: '15:46', minutosEspera: 5,  posicion: 3 },
  { id: '5',  numero: 'T-056', nombre: 'Andrés Castillo',     estado: 'esperando',  prioridad: 'estandar', horaIngreso: '15:47', minutosEspera: 4,  posicion: 4 },
  { id: '6',  numero: 'T-057', nombre: 'Valentina Torres',    estado: 'esperando',  prioridad: 'media',    horaIngreso: '15:49', minutosEspera: 2,  posicion: 5 },
  { id: '7',  numero: 'T-058', nombre: 'Fernando Gómez',      estado: 'esperando',  prioridad: 'estandar', horaIngreso: '15:51', minutosEspera: 1,  posicion: 6 },
  { id: '8',  numero: 'T-059', nombre: 'Carmen Vásquez',      estado: 'ausente',    prioridad: 'estandar', horaIngreso: '15:30', minutosEspera: 21, posicion: 7 },
  { id: '9',  numero: 'T-060', nombre: 'Miguel Ángel Ruiz',   estado: 'esperando',  prioridad: 'alta',     horaIngreso: '15:52', minutosEspera: 0,  posicion: 8 },
  { id: '10', numero: 'T-061', nombre: 'Isabel Fuentes',      estado: 'esperando',  prioridad: 'estandar', horaIngreso: '15:53', minutosEspera: 0,  posicion: 9 },
];

// ── Iconos ────────────────────────────────────────────────────────────────────
const sv = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.75, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

function IconBell()    { return <svg width={14} height={14} viewBox="0 0 24 24" {...sv}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>; }
function IconUp()      { return <svg width={13} height={13} viewBox="0 0 24 24" {...sv}><polyline points="18 15 12 9 6 15"/></svg>; }
function IconDown()    { return <svg width={13} height={13} viewBox="0 0 24 24" {...sv}><polyline points="6 9 12 15 18 9"/></svg>; }
function IconTrash()   { return <svg width={13} height={13} viewBox="0 0 24 24" {...sv}><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>; }
function IconZap()     { return <svg width={14} height={14} viewBox="0 0 24 24" {...sv}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>; }
function IconRefresh() { return <svg width={14} height={14} viewBox="0 0 24 24" {...sv}><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>; }

// ── Helpers ───────────────────────────────────────────────────────────────────
function estadoBadge(e: Estado) {
  const map: Record<Estado, { label: string; cls: string }> = {
    atendiendo: { label: 'Atendiendo', cls: 'badge badge--green' },
    llamado:    { label: 'Llamado',    cls: 'badge badge--blue' },
    esperando:  { label: 'Esperando',  cls: 'badge badge--neutral' },
    ausente:    { label: 'Ausente',    cls: 'badge badge--red' },
  };
  return map[e];
}

function prioBadge(p: Prioridad) {
  const map: Record<Prioridad, { label: string; cls: string }> = {
    alta:     { label: 'Alta',     cls: 'badge badge--red' },
    media:    { label: 'Media',    cls: 'badge badge--amber' },
    estandar: { label: 'Estándar', cls: 'badge badge--neutral' },
  };
  return map[p];
}

// ── Componente ────────────────────────────────────────────────────────────────
export function AdminCola() {
  const [fila, setFila]         = useState<TurnoFila[]>(mockFila);
  const [filtro, setFiltro]     = useState<'todos' | Prioridad>('todos');
  const [hoverId, setHoverId]   = useState<string | null>(null);

  // Incrementar tiempos de espera cada 60s
  useEffect(() => {
    const id = setInterval(() => {
      setFila((f) =>
        f.map((t) =>
          t.estado === 'esperando' || t.estado === 'llamado'
            ? { ...t, minutosEspera: t.minutosEspera + 1 }
            : t
        )
      );
    }, 60000);
    return () => clearInterval(id);
  }, []);

  const filaFiltrada = fila.filter((t) =>
    filtro === 'todos' ? true : t.prioridad === filtro
  );

  const enAtencion = fila.find((t) => t.estado === 'atendiendo');
  const siguiente  = fila.find((t) => t.estado === 'esperando' || t.estado === 'llamado');

  const llamarSiguiente = () => {
    if (!siguiente) return;
    setFila((f) =>
      f
        .map((t): TurnoFila => {
          if (t.id === enAtencion?.id) return { ...t, estado: 'ausente' };
          if (t.id === siguiente.id)  return { ...t, estado: 'atendiendo' };
          return t;
        })
        .filter((t) => t.id !== enAtencion?.id)
    );
  };

  const moverArriba = (id: string) => {
    setFila((f) => {
      const idx = f.findIndex((t) => t.id === id);
      if (idx <= 1) return f;
      const copia = [...f];
      [copia[idx - 1], copia[idx]] = [copia[idx], copia[idx - 1]];
      return copia.map((t, i) => ({ ...t, posicion: i }));
    });
  };

  const moverAbajo = (id: string) => {
    setFila((f) => {
      const idx = f.findIndex((t) => t.id === id);
      if (idx >= f.length - 1 || idx === 0) return f;
      const copia = [...f];
      [copia[idx], copia[idx + 1]] = [copia[idx + 1], copia[idx]];
      return copia.map((t, i) => ({ ...t, posicion: i }));
    });
  };

  const eliminar = (id: string) => {
    setFila((f) => f.filter((t) => t.id !== id).map((t, i) => ({ ...t, posicion: i })));
  };

  const cambiarPrioridad = (id: string) => {
    setFila((f) =>
      f.map((t) => {
        if (t.id !== id) return t;
        const ciclo: Prioridad[] = ['estandar', 'media', 'alta'];
        const idx = ciclo.indexOf(t.prioridad);
        return { ...t, prioridad: ciclo[(idx + 1) % ciclo.length] };
      })
    );
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', marginBottom: 20 }}>
        <div>
          <h1 className="screen-title">Gestión de fila</h1>
          <p className="screen-subtitle">Control de la fila en tiempo real</p>
        </div>
        <button
          className="btn-primary"
          style={{ width: 'auto', gap: 7, padding: '9px 18px' }}
          onClick={llamarSiguiente}
          disabled={!siguiente}
        >
          <IconBell />
          Llamar siguiente
        </button>
      </div>

      {/* Turno en atención */}
      {enAtencion && (
        <div
          className="info-card"
          style={{
            marginBottom: 16,
            borderColor: 'rgba(34,197,94,0.2)',
            background: 'rgba(34,197,94,0.04)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span className="pulse-dot" />
            <div>
              <span style={{ fontSize: 11, color: '#71717A' }}>Atendiendo ahora</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 2 }}>
                <span className="mono" style={{ fontSize: 15, fontWeight: 600, color: '#22C55E' }}>
                  {enAtencion.numero}
                </span>
                <span style={{ fontSize: 14, fontWeight: 500, color: '#FAFAFA' }}>
                  {enAtencion.nombre}
                </span>
                <span className={prioBadge(enAtencion.prioridad).cls}>
                  {prioBadge(enAtencion.prioridad).label}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filtros + stats */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 12, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {(['todos', 'alta', 'media', 'estandar'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFiltro(f)}
              style={{
                background: filtro === f ? 'rgba(59,130,246,0.1)' : 'transparent',
                border: `1px solid ${filtro === f ? 'rgba(59,130,246,0.3)' : '#1E1E23'}`,
                borderRadius: 6,
                padding: '5px 12px',
                fontSize: 12,
                fontWeight: 500,
                color: filtro === f ? '#3B82F6' : '#71717A',
                cursor: 'pointer',
                transition: 'all 150ms ease',
                fontFamily: 'inherit',
              }}
            >
              {f === 'todos' ? 'Todos' : f === 'alta' ? 'Alta' : f === 'media' ? 'Media' : 'Estándar'}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{ color: '#52525B', display: 'flex' }}><IconRefresh /></span>
          <span style={{ fontSize: 11, color: '#52525B' }}>{fila.length} en fila</span>
        </div>
      </div>

      {/* Tabla */}
      <div
        className="main-card"
        style={{ padding: 0, overflow: 'hidden' }}
      >
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #1E1E23' }}>
                {['#', 'Nombre', 'Estado', 'Ingreso', 'Espera', 'Prioridad', 'Acciones'].map((col) => (
                  <th
                    key={col}
                    style={{
                      padding: '12px 16px',
                      textAlign: col === '#' ? 'center' : 'left',
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
              {filaFiltrada.map((t) => {
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
                    {/* Posición */}
                    <td style={{ padding: '11px 16px', textAlign: 'center' }}>
                      <span
                        className="mono"
                        style={{
                          fontSize: 12,
                          fontWeight: 600,
                          color: t.posicion === 0 ? '#22C55E' : '#52525B',
                        }}
                      >
                        {t.posicion === 0 ? '—' : `#${t.posicion}`}
                      </span>
                    </td>

                    {/* Nombre + número */}
                    <td style={{ padding: '11px 16px' }}>
                      <div style={{ fontWeight: 500, color: '#FAFAFA' }}>{t.nombre}</div>
                      <div style={{ fontSize: 11, color: '#52525B', marginTop: 2 }}>
                        <span className="mono">{t.numero}</span>
                      </div>
                    </td>

                    {/* Estado */}
                    <td style={{ padding: '11px 16px' }}>
                      <span className={estadoBadge(t.estado).cls}>
                        {estadoBadge(t.estado).label}
                      </span>
                    </td>

                    {/* Ingreso */}
                    <td style={{ padding: '11px 16px' }}>
                      <span className="mono" style={{ fontSize: 12, color: '#A0A0AB' }}>
                        {t.horaIngreso}
                      </span>
                    </td>

                    {/* Espera */}
                    <td style={{ padding: '11px 16px' }}>
                      <span
                        className="mono"
                        style={{
                          fontSize: 12,
                          color: t.minutosEspera > 20 ? '#EF4444' : t.minutosEspera > 10 ? '#F59E0B' : '#A0A0AB',
                          fontWeight: t.minutosEspera > 20 ? 600 : 400,
                        }}
                      >
                        {t.minutosEspera} min
                      </span>
                    </td>

                    {/* Prioridad */}
                    <td style={{ padding: '11px 16px' }}>
                      <span className={prioBadge(t.prioridad).cls}>
                        {prioBadge(t.prioridad).label}
                      </span>
                    </td>

                    {/* Acciones */}
                    <td style={{ padding: '11px 16px' }}>
                      <div
                        style={{
                          display: 'flex',
                          gap: 4,
                          opacity: isHover ? 1 : 0,
                          transition: 'opacity 150ms ease',
                        }}
                      >
                        {/* Llamar */}
                        <button
                          title="Llamar"
                          onClick={() =>
                            setFila((f) =>
                              f.map((x) => x.id === t.id ? { ...x, estado: 'llamado' } : x)
                            )
                          }
                          style={actionBtn('#3B82F6')}
                        >
                          <IconBell />
                        </button>
                        {/* Subir */}
                        <button title="Subir posición" onClick={() => moverArriba(t.id)} style={actionBtn('#71717A')}>
                          <IconUp />
                        </button>
                        {/* Bajar */}
                        <button title="Bajar posición" onClick={() => moverAbajo(t.id)} style={actionBtn('#71717A')}>
                          <IconDown />
                        </button>
                        {/* Cambiar prioridad */}
                        <button title="Cambiar prioridad" onClick={() => cambiarPrioridad(t.id)} style={actionBtn('#F59E0B')}>
                          <IconZap />
                        </button>
                        {/* Eliminar */}
                        <button title="Eliminar de la fila" onClick={() => eliminar(t.id)} style={actionBtn('#EF4444')}>
                          <IconTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filaFiltrada.length === 0 && (
            <div style={{ padding: '40px 16px', textAlign: 'center', color: '#52525B', fontSize: 13 }}>
              No hay turnos con ese filtro
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function actionBtn(_hoverColor?: string): React.CSSProperties {
  return {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid #1E1E23',
    borderRadius: 5,
    padding: '5px 7px',
    cursor: 'pointer',
    color: '#71717A',
    display: 'flex',
    alignItems: 'center',
    transition: 'color 120ms ease, border-color 120ms ease, background 120ms ease',
    outline: 'none',
  };
}
