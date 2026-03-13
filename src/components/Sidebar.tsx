import type { ReactNode } from 'react';
import {
  IconHome, IconTicket, IconPlusCircle, IconChat,
  IconGear, IconHelp, IconLogout,
} from './ui/icons';
import { useUser } from '../context/UserContext';

export type Screen = 'inicio' | 'miturno' | 'solicitar' | 'chat';

interface SidebarProps {
  active: Screen;
  collapsed: boolean;
  mobile: boolean;
  onNavigate: (screen: Screen) => void;
  onLogout: () => void;
}

const mainNav: { id: Screen; label: string; icon: ReactNode }[] = [
  { id: 'inicio',    label: 'Inicio',    icon: <IconHome /> },
  { id: 'miturno',  label: 'Mi Turno',  icon: <IconTicket /> },
  { id: 'solicitar', label: 'Solicitar', icon: <IconPlusCircle /> },
  { id: 'chat',      label: 'Chat',      icon: <IconChat /> },
];

const secondaryNav = [
  { id: 'config', label: 'Configuración', icon: <IconGear /> },
  { id: 'ayuda',  label: 'Ayuda',         icon: <IconHelp /> },
];

const estadoLabel: Record<string, string> = {
  normal:            'Paciente',
  embarazada:        'Embarazada',
  adulto_mayor:      'Adulto mayor',
  'discapacitado/a': 'Discapacitado/a',
};

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  return (name.slice(0, 2) || 'U').toUpperCase();
}

export function Sidebar({ active, collapsed, mobile, onNavigate, onLogout }: SidebarProps) {
  const { name, estado } = useUser();
  const initials  = getInitials(name || 'Usuario');
  const roleLabel = estado ? (estadoLabel[estado] ?? 'Paciente') : 'Paciente';

  const pad = collapsed ? '0 6px' : '0 8px';

  return (
    <aside
      style={{
        position: mobile ? 'fixed' : 'relative',
        top: 0, left: 0,
        zIndex: mobile ? 50 : undefined,
        width: mobile ? (collapsed ? 0 : 224) : collapsed ? 52 : 224,
        minWidth: mobile ? undefined : collapsed ? 52 : 224,
        transition: 'width 200ms ease, min-width 200ms ease',
        background: '#111114',
        borderRight: mobile && collapsed ? 'none' : '1px solid #1C1C21',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        overflow: 'hidden',
        flexShrink: 0,
      }}
    >
      {/* ── Brand ── */}
      <div
        style={{
          height: 48,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: collapsed ? '0 15px' : '0 16px',
          borderBottom: '1px solid #1C1C21',
          flexShrink: 0,
          justifyContent: collapsed ? 'center' : 'flex-start',
        }}
      >
        <div
          style={{
            width: 22, height: 22,
            background: '#3B82F6',
            borderRadius: 5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 10,
            fontWeight: 700,
            color: '#fff',
            flexShrink: 0,
            letterSpacing: '0.02em',
          }}
        >
          ST
        </div>
        <span
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: '#FAFAFA',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            opacity: collapsed ? 0 : 1,
            maxWidth: collapsed ? 0 : 160,
            transition: 'opacity 150ms ease, max-width 200ms ease',
            letterSpacing: '-0.01em',
          }}
        >
          Sistema de Turnos
        </span>
      </div>

      {/* ── Nav section label ── */}
      <div
        style={{
          opacity: collapsed ? 0 : 1,
          maxHeight: collapsed ? 0 : 36,
          overflow: 'hidden',
          padding: collapsed ? '0 10px' : '14px 18px 6px',
          transition: 'opacity 150ms ease, max-height 200ms ease, padding 200ms ease',
        }}
      >
        <span className="micro-label">Navegación</span>
      </div>

      {/* ── Main nav ── */}
      <nav
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          padding: collapsed ? '8px 6px 4px' : '0 8px 4px',
          transition: 'padding 200ms ease',
        }}
      >
        {mainNav.map((item) => (
          <button
            key={item.id}
            className={[
              'nav-item',
              active === item.id ? 'nav-item--active' : '',
              collapsed ? 'nav-item--collapsed' : '',
            ].join(' ')}
            onClick={() => onNavigate(item.id)}
            onKeyDown={(e) => e.key === 'Enter' && onNavigate(item.id)}
            title={collapsed ? item.label : undefined}
          >
            <span className="nav-item-icon">{item.icon}</span>
            <span
              className="nav-item-label"
              style={{ opacity: collapsed ? 0 : 1, maxWidth: collapsed ? 0 : 140 }}
            >
              {item.label}
            </span>
          </button>
        ))}
      </nav>

      {/* ── Separator ── */}
      <hr style={{ border: 'none', borderTop: '1px solid #1C1C21', margin: '6px 0' }} />

      {/* ── Secondary nav ── */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          padding: pad,
          transition: 'padding 200ms ease',
        }}
      >
        {secondaryNav.map((item) => (
          <button
            key={item.id}
            className={['nav-item', collapsed ? 'nav-item--collapsed' : ''].join(' ')}
            onClick={() => {}}
            title={collapsed ? item.label : undefined}
          >
            <span className="nav-item-icon">{item.icon}</span>
            <span
              className="nav-item-label"
              style={{ opacity: collapsed ? 0 : 1, maxWidth: collapsed ? 0 : 140 }}
            >
              {item.label}
            </span>
          </button>
        ))}
      </div>

      <div style={{ flex: 1 }} />

      {/* ── User row ── */}
      <div
        style={{
          padding: collapsed ? '10px 11px' : '10px 12px',
          borderTop: '1px solid #1C1C21',
          display: 'flex',
          alignItems: 'center',
          gap: 9,
          justifyContent: collapsed ? 'center' : 'flex-start',
          minHeight: 56,
          flexShrink: 0,
        }}
      >
        {/* Avatar */}
        <div
          style={{
            width: 28, height: 28,
            borderRadius: '50%',
            background: 'rgba(59,130,246,0.1)',
            border: '1px solid rgba(59,130,246,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 10,
            fontWeight: 700,
            color: '#3B82F6',
            flexShrink: 0,
            letterSpacing: '0.05em',
          }}
        >
          {initials}
        </div>

        {!collapsed && (
          <>
            <div style={{ flex: 1, minWidth: 0, overflow: 'hidden' }}>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: '#FAFAFA',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  lineHeight: 1.3,
                }}
              >
                {name || 'Usuario'}
              </div>
              <div style={{ fontSize: 11, color: '#52525B', marginTop: 2, lineHeight: 1 }}>
                {roleLabel}
              </div>
            </div>

            <button className="logout-btn" onClick={onLogout} aria-label="Cerrar sesión">
              <IconLogout />
            </button>
          </>
        )}
      </div>
    </aside>
  );
}
