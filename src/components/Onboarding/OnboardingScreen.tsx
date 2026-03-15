import React, { useState } from 'react';
import { useUser, type UserEstado } from '../../context/UserContext';
import { CustomDropdown } from './CustomDropdown';
import socket from '../../services/socket';

type View = 'user' | 'admin';


/* ── Shared input underline style ── */
const inputBase: React.CSSProperties = {
  background: 'transparent',
  border: 'none',
  borderBottom: '1px solid #1E1E24',
  padding: '10px 0',
  fontSize: '14px',
  fontWeight: 300,
  color: '#EDEDED',
  width: '100%',
  outline: 'none',
  fontFamily: 'inherit',
  transition: 'border-color 200ms',
};

const labelBase: React.CSSProperties = {
  display: 'block',
  fontSize: '11px',
  fontWeight: 500,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: '#52525B',
  marginBottom: '12px',
};

const eyebrow: React.CSSProperties = {
  fontSize: '11px',
  fontWeight: 500,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: '#3B82F6',
  margin: '0 0 14px',
};

const heading: React.CSSProperties = {
  fontSize: '21px',
  fontWeight: 500,
  letterSpacing: '-0.025em',
  color: '#EDEDED',
  margin: '0 0 6px',
  lineHeight: 1.3,
};

const subheading: React.CSSProperties = {
  fontSize: '13px',
  fontWeight: 300,
  color: '#52525B',
  margin: '0 0 32px',
  lineHeight: 1.5,
};

function submitBtn(active: boolean): React.CSSProperties {
  return {
    width: '100%',
    padding: '12px',
    borderRadius: '7px',
    fontSize: '13px',
    fontWeight: 500,
    cursor: active ? 'pointer' : 'not-allowed',
    background: active ? 'linear-gradient(180deg,#3B82F6 0%,#2563EB 100%)' : 'transparent',
    border: `1px solid ${active ? 'transparent' : '#1E1E24'}`,
    color: active ? '#fff' : '#2A2A38',
    transition: 'background 200ms, border-color 200ms, color 200ms',
    fontFamily: 'inherit',
    boxShadow: active ? '0 1px 2px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)' : 'none',
  };
}

interface OnboardingScreenProps {
  onAdminLogin?: (name: string) => void;
}

