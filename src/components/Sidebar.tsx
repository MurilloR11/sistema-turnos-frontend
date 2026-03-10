import { useState } from 'react';
import type { ReactNode } from 'react';
import {
  IconHome,
  IconTicket,
  IconPlusCircle,
  IconGear,
  IconHelp,
  IconLogout,
} from './ui/icons';

export type Screen = 'inicio' | 'miturno' | 'solicitar';

interface SidebarProps {
  active: Screen;
  collapsed: boolean;
  mobile: boolean;
  onNavigate: (screen: Screen) => void;
  onLogout: () => void;
}

// ─── Helper sub-components ───────────────────────────────────────────────────

function NavItem({
  icon,
  label,
  active,
  collapsed,
  onClick,
}: {
  icon: ReactNode;
  label: string;
  active: boolean;
  collapsed: boolean;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: collapsed ? 0 : 10,
        padding: collapsed ? '7px 0' : '7px 10px',
        borderRadius: 6,
        cursor: 'pointer',
        color: active ? '#FAFAFA' : hovered ? '#FAFAFA' : '#A0A0AB',
        background: active
          ? 'rgba(59,130,246,0.08)'
          : hovered
          ? '#16161A'
          : 'transparent',
        transition: 'background 150ms ease, color 150ms ease',
        fontSize: 13,
        fontWeight: 500,
        justifyContent: collapsed ? 'center' : 'flex-start',
        userSelect: 'none',
        outline: 'none',
      }}
    >
      <span
        style={{
          color: active ? '#3B82F6' : 'inherit',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {icon}
      </span>
      <span
        style={{
          opacity: collapsed ? 0 : 1,
          maxWidth: collapsed ? 0 : 140,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          transition: 'opacity 150ms ease, max-width 200ms ease',
        }}
      >
        {label}
      </span>
    </div>
  );
}

function LogoutButton({ collapsed, onClick }: { collapsed: boolean; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: hovered ? '#EF4444' : '#52525B',
        padding: 4,
        borderRadius: 4,
        display: 'flex',
        alignItems: 'center',
        opacity: collapsed ? 0 : 1,
        maxWidth: collapsed ? 0 : 30,
        overflow: 'hidden',
        transition: 'color 150ms ease, opacity 150ms ease, max-width 200ms ease',
        flexShrink: 0,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="Cerrar sesión"
    >
      <IconLogout />
    </button>
  );
}

// ─── Nav data ─────────────────────────────────────────────────────────────────

const mainNav: { id: Screen; label: string; icon: ReactNode }[] = [
  { id: 'inicio',    label: 'Inicio',    icon: <IconHome /> },
  { id: 'miturno',  label: 'Mi Turno',  icon: <IconTicket /> },
  { id: 'solicitar', label: 'Solicitar', icon: <IconPlusCircle /> },
];

const secondaryNav = [
  { id: 'config', label: 'Configuración', icon: <IconGear /> },
  { id: 'ayuda',  label: 'Ayuda',         icon: <IconHelp /> },
];

// ─── Sidebar ──────────────────────────────────────────────────────────────────

export function Sidebar({ active, collapsed, mobile, onNavigate, onLogout }: SidebarProps) {
  const containerPad = collapsed ? '0' : '0 12px';

  return (
    <aside
      style={{
        position: mobile ? 'fixed' : 'relative',
        top: 0,
        left: 0,
        zIndex: mobile ? 50 : undefined,
        width: mobile ? (collapsed ? 0 : 232) : collapsed ? 48 : 232,
        transition: 'width 200ms ease',
        background: '#111114',
        borderRight: mobile && collapsed ? 'none' : '1px solid #1C1C21',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        overflow: 'hidden',
        flexShrink: 0,
      }}
    >
      {/* Top section */}
      <div
        style={{
          padding: containerPad,
          transition: 'padding 200ms ease',
        }}
      >
        {/* Brand row */}
        <div
          style={{
            height: 48,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            borderBottom: '1px solid #1C1C21',
            justifyContent: collapsed ? 'center' : 'flex-start',
            padding: collapsed ? '0' : '0',
          }}
        >
          <div
            style={{
              width: 22,
              height: 22,
              background: '#3B82F6',
              borderRadius: 5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 11,
              fontWeight: 600,
              color: '#fff',
              flexShrink: 0,
            }}
          >
            ST
          </div>
          <span
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: '#FAFAFA',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              opacity: collapsed ? 0 : 1,
              maxWidth: collapsed ? 0 : 160,
              transition: 'opacity 150ms ease, max-width 200ms ease',
            }}
          >
            Sistema de Turnos
          </span>
        </div>

        {/* Nav label */}
        <div
          style={{
            fontSize: 9,
            fontWeight: 500,
            color: '#52525B',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            opacity: collapsed ? 0 : 1,
            maxHeight: collapsed ? 0 : 36,
            padding: collapsed ? '0 10px' : '16px 10px 6px',
            transition:
              'opacity 150ms ease, max-height 200ms ease, padding 200ms ease',
          }}
        >
          ESPACIO DE TRABAJO
        </div>

        {/* Main nav */}
        <nav
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            paddingTop: collapsed ? 8 : 0,
            transition: 'padding-top 200ms ease',
          }}
        >
          {mainNav.map((item) => (
            <NavItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              active={active === item.id}
              collapsed={collapsed}
              onClick={() => onNavigate(item.id)}
            />
          ))}
        </nav>
      </div>

      {/* Separator */}
      <hr
        style={{
          border: 'none',
          borderTop: '1px solid #1C1C21',
          margin: '8px 0',
        }}
      />

      {/* Secondary nav */}
      <div
        style={{
          padding: containerPad,
          transition: 'padding 200ms ease',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {secondaryNav.map((item) => (
          <NavItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            active={false}
            collapsed={collapsed}
            onClick={() => {}}
          />
        ))}
      </div>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* User row */}
      <div
        style={{
          padding: '10px 12px',
          borderTop: '1px solid #1C1C21',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          justifyContent: collapsed ? 'center' : 'flex-start',
          minHeight: 52,
        }}
      >
        {/* Avatar */}
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: '50%',
            background: '#27272A',
            border: '1px solid #3F3F46',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 10,
            fontWeight: 600,
            color: '#A0A0AB',
            flexShrink: 0,
            letterSpacing: '0.03em',
          }}
        >
          CA
        </div>

        {/* Name + role */}
        {!collapsed && (
          <div style={{ flex: 1, minWidth: 0, overflow: 'hidden' }}>
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
              Carlos
            </div>
            <div
              style={{
                fontSize: 10,
                color: '#52525B',
                whiteSpace: 'nowrap',
                marginTop: 1,
              }}
            >
              Paciente
            </div>
          </div>
        )}

        <LogoutButton collapsed={collapsed} onClick={onLogout} />
      </div>
    </aside>
  );
}
