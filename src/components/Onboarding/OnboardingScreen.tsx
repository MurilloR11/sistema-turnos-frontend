import { useState, type FormEvent } from 'react';
import { useUser, type UserEstado } from '../../context/UserContext';
import { CustomDropdown } from './CustomDropdown';
import socket from '../../services/socket';

export function OnboardingScreen() {
  const { register } = useUser();
  const [name, setName] = useState('');
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
      style={{ background: '#0C0C0E', fontFamily: "'DM Sans', sans-serif" }}
      role="dialog"
      aria-modal="true"
      aria-label="Registro de usuario"
    >
      <div
        style={{
          width: '100%',
          maxWidth: '380px',
          background: '#111115',
          border: '1px solid #1E1E24',
          borderRadius: '8px',
          padding: '36px 32px',
          animation: 'onboardingIn 400ms cubic-bezier(0.16, 1, 0.3, 1) both',
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
            margin: '0 0 16px',
          }}
        >
          Acceso
        </p>

        {/* Heading */}
        <h1
          style={{
            fontSize: '22px',
            fontWeight: 400,
            letterSpacing: '-0.02em',
            color: '#EDEDED',
            margin: '0 0 8px',
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
            color: '#4B5563',
            margin: '0 0 32px',
            lineHeight: 1.5,
          }}
        >
          Completa los datos para acceder a la aplicación
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate>
          {/* Nombre completo */}
          <div style={{ marginBottom: '28px' }}>
            <label
              htmlFor="onboarding-name"
              style={{
                display: 'block',
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#4B5563',
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
              onFocus={(e) => {
                e.currentTarget.style.borderBottomColor = '#3B82F6';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderBottomColor = '#1E1E24';
              }}
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
                color: '#4B5563',
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
              padding: '13px',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: 400,
              cursor: isFormValid ? 'pointer' : 'not-allowed',
              background: 'transparent',
              border: `1px solid ${isFormValid ? '#3B82F6' : '#1E1E24'}`,
              color: isFormValid ? '#3B82F6' : '#2A2A38',
              transition: 'all 200ms',
              fontFamily: 'inherit',
            }}
            onMouseEnter={(e) => {
              if (isFormValid) {
                e.currentTarget.style.background = '#3B82F6';
                e.currentTarget.style.color = '#FFFFFF';
              }
            }}
            onMouseLeave={(e) => {
              if (isFormValid) {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#3B82F6';
              }
            }}
          >
            Ingresar a la aplicación
          </button>
        </form>
      </div>
    </div>
  );
}