export function OnboardingScreen({ onAdminLogin }: OnboardingScreenProps) {
  const { register } = useUser();

  const [view,      setView]      = useState<View>('user');
  const [direction, setDirection] = useState<'fwd' | 'back'>('fwd');

  /* user form */
  const [name,   setName]   = useState('');
  const [estado, setEstado] = useState<UserEstado | null>(null);

  /* admin form */
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');

  const isUserValid  = name.trim().length > 0 && estado !== null;
  const isAdminValid = email.trim().length > 0 && password.length > 0;

  const goAdmin = () => { setDirection('fwd');  setView('admin'); };
  const goBack  = () => { setDirection('back'); setView('user');  };

  const handleUser = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!isUserValid || estado === null) return;
    const trimmedName = name.trim();
    socket.emit('presence:online', { username: trimmedName, estado });
    register({ name: trimmedName, estado });
  };

  const handleAdmin = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (isAdminValid) {
      onAdminLogin?.('Administrador');
    }
  };

  const animName = direction === 'fwd' ? 'cardSlideRight' : 'cardSlideLeft';

  const card: React.CSSProperties = {
    width: '100%',
    maxWidth: '380px',
    background: '#111114',
    border: '1px solid #1E1E24',
    borderRadius: '10px',
    padding: '36px 32px',
    animation: `${animName} 340ms cubic-bezier(0.16,1,0.3,1) both`,
  };

  return (
    <>
      <style>{`
        @keyframes cardSlideRight {
          from { opacity: 0; transform: translateX(32px) scale(0.985); }
          to   { opacity: 1; transform: translateX(0)    scale(1);     }
        }
        @keyframes cardSlideLeft {
          from { opacity: 0; transform: translateX(-32px) scale(0.985); }
          to   { opacity: 1; transform: translateX(0)     scale(1);     }
        }
      `}</style>

      <div
        className="fixed inset-0 z-50 flex items-center justify-center px-4"
        style={{ background: '#09090B', fontFamily: "'DM Sans', sans-serif", overflow: 'hidden' }}
        role="dialog"
        aria-modal="true"
      >

        {/* ══════════════ TARJETA USUARIO ══════════════ */}
        {view === 'user' && (
          <div style={card}>
            <p style={eyebrow}>Acceso</p>
            <h1 style={heading}>Identifícate para continuar</h1>
            <p style={subheading}>Completa los datos para acceder a la aplicación</p>

            <form onSubmit={handleUser} noValidate>
              {/* Nombre */}
              <div style={{ marginBottom: '26px' }}>
                <label htmlFor="onboarding-name" style={labelBase}>Nombre completo</label>
                <input
                  id="onboarding-name"
                  type="text"
                  placeholder="Tu nombre y apellido"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  autoComplete="name"
                  autoFocus
                  maxLength={100}
                  className="block w-full outline-none"
                  style={inputBase}
                  onFocus={(e) => { e.currentTarget.style.borderBottomColor = '#3B82F6'; }}
                  onBlur={(e)  => { e.currentTarget.style.borderBottomColor = '#1E1E24'; }}
                />
              </div>

              {/* Estado */}
              <div style={{ marginBottom: '28px' }}>
                <label id="estado-label" style={labelBase}>Estado</label>
                <CustomDropdown value={estado} onChange={setEstado} />
              </div>

              <button type="submit" disabled={!isUserValid} style={submitBtn(isUserValid)}>
                Ingresar a la aplicación
              </button>
            </form>

            {/* Link admin */}
            <div style={{ marginTop: '22px', paddingTop: '18px', borderTop: '1px solid #1E1E24', textAlign: 'center' }}>
              <button
                type="button"
                onClick={goAdmin}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontSize: '12px', color: '#52525B', fontFamily: 'inherit',
                  transition: 'color 150ms ease',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = '#3B82F6'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = '#52525B'; }}
              >
                ¿Eres administrador? Inicia sesión aquí
              </button>
            </div>
          </div>
        )}

        {/* ══════════════ TARJETA ADMIN ══════════════ */}
        {view === 'admin' && (
          <div style={card}>
            {/* Back button */}
            <button
              type="button"
              onClick={goBack}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                fontSize: '12px', color: '#52525B', fontFamily: 'inherit',
                marginBottom: '24px', padding: 0,
                transition: 'color 150ms ease',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = '#EDEDED'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = '#52525B'; }}
            >
              <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              Volver
            </button>

            <p style={eyebrow}>Administrador</p>
            <h1 style={heading}>Acceso al panel</h1>
            <p style={subheading}>Ingresa tus credenciales de administrador</p>

            <form onSubmit={handleAdmin} noValidate>
              {/* Email */}
              <div style={{ marginBottom: '26px' }}>
                <label htmlFor="admin-email" style={labelBase}>Correo electrónico</label>
                <input
                  id="admin-email"
                  type="email"
                  placeholder="admin@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  autoFocus
                  className="block w-full outline-none"
                  style={inputBase}
                  onFocus={(e) => { e.currentTarget.style.borderBottomColor = '#3B82F6'; }}
                  onBlur={(e)  => { e.currentTarget.style.borderBottomColor = '#1E1E24'; }}
                />
              </div>

              {/* Contraseña */}
              <div style={{ marginBottom: '28px' }}>
                <label htmlFor="admin-password" style={labelBase}>Contraseña</label>
                <input
                  id="admin-password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="block w-full outline-none"
                  style={inputBase}
                  onFocus={(e) => { e.currentTarget.style.borderBottomColor = '#3B82F6'; }}
                  onBlur={(e)  => { e.currentTarget.style.borderBottomColor = '#1E1E24'; }}
                />
              </div>

              <button type="submit" disabled={!isAdminValid} style={submitBtn(isAdminValid)}>
                Iniciar sesión como administrador
              </button>
            </form>
          </div>
        )}

      </div>
    </>
  );
}
