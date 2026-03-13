import { IconPanelLeft, IconPanelRight } from './ui/icons';

interface TopbarProps {
  title: string;
  collapsed: boolean;
  onToggleCollapse: () => void;
  isChat?: boolean;
}

export function Topbar({ title, collapsed, onToggleCollapse, isChat }: TopbarProps) {
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
          <span className="breadcrumb-sep" style={{ color: '#3F3F46' }}>Sistema</span>
          <span className="breadcrumb-sep" style={{ color: '#3F3F46', fontSize: 11 }}>›</span>
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
        <span className="status-pulse" />
        <span style={{ fontSize: 11, color: '#71717A' }}>
          {isChat ? 'Soporte en línea' : '12 en espera'}
        </span>
      </div>
    </div>
  );
}
