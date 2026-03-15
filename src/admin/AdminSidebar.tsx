import type { ReactNode } from 'react';
import type { AdminScreen } from './AdminApp';

// ── Iconos ────────────────────────────────────────────────────────────────────
const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

function IconDashboard({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  );
}

function IconQueue({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <circle cx="3" cy="6" r="1" fill="currentColor" stroke="none" />
      <circle cx="3" cy="12" r="1" fill="currentColor" stroke="none" />
      <circle cx="3" cy="18" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconHistory({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M12 7v5l4 2" />
    </svg>
  );
}

function IconUsers({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function IconChat({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function IconMonitor({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
}

function IconGear({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

function IconLogout({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}

// ── Tipos ─────────────────────────────────────────────────────────────────────
interface NavItem {
  id: AdminScreen;
  label: string;
  icon: ReactNode;
}

const navItems: NavItem[] = [
  { id: 'dashboard',    label: 'Dashboard',     icon: <IconDashboard /> },
  { id: 'cola',         label: 'Cola',          icon: <IconQueue /> },
  { id: 'historial',    label: 'Historial',     icon: <IconHistory /> },
  { id: 'usuarios',     label: 'Usuarios',      icon: <IconUsers /> },
  { id: 'chat',         label: 'Chat',          icon: <IconChat /> },
  { id: 'monitor',      label: 'Monitor',       icon: <IconMonitor /> },
  { id: 'configuracion', label: 'Configuración', icon: <IconGear /> },
];

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  return (name.slice(0, 2) || 'AD').toUpperCase();
}

interface AdminSidebarProps {
  active: AdminScreen;
  collapsed: boolean;
  mobile: boolean;
  chatUnread: number;
  adminName: string;
  onNavigate: (screen: AdminScreen) => void;
  onLogout: () => void;
}

export function AdminSidebar({
  active, collapsed, mobile, chatUnread, adminName, onNavigate, onLogout,
}: AdminSidebarProps) {
  const initials = getInitials(adminName);

  return (
    <aside
      style={{
        position: mobile ? 'fixed' : 'relative',
        top: 0, left: 0,
        zIndex: mobile ? 50 : undefined,
        width: mobile ? (collapsed ? 0 : 230) : collapsed ? 52 : 230,
        minWidth: mobile ? undefined : collapsed ? 52 : 230,
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
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 7,
            overflow: 'hidden',
            opacity: collapsed ? 0 : 1,
            maxWidth: collapsed ? 0 : 170,
            transition: 'opacity 150ms ease, max-width 200ms ease',
          }}
        >
          <span
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: '#FAFAFA',
              whiteSpace: 'nowrap',
              letterSpacing: '-0.01em',
            }}
          >
            Sistema de Turnos
          </span>
          <span
            style={{
              background: 'rgba(59,130,246,0.1)',
              border: '1px solid rgba(59,130,246,0.2)',
              borderRadius: 4,
              padding: '1px 5px',
              fontSize: 9,
              fontWeight: 600,
              color: '#3B82F6',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            Admin
          </span>
        </div>
      </div>

      {/* ── Section label ── */}
      <div
        style={{
          opacity: collapsed ? 0 : 1,
          maxHeight: collapsed ? 0 : 36,
          overflow: 'hidden',
          padding: collapsed ? '0 10px' : '14px 18px 6px',
          transition: 'opacity 150ms ease, max-height 200ms ease, padding 200ms ease',
        }}
      >
        <span className="micro-label">Panel de control</span>
      </div>

      {/* ── Main nav ── */}
      <nav
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          padding: collapsed ? '8px 6px 4px' : '0 8px 4px',
          transition: 'padding 200ms ease',
          flex: 1,
        }}
      >
        {navItems.map((item) => (
          <button
            key={item.id}
            className={[
              'nav-item',
              active === item.id ? 'nav-item--active' : '',
              collapsed ? 'nav-item--collapsed' : '',
            ].join(' ')}
            onClick={() => onNavigate(item.id)}
            title={collapsed ? item.label : undefined}
          >
            <span className="nav-item-icon">{item.icon}</span>
            <span
              className="nav-item-label"
              style={{
                opacity: collapsed ? 0 : 1,
                maxWidth: collapsed ? 0 : 150,
                flex: 1,
              }}
            >
              {item.label}
            </span>

            {/* Badge de mensajes no leídos en Chat */}
            {item.id === 'chat' && chatUnread > 0 && !collapsed && (
              <span
                style={{
                  background: '#EF4444',
                  color: '#fff',
                  borderRadius: 999,
                  fontSize: 9,
                  fontWeight: 700,
                  padding: '1px 5px',
                  minWidth: 16,
                  textAlign: 'center',
                  lineHeight: '14px',
                  flexShrink: 0,
                }}
              >
                {chatUnread}
              </span>
            )}
            {item.id === 'chat' && chatUnread > 0 && collapsed && (
              <span
                style={{
                  position: 'absolute',
                  top: 4,
                  right: 4,
                  width: 6,
                  height: 6,
                  background: '#EF4444',
                  borderRadius: '50%',
                }}
              />
            )}
          </button>
        ))}
      </nav>

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
        {/* Avatar admin */}
        <div
          style={{
            width: 28, height: 28,
            borderRadius: '50%',
            background: 'rgba(245,158,11,0.1)',
            border: '1px solid rgba(245,158,11,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 10,
            fontWeight: 700,
            color: '#F59E0B',
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
                {adminName}
              </div>
              <div style={{ fontSize: 11, color: '#52525B', marginTop: 2, lineHeight: 1 }}>
                Administrador
              </div>
            </div>

            <button
              className="logout-btn"
              onClick={onLogout}
              aria-label="Cerrar sesión"
            >
              <IconLogout />
            </button>
          </>
        )}
      </div>
    </aside>
  );
}
