import { useState } from 'react';

// ── Tipos ─────────────────────────────────────────────────────────────────────
type EstadoU = 'en_fila' | 'conectado';
type PrioU   = 'alta' | 'media' | 'estandar';

interface Usuario {
  id: string;
  nombre: string;
  estado: EstadoU;
  conectadoHace: number; // minutos
  posicionFila?: number;
  turno?: string;
  prioridad?: PrioU;
}

// ── Mock data ─────────────────────────────────────────────────────────────────
const mockUsuarios: Usuario[] = [
  { id: '1', nombre: 'Roberto Silva',     estado: 'en_fila',  conectadoHace: 5,  posicionFila: 1, turno: 'T-052', prioridad: 'alta' },
  { id: '2', nombre: 'Claudia Herrera',   estado: 'en_fila',  conectadoHace: 8,  posicionFila: 2, turno: 'T-053', prioridad: 'media' },
  { id: '3', nombre: 'Diego Morales',     estado: 'en_fila',  conectadoHace: 7,  posicionFila: 3, turno: 'T-054', prioridad: 'estandar' },
  { id: '4', nombre: 'Patricia López',    estado: 'en_fila',  conectadoHace: 5,  posicionFila: 4, turno: 'T-055', prioridad: 'alta' },
  { id: '5', nombre: 'Andrés Castillo',   estado: 'en_fila',  conectadoHace: 4,  posicionFila: 5, turno: 'T-056', prioridad: 'estandar' },
  { id: '6', nombre: 'Valentina Torres',  estado: 'en_fila',  conectadoHace: 2,  posicionFila: 6, turno: 'T-057', prioridad: 'media' },
  { id: '7', nombre: 'Juan Ignacio Ríos', estado: 'conectado', conectadoHace: 3 },
  { id: '8', nombre: 'Mónica Serrano',    estado: 'conectado', conectadoHace: 11 },
  { id: '9', nombre: 'Felipe Contreras',  estado: 'conectado', conectadoHace: 1 },
];

// ── Iconos ────────────────────────────────────────────────────────────────────
const sv = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.75, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
function IconX()         { return <svg width={13} height={13} viewBox="0 0 24 24" {...sv}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>; }
function IconLogout()    { return <svg width={13} height={13} viewBox="0 0 24 24" {...sv}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>; }
function IconUser()      { return <svg width={15} height={15} viewBox="0 0 24 24" {...sv}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>; }
function IconUsers()     { return <svg width={15} height={15} viewBox="0 0 24 24" {...sv}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>; }

function prioBadge(p?: PrioU) {
  if (!p)              return { label: '—',       cls: 'badge badge--neutral' };
  if (p === 'alta')    return { label: 'Alta',     cls: 'badge badge--red' };
  if (p === 'media')   return { label: 'Media',    cls: 'badge badge--amber' };
  return                      { label: 'Estándar', cls: 'badge badge--neutral' };
}

function tiempoLabel(min: number) {
  if (min < 1)   return 'hace un momento';
  if (min === 1) return 'hace 1 min';
  if (min < 60)  return `hace ${min} min`;
  const h = Math.floor(min / 60);
  return `hace ${h}h`;
}

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

