import type { AdminScreen } from './AdminApp';

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

function IconPanelLeft({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
      <rect x="2" y="3" width="20" height="18" rx="2" />
      <path d="M9 3v18" />
      <path d="M16 9l-3 3 3 3" />
    </svg>
  );
}

function IconPanelRight({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
      <rect x="2" y="3" width="20" height="18" rx="2" />
      <path d="M9 3v18" />
      <path d="M13 9l3 3-3 3" />
    </svg>
  );
}

const statusByScreen: Record<AdminScreen, { label: string; color: string }> = {
  dashboard:     { label: 'Sistema operativo', color: '#22C55E' },
  cola:          { label: 'Actualizando en vivo',   color: '#3B82F6' },
  historial:     { label: 'Datos del día',     color: '#71717A' },
  usuarios:      { label: 'Conectados en vivo', color: '#22C55E' },
  chat:          { label: 'Soporte activo',    color: '#22C55E' },
  monitor:       { label: 'Proyección activa', color: '#22C55E' },
  configuracion: { label: 'Config. del sistema', color: '#71717A' },
};

interface AdminTopbarProps {
  title: string;
  screen: AdminScreen;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export function AdminTopbar({ title, screen, collapsed, onToggleCollapse }: AdminTopbarProps) {
  const status = statusByScreen[screen];

  return (
    <div
      style={{
        height: 48,
        background: '#111114',
        borderBottom: '1px solid #1C1C21',
        padding: '0 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0,
      }}
    >
      {/* Left: toggle + breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <button
          className="topbar-toggle"
          onClick={onToggleCollapse}
          aria-label={collapsed ? 'Expandir sidebar' : 'Colapsar sidebar'}
        >
          {collapsed ? <IconPanelRight /> : <IconPanelLeft />}
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13 }}>
          <span style={{ color: '#3F3F46' }}>Admin</span>
          <span style={{ color: '#3F3F46', fontSize: 11 }}>›</span>
          <span style={{ color: '#FAFAFA', fontWeight: 500 }}>{title}</span>
        </div>
      </div>

      {/* Right: status pill */}
      <div
        style={{
          background: '#16161A',
          border: '1px solid #1C1C21',
          borderRadius: 999,
          padding: '4px 12px',
          display: 'flex',
          alignItems: 'center',
          gap: 7,
        }}
      >
        <span
          className="status-pulse"
          style={{ background: status.color }}
        />
        <span style={{ fontSize: 11, color: '#71717A' }}>{status.label}</span>
      </div>
    </div>
  );
}
