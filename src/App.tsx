import { useState, useEffect } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Topbar } from './components/layout/Topbar';
import { Inicio } from './components/screens/Inicio';
import { MiTurno } from './components/screens/MiTurno';
import { Solicitar } from './components/screens/Solicitar';
import { Chat } from './components/Chat/Chat';
import { OnboardingScreen } from './components/Onboarding/OnboardingScreen';
import { AdminApp } from './admin/AdminApp';
import { useUser } from './context/UserContext';
import type { Screen } from './components/layout/Sidebar';
import './index.css';

const screenTitles: Record<Screen, string> = {
  inicio:    'Inicio',
  miturno:   'Mi Turno',
  solicitar: 'Solicitar',
  chat:      'Chat',
};

function App() {
  const { isRegistered, clear } = useUser();
  const [screen, setScreen] = useState<Screen>('inicio');
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  const [adminName, setAdminName] = useState<string | null>(null);

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

  if (adminName !== null) {
    return <AdminApp adminName={adminName} onLogout={() => setAdminName(null)} />;
  }

  if (!isRegistered) {
    return <OnboardingScreen onAdminLogin={(name) => setAdminName(name)} />;
  }

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
      {isMobile && !collapsed && (
        <div
          onClick={() => setCollapsed(true)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.6)',
            zIndex: 40,
          }}
        />
      )}

      <Sidebar
        active={screen}
        collapsed={collapsed}
        mobile={isMobile}
        onNavigate={(s) => { setScreen(s); if (isMobile) setCollapsed(true); }}
        onLogout={clear}
      />

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
        <Topbar
          title={screenTitles[screen]}
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed((c) => !c)}
          isChat={screen === 'chat'}
        />

        <main
          style={{
            flex: 1,
            overflowY: screen === 'chat' ? 'hidden' : 'auto',
            padding: screen === 'chat'
              ? (isMobile ? '0 12px' : '0 32px')
              : (isMobile ? '16px 12px' : '28px 32px'),
            background: '#09090B',
          }}
        >
          {screen === 'inicio'    && <Inicio    onNavigate={setScreen} />}
          {screen === 'miturno'  && <MiTurno />}
          {screen === 'solicitar' && <Solicitar onNavigate={setScreen} />}
          {screen === 'chat'      && <Chat />}
        </main>
      </div>
    </div>
  );
}

export default App;


