import { useState } from 'react';
import { IconPlusCircle } from '../ui/icons';
import type { Screen } from '../Sidebar';

interface SolicitarProps {
  onNavigate: (screen: Screen) => void;
}

const priorityLabels: Record<string, string> = {
  alta:     'Alta — Emergencia',
  media:    'Media — Embarazada / Adulto mayor',
  estandar: 'Estándar — Consulta normal',
};

export function Solicitar({ onNavigate }: SolicitarProps) {
  const [motivo,   setMotivo]   = useState('');
  const [prioridad, setPrioridad] = useState('');
  const [notas,    setNotas]    = useState('');

  const canSubmit = motivo.trim() !== '' && prioridad !== '';

  return (
    <div>
      <h1 className="screen-title">Solicitar turno</h1>
      <p className="screen-subtitle">Completa la información para unirte a la fila</p>

      <div style={{ maxWidth: 480, marginTop: 24 }}>
        {/* Card header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 22 }}>
          <div className="icon-box icon-box--blue">
            <IconPlusCircle size={15} />
          </div>
          <div>
            <div className="card-header-title">Nuevo turno</div>
            <div className="card-header-sub">Completa los campos requeridos</div>
          </div>
        </div>

        {/* Motivo */}
        <div style={{ marginBottom: 18 }}>
          <label className="form-label" htmlFor="sol-motivo">
            Motivo de consulta <span style={{ color: '#EF4444' }}>*</span>
          </label>
          <input
            id="sol-motivo"
            type="text"
            className="form-input"
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
            placeholder="Ej: Consulta general, control prenatal..."
          />
        </div>

        {/* Prioridad */}
        <div style={{ marginBottom: 18 }}>
          <label className="form-label" htmlFor="sol-prioridad">
            Prioridad <span style={{ color: '#EF4444' }}>*</span>
          </label>
          <select
            id="sol-prioridad"
            className="form-input"
            value={prioridad}
            onChange={(e) => setPrioridad(e.target.value)}
            style={{ color: prioridad ? '#FAFAFA' : '#52525B' }}
          >
            <option value="" disabled>Selecciona tu prioridad</option>
            <option value="alta">Alta — Emergencia</option>
            <option value="media">Media — Embarazada / Adulto mayor</option>
            <option value="estandar">Estándar — Consulta normal</option>
          </select>
        </div>

        {/* Notas */}
        <div style={{ marginBottom: 20 }}>
          <label className="form-label" htmlFor="sol-notas">
            Notas adicionales{' '}
            <span style={{ color: '#52525B', fontWeight: 400 }}>(opcional)</span>
          </label>
          <textarea
            id="sol-notas"
            className="form-input form-textarea"
            value={notas}
            onChange={(e) => setNotas(e.target.value)}
            placeholder="Información adicional relevante..."
            rows={3}
          />
        </div>

        {/* Preview summary */}
        {canSubmit && (
          <div
            style={{
              background: 'rgba(59,130,246,0.04)',
              border: '1px solid rgba(59,130,246,0.1)',
              borderRadius: 8,
              padding: '12px 14px',
              marginBottom: 16,
            }}
          >
            <div className="micro-label" style={{ marginBottom: 8 }}>Resumen</div>
            <div style={{ fontSize: 12, color: '#A0A0AB', lineHeight: 1.7 }}>
              <span style={{ color: '#52525B' }}>Motivo: </span>
              <span style={{ color: '#FAFAFA' }}>{motivo}</span>
              <br />
              <span style={{ color: '#52525B' }}>Prioridad: </span>
              <span style={{ color: '#FAFAFA' }}>{priorityLabels[prioridad] ?? prioridad}</span>
              {notas && (
                <>
                  <br />
                  <span style={{ color: '#52525B' }}>Notas: </span>
                  <span style={{ color: '#FAFAFA' }}>{notas}</span>
                </>
              )}
            </div>
          </div>
        )}

        <button
          className="btn-primary"
          disabled={!canSubmit}
          onClick={() => canSubmit && onNavigate('miturno')}
        >
          Confirmar y solicitar turno
        </button>
      </div>
    </div>
  );
}
