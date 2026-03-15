import { useState } from 'react';
import { IconPlusCircle } from '../ui/icons';
import { Dot } from '../ui/Dot';
import type { Screen } from '../layout/Sidebar';

interface SolicitarProps {
  onNavigate: (screen: Screen) => void;
}

const priorityOptions: {
  value: string;
  full: string;
  sub: string;
  dot?: 'amber' | 'red';
}[] = [
  { value: 'alta',     full: 'Alta — Emergencia',                 sub: 'Atención inmediata',    dot: 'red'   },
  { value: 'media',    full: 'Media — Embarazada / Adulto mayor', sub: 'Prioridad de atención', dot: 'amber' },
  { value: 'estandar', full: 'Estándar — Consulta normal',        sub: 'Orden de llegada' },
];

export function Solicitar({ onNavigate }: SolicitarProps) {
  const [motivo,    setMotivo]    = useState('');
  const [prioridad, setPrioridad] = useState('');
  const [notas,     setNotas]     = useState('');

  const canSubmit = motivo.trim() !== '' && prioridad !== '';
  const selected  = priorityOptions.find(p => p.value === prioridad);
  const filled    = [motivo.trim() !== '', prioridad !== ''].filter(Boolean).length;

  return (
    <div>
      <h1 className="screen-title">Solicitar turno</h1>
      <p className="screen-subtitle">Completa la información para unirte a la fila de espera</p>

      <form
        style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 22 }}
        onSubmit={(e) => { e.preventDefault(); if (canSubmit) onNavigate('miturno'); }}
      >
        {/* Card header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div className="icon-box icon-box--blue">
            <IconPlusCircle size={15} />
          </div>
          <div>
            <div className="card-header-title">Nuevo turno</div>
            <div className="card-header-sub">{filled}/2 campos requeridos completados</div>
          </div>
        </div>

        {/* Motivo */}
        <div>
          <label className="form-label" htmlFor="sol-motivo">
            Motivo de consulta <span style={{ color: 'var(--red)' }}>*</span>
          </label>
          <input
            id="sol-motivo"
            type="text"
            className="form-input"
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
            placeholder="Ej: Consulta general, control prenatal..."
            autoComplete="off"
          />
        </div>

        {/* Prioridad */}
        <div>
          <label className="form-label" htmlFor="sol-prioridad">
            Prioridad <span style={{ color: 'var(--red)' }}>*</span>
          </label>
          <select
            id="sol-prioridad"
            className="form-input"
            value={prioridad}
            onChange={(e) => setPrioridad(e.target.value)}
            style={{ color: prioridad ? 'var(--text-1)' : 'var(--text-4)' }}
          >
            <option value="" disabled>Selecciona tu prioridad</option>
            {priorityOptions.map(p => (
              <option key={p.value} value={p.value}>{p.full}</option>
            ))}
          </select>

          {selected && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 7,
              marginTop: 8, padding: '7px 10px',
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--r-sm)',
            }}>
              {selected.dot
                ? <Dot color={selected.dot} />
                : <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--text-4)', display: 'inline-block', flexShrink: 0 }} />
              }
              <span style={{ fontSize: 11, color: 'var(--text-3)' }}>{selected.sub}</span>
            </div>
          )}
        </div>

        {/* Notas */}
        <div>
          <label className="form-label" htmlFor="sol-notas">
            Notas adicionales{' '}
            <span style={{ color: 'var(--text-4)', fontWeight: 400 }}>(opcional)</span>
          </label>
          <textarea
            id="sol-notas"
            className="form-input form-textarea"
            value={notas}
            onChange={(e) => setNotas(e.target.value)}
            placeholder="Información adicional relevante..."
            rows={4}
          />
        </div>

        {/* Submit */}
        <div style={{ paddingTop: 4 }}>
          <button type="submit" className="btn-primary" disabled={!canSubmit}>
            Confirmar y solicitar turno
          </button>
          {!canSubmit && (
            <p style={{ fontSize: 11, color: 'var(--text-4)', textAlign: 'center', marginTop: 8 }}>
              Completa los campos requeridos para continuar
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
