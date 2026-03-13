import { useState, type FormEvent } from 'react';
import { useUser, type UserEstado } from '../../context/UserContext';
import { CustomDropdown } from './CustomDropdown';
import socket from '../../services/socket';

export function OnboardingScreen() {
  const { register } = useUser();
  const [name,   setName]   = useState('');
  const [estado, setEstado] = useState<UserEstado | null>(null);

  const isFormValid = name.trim().length > 0 && estado !== null;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid || estado === null) return;
    const trimmedName = name.trim();
    socket.emit('presence:online', { username: trimmedName, estado });
    register({ name: trimmedName, estado });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: '#09090B', fontFamily: "'DM Sans', sans-serif" }}
      role="dialog"
      aria-modal="true"
      aria-label="Registro de usuario"
    >
      <div
        style={{
          width: '100%',
          maxWidth: '380px',
          background: '#111114',
          border: '1px solid #1E1E24',
          borderRadius: '10px',
          padding: '36px 32px',
          animation: 'onboardingIn 380ms cubic-bezier(0.16,1,0.3,1) both',
        }}
      >
        {/* Eyebrow */}
        <p
          style={{
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#3B82F6',
            margin: '0 0 14px',
          }}
        >
          Acceso
        </p>

        {/* Heading */}
        <h1
          style={{
            fontSize: '21px',
            fontWeight: 500,
            letterSpacing: '-0.025em',
            color: '#EDEDED',
            margin: '0 0 6px',
            lineHeight: 1.3,
          }}
        >
          Identifícate para continuar
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: '13px',
            fontWeight: 300,
            color: '#52525B',
            margin: '0 0 32px',
            lineHeight: 1.5,
          }}
        >
          Completa los datos para acceder a la aplicación
        </p>

        <form onSubmit={handleSubmit} noValidate>
          {/* Nombre */}
          <div style={{ marginBottom: '26px' }}>
            <label
              htmlFor="onboarding-name"
              style={{
                display: 'block',
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#52525B',
                marginBottom: '12px',
              }}
            >
              Nombre completo
            </label>
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
              aria-required="true"
              className="block w-full outline-none"
              style={{
                background: 'transparent',
                border: 'none',
                borderBottom: '1px solid #1E1E24',
                padding: '10px 0',
                fontSize: '14px',
                fontWeight: 300,
                color: '#EDEDED',
                transition: 'border-color 200ms',
                fontFamily: 'inherit',
              }}
              onFocus={(e)  => { e.currentTarget.style.borderBottomColor = '#3B82F6'; }}
              onBlur={(e)   => { e.currentTarget.style.borderBottomColor = '#1E1E24'; }}
            />
          </div>

          {/* Estado */}
          <div style={{ marginBottom: '28px' }}>
            <label
              id="estado-label"
              style={{
                display: 'block',
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#52525B',
                marginBottom: '12px',
              }}
            >
              Estado
            </label>
            <CustomDropdown value={estado} onChange={setEstado} />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!isFormValid}
            aria-disabled={!isFormValid}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '7px',
              fontSize: '13px',
              fontWeight: 500,
              cursor: isFormValid ? 'pointer' : 'not-allowed',
              background: isFormValid
                ? 'linear-gradient(180deg,#3B82F6 0%,#2563EB 100%)'
                : 'transparent',
              border: `1px solid ${isFormValid ? 'transparent' : '#1E1E24'}`,
              color: isFormValid ? '#fff' : '#2A2A38',
              transition: 'background 200ms, border-color 200ms, color 200ms',
              fontFamily: 'inherit',
              boxShadow: isFormValid ? '0 1px 2px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)' : 'none',
            }}
          >
            Ingresar a la aplicación
          </button>
        </form>
      </div>
    </div>
  );
}