// ── Componente ────────────────────────────────────────────────────────────────
export function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>(mockUsuarios);

  const enFila     = usuarios.filter((u) => u.estado === 'en_fila');
  const conectados = usuarios.filter((u) => u.estado === 'conectado');

  const removerDeFila = (id: string) => {
    setUsuarios((us) =>
      us.map((u) =>
        u.id === id
          ? { ...u, estado: 'conectado', posicionFila: undefined, turno: undefined, prioridad: undefined }
          : u
      )
    );
  };

  const desconectar = (id: string) => {
    setUsuarios((us) => us.filter((u) => u.id !== id));
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <h1 className="screen-title">Usuarios conectados</h1>
        <p className="screen-subtitle">Gestión de usuarios activos en el sistema</p>
      </div>

      {/* Stats inline */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
        <div className="stat-card" style={{ flex: '1 1 160px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <div className="icon-box icon-box--blue"><IconUsers /></div>
            <span className="micro-label">En fila</span>
          </div>
          <span className="mono" style={{ fontSize: 26, fontWeight: 600, color: '#FAFAFA' }}>{enFila.length}</span>
        </div>
        <div className="stat-card" style={{ flex: '1 1 160px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <div className="icon-box icon-box--green"><IconUser /></div>
            <span className="micro-label">Solo conectados</span>
          </div>
          <span className="mono" style={{ fontSize: 26, fontWeight: 600, color: '#FAFAFA' }}>{conectados.length}</span>
        </div>
        <div className="stat-card" style={{ flex: '1 1 160px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <span className="pulse-dot" />
            <span className="micro-label">Total online</span>
          </div>
          <span className="mono" style={{ fontSize: 26, fontWeight: 600, color: '#FAFAFA' }}>{usuarios.length}</span>
        </div>
      </div>

      {/* Sección: En fila */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <div className="icon-box icon-box--blue" style={{ width: 24, height: 24 }}>
            <IconUsers />
          </div>
          <span className="card-header-title">En fila de espera</span>
          <span className="badge badge--blue">{enFila.length}</span>
        </div>

        {enFila.length === 0 ? (
          <div className="info-card" style={{ textAlign: 'center', padding: 32, color: '#52525B', fontSize: 13 }}>
            No hay usuarios en fila
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 10 }}>
            {enFila.map((u) => (
              <UserCard
                key={u.id}
                usuario={u}
                onRemover={() => removerDeFila(u.id)}
                onDesconectar={() => desconectar(u.id)}
                tipo="en_fila"
              />
            ))}
          </div>
        )}
      </div>

      {/* Separador */}
      <div className="card-divider" />

      {/* Sección: Solo conectados */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, marginTop: 20 }}>
          <div className="icon-box icon-box--green" style={{ width: 24, height: 24 }}>
            <IconUser />
          </div>
          <span className="card-header-title">Conectados sin turno</span>
          <span className="badge badge--green">{conectados.length}</span>
        </div>

        {conectados.length === 0 ? (
          <div className="info-card" style={{ textAlign: 'center', padding: 32, color: '#52525B', fontSize: 13 }}>
            No hay usuarios conectados sin turno
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 10 }}>
            {conectados.map((u) => (
              <UserCard
                key={u.id}
                usuario={u}
                onRemover={() => {}}
                onDesconectar={() => desconectar(u.id)}
                tipo="conectado"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── UserCard ──────────────────────────────────────────────────────────────────
function UserCard({
  usuario, onRemover, onDesconectar, tipo,
}: {
  usuario: Usuario;
  onRemover: () => void;
  onDesconectar: () => void;
  tipo: 'en_fila' | 'conectado';
}) {
  const [hover, setHover] = useState(false);
  const prio = prioBadge(usuario.prioridad);

  return (
    <div
      className="info-card"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ borderColor: hover ? '#27272A' : undefined }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
        {/* Avatar */}
        <div
          style={{
            width: 36, height: 36,
            borderRadius: '50%',
            background: tipo === 'en_fila' ? 'rgba(59,130,246,0.1)' : 'rgba(34,197,94,0.1)',
            border: `1px solid ${tipo === 'en_fila' ? 'rgba(59,130,246,0.2)' : 'rgba(34,197,94,0.2)'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 11,
            fontWeight: 700,
            color: tipo === 'en_fila' ? '#3B82F6' : '#22C55E',
            flexShrink: 0,
          }}
        >
          {getInitials(usuario.nombre)}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: '#FAFAFA',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {usuario.nombre}
          </div>
          <div style={{ fontSize: 11, color: '#52525B', marginTop: 3 }}>
            {tiempoLabel(usuario.conectadoHace)}
          </div>
        </div>

        {/* Indicador online */}
        <span className="status-pulse" style={{ marginTop: 6 }} />
      </div>

      {/* Info fila */}
      {tipo === 'en_fila' && (
        <div
          style={{
            marginTop: 10,
            paddingTop: 10,
            borderTop: '1px solid #1E1E23',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 11, color: '#52525B' }}>Pos.</span>
            <span className="mono" style={{ fontSize: 13, fontWeight: 600, color: '#3B82F6' }}>
              #{usuario.posicionFila}
            </span>
            <span className="mono" style={{ fontSize: 11, color: '#52525B' }}>
              {usuario.turno}
            </span>
          </div>
          <span className={prio.cls} style={{ fontSize: 9, padding: '2px 6px' }}>{prio.label}</span>
        </div>
      )}

      {/* Acciones */}
      <div
        style={{
          marginTop: 10,
          display: 'flex',
          gap: 6,
          opacity: hover ? 1 : 0,
          transition: 'opacity 150ms ease',
        }}
      >
        {tipo === 'en_fila' && (
          <button
            onClick={onRemover}
            style={smallBtn}
            title="Remover de la fila"
          >
            <IconX />
            <span style={{ fontSize: 11 }}>Remover de fila</span>
          </button>
        )}
        <button
          onClick={onDesconectar}
          style={{ ...smallBtn, color: '#EF4444', borderColor: 'rgba(239,68,68,0.2)', background: 'rgba(239,68,68,0.05)' }}
          title="Forzar desconexión"
        >
          <IconLogout />
          <span style={{ fontSize: 11 }}>Desconectar</span>
        </button>
      </div>
    </div>
  );
}

const smallBtn: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 5,
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid #1E1E23',
  borderRadius: 5,
  padding: '4px 8px',
  fontSize: 11,
  color: '#71717A',
  cursor: 'pointer',
  fontFamily: 'inherit',
  transition: 'all 120ms ease',
};
