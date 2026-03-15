import { useState, useEffect } from 'react';
import { AdminSidebar } from './AdminSidebar';
import { AdminTopbar } from './AdminTopbar';
import { AdminDashboard } from './screens/AdminDashboard';
import { AdminCola } from './screens/AdminCola';
import { AdminHistorial } from './screens/AdminHistorial';
import { AdminUsuarios } from './screens/AdminUsuarios';
import { AdminConfiguracion } from './screens/AdminConfiguracion';
import { AdminMonitor } from './screens/AdminMonitor';
import { AdminChat } from './screens/AdminChat';

export type AdminScreen =
  | 'dashboard'
  | 'cola'
  | 'historial'
  | 'usuarios'
  | 'chat'
  | 'monitor'
  | 'configuracion';

const screenTitles: Record<AdminScreen, string> = {
  dashboard:      'Dashboard',
  cola:           'Gestión de fila',
  historial:      'Historial',
  usuarios:       'Usuarios',
  chat:           'Chat / Soporte',
  monitor:        'Monitor',
  configuracion:  'Configuración',
};

interface AdminAppProps {
  adminName?: string;
  onLogout: () => void;
}

export function AdminApp({ adminName = 'Administrador', onLogout }: AdminAppProps) {
  const [screen, setScreen]     = useState<AdminScreen>('dashboard');
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile]   = useState(() => window.innerWidth < 768);
  const [chatUnread, setChatUnread] = useState(3);

  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) setCollapsed(true);
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handleNavigate = (s: AdminScreen) => {
    setScreen(s);
    if (s === 'chat') setChatUnread(0);
    if (isMobile) setCollapsed(true);
  };

  const isMonitor = screen === 'monitor';
  const isChat    = screen === 'chat';

  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        background: '#09090B',
        color: '#FAFAFA',
      }}
    >
      {/* Overlay mobile */}
      {isMobile && !collapsed && (
        <div
          onClick={() => setCollapsed(true)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 40 }}
        />
      )}

      {/* Sidebar — oculto en monitor */}
      {!isMonitor && (
        <AdminSidebar
          active={screen}
          collapsed={collapsed}
          mobile={isMobile}
          chatUnread={chatUnread}
          adminName={adminName}
          onNavigate={handleNavigate}
          onLogout={onLogout}
        />
      )}

      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          minWidth: 0,
          background: '#09090B',
        }}
      >
        {/* Topbar — oculto en monitor */}
        {!isMonitor && (
          <AdminTopbar
            title={screenTitles[screen]}
            screen={screen}
            collapsed={collapsed}
            onToggleCollapse={() => setCollapsed((c) => !c)}
          />
        )}

        <main
          style={{
            flex: 1,
            overflowY: isMonitor || isChat ? 'hidden' : 'auto',
            padding: isMonitor
              ? '0'
              : isMobile
              ? '16px 12px'
              : '28px 32px',
            background: '#09090B',
          }}
        >
          {screen === 'dashboard'    && <AdminDashboard />}
          {screen === 'cola'         && <AdminCola />}
          {screen === 'historial'    && <AdminHistorial />}
          {screen === 'usuarios'     && <AdminUsuarios />}
          {screen === 'chat'         && <AdminChat />}
          {screen === 'monitor'      && <AdminMonitor onExit={() => setScreen('dashboard')} />}
          {screen === 'configuracion' && <AdminConfiguracion />}
        </main>
      </div>
    </div>
  );
}
