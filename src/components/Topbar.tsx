import { useState } from 'react';
import { IconPanelLeft, IconPanelRight } from './ui/icons';

interface TopbarProps {
  title: string;
  collapsed: boolean;
  onToggleCollapse: () => void;
  isChat?: boolean;
}

function ToggleButton({
  collapsed,
  onToggle,
}: {
  collapsed: boolean;
  onToggle: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onToggle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={collapsed ? 'Expandir sidebar' : 'Colapsar sidebar'}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: hovered ? '#FAFAFA' : '#52525B',
        padding: 4,
        borderRadius: 4,
        display: 'flex',
        alignItems: 'center',
        transition: 'color 150ms ease',
      }}
    >
      {collapsed ? <IconPanelRight /> : <IconPanelLeft />}
    </button>
  );
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
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <ToggleButton collapsed={collapsed} onToggle={onToggleCollapse} />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 13,
          }}
        >
          <span className="breadcrumb-sep" style={{ color: '#52525B' }}>Sistema</span>
          <span className="breadcrumb-sep" style={{ color: '#52525B' }}>›</span>
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
          gap: 8,
        }}
      >
        <span className="status-pulse" />
        <span style={{ fontSize: 11, color: '#A0A0AB' }}>
          {isChat ? 'Soporte en línea' : '12 en espera'}
        </span>
      </div>
    </div>
  );
}
