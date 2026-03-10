import { useState } from 'react';
import { IconPlusCircle } from '../ui/icons';
import type { Screen } from '../Sidebar';

interface SolicitarProps {
  onNavigate: (screen: Screen) => void;
}

const labelStyle: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 500,
  color: '#A1A1AA',
  marginBottom: 6,
  display: 'block',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: '#111114',
  border: '1px solid #1E1E23',
  borderRadius: 8,
  padding: '10px 12px',
  fontSize: 13,
  color: '#FAFAFA',
  fontFamily: "'Inter', sans-serif",
  outline: 'none',
  transition: 'border-color 150ms ease',
};

const selectStyle: React.CSSProperties = {
  ...inputStyle,
  appearance: 'none' as const,
  backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%2371717A' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 12px center',
  paddingRight: 32,
};

function ConfirmarButton({ onNavigate, disabled }: { onNavigate: (s: Screen) => void; disabled: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      className="btn-primary"
      disabled={disabled}
      style={{
        background: disabled
          ? '#27272A'
          : hovered
            ? 'linear-gradient(180deg, #2563EB 0%, #1D4ED8 100%)'
            : 'linear-gradient(180deg, #3B82F6 0%, #2563EB 100%)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => !disabled && onNavigate('miturno')}
    >
      Confirmar y solicitar turno
    </button>
  );
}

export function Solicitar({ onNavigate }: SolicitarProps) {
  const [motivo, setMotivo] = useState('');
  const [prioridad, setPrioridad] = useState('');
  const [notas, setNotas] = useState('');

  const canSubmit = motivo.trim() !== '' && prioridad !== '';

  return (
    <div>
      <h1
        style={{
          fontSize: 18,
          fontWeight: 600,
          color: '#FAFAFA',
          letterSpacing: '-0.02em',
          margin: 0,
        }}
      >
        Solicitar turno
      </h1>
      <p style={{ fontSize: 13, color: '#71717A', marginTop: 4 }}>
        Completa la información para unirte a la fila
      </p>

      <div style={{ maxWidth: 480, marginTop: 20 }}>
        {/* Header row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          <div className="icon-box icon-box--blue">
            <IconPlusCircle size={15} />
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#FAFAFA' }}>
              Nuevo turno
            </div>
            <div style={{ fontSize: 12, color: '#52525B', marginTop: 1 }}>
              Llena los campos requeridos
            </div>
          </div>
        </div>

        {/* Motivo */}
        <div style={{ marginBottom: 16 }}>
          <label style={labelStyle}>
            Motivo de consulta <span style={{ color: '#EF4444' }}>*</span>
          </label>
          <input
            type="text"
            value={motivo}
            onChange={e => setMotivo(e.target.value)}
            placeholder="Ej: Consulta general, control prenatal..."
            style={inputStyle}
            onFocus={e => { e.currentTarget.style.borderColor = '#3B82F6'; }}
            onBlur={e => { e.currentTarget.style.borderColor = '#1E1E23'; }}
          />
        </div>

        {/* Prioridad */}
        <div style={{ marginBottom: 16 }}>
          <label style={labelStyle}>
            Prioridad <span style={{ color: '#EF4444' }}>*</span>
          </label>
          <select
            value={prioridad}
            onChange={e => setPrioridad(e.target.value)}
            style={{
              ...selectStyle,
              color: prioridad ? '#FAFAFA' : '#52525B',
            }}
            onFocus={e => { e.currentTarget.style.borderColor = '#3B82F6'; }}
            onBlur={e => { e.currentTarget.style.borderColor = '#1E1E23'; }}
          >
            <option value="" disabled>Selecciona tu prioridad</option>
            <option value="alta">Alta — Emergencia</option>
            <option value="media">Media — Embarazada / Adulto mayor</option>
            <option value="estandar">Estándar — Consulta normal</option>
          </select>
        </div>

        {/* Notas */}
        <div style={{ marginBottom: 20 }}>
          <label style={labelStyle}>
            Notas adicionales <span style={{ color: '#52525B', fontWeight: 400 }}>(opcional)</span>
          </label>
          <textarea
            value={notas}
            onChange={e => setNotas(e.target.value)}
            placeholder="Información adicional relevante..."
            rows={3}
            style={{
              ...inputStyle,
              resize: 'vertical',
              minHeight: 72,
            }}
            onFocus={e => { e.currentTarget.style.borderColor = '#3B82F6'; }}
            onBlur={e => { e.currentTarget.style.borderColor = '#1E1E23'; }}
          />
        </div>

        {/* Info summary */}
        {canSubmit && (
          <div
            style={{
              background: 'rgba(59,130,246,0.04)',
              border: '1px solid rgba(59,130,246,0.1)',
              borderRadius: 8,
              padding: '12px 14px',
              marginBottom: 16,
              fontSize: 12,
              color: '#A1A1AA',
              lineHeight: 1.6,
            }}
          >
            <span style={{ color: '#71717A' }}>Motivo:</span>{' '}
            <span style={{ color: '#FAFAFA' }}>{motivo}</span>
            <br />
            <span style={{ color: '#71717A' }}>Prioridad:</span>{' '}
            <span style={{ color: '#FAFAFA', textTransform: 'capitalize' }}>{prioridad}</span>
            {notas && (
              <>
                <br />
                <span style={{ color: '#71717A' }}>Notas:</span>{' '}
                <span style={{ color: '#FAFAFA' }}>{notas}</span>
              </>
            )}
          </div>
        )}

        <ConfirmarButton onNavigate={onNavigate} disabled={!canSubmit} />
      </div>
    </div>
  );
}
