import { useState } from 'react';

// ── Iconos ────────────────────────────────────────────────────────────────────
const sv = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.75, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
function IconCheck() { return <svg width={14} height={14} viewBox="0 0 24 24" {...sv}><polyline points="20 6 9 17 4 12"/></svg>; }
function IconSave()  { return <svg width={14} height={14} viewBox="0 0 24 24" {...sv}><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>; }

// ── Config types ──────────────────────────────────────────────────────────────
interface Config {
  capacidadMaxima: number;
  tiempoPorTurno: number;
  horarioDesde: string;
  horarioHasta: string;
  mensajeBienvenida: string;
  estadoSistema: 'abierto' | 'cerrado' | 'pausa';
  prioridadAlta: number;
  prioridadMedia: number;
}

const defaultConfig: Config = {
  capacidadMaxima:   50,
  tiempoPorTurno:    12,
  horarioDesde:      '08:00',
  horarioHasta:      '17:00',
  mensajeBienvenida: 'Bienvenido al sistema de atención de turnos. Por favor ingrese sus datos para continuar.',
  estadoSistema:     'abierto',
  prioridadAlta:     3,
  prioridadMedia:    2,
};

// ── Componente ────────────────────────────────────────────────────────────────
export function AdminConfiguracion() {
  const [config, setConfig]   = useState<Config>(defaultConfig);
  const [saved,  setSaved]    = useState(false);
  const [saving, setSaving]   = useState(false);

  const update = <K extends keyof Config>(key: K, value: Config[K]) => {
    setConfig((c) => ({ ...c, [key]: value }));
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 900));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const estadoOptions: { value: Config['estadoSistema']; label: string; cls: string }[] = [
    { value: 'abierto', label: 'Abierto',      cls: 'badge badge--green' },
    { value: 'pausa',   label: 'En pausa',      cls: 'badge badge--amber' },
    { value: 'cerrado', label: 'Cerrado',       cls: 'badge badge--red' },
  ];

  return (
    <div style={{ maxWidth: 720 }}>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h1 className="screen-title">Configuración</h1>
        <p className="screen-subtitle">Parámetros de operación del sistema de turnos</p>
      </div>

      {/* Estado del sistema — destacado */}
      <div className="main-card" style={{ marginBottom: 16 }}>
        <div style={{ marginBottom: 16 }}>
          <div className="card-header-title">Estado del sistema</div>
          <div className="card-header-sub">Controla si el sistema acepta nuevos turnos</div>
        </div>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {estadoOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => update('estadoSistema', opt.value)}
              style={{
                background: config.estadoSistema === opt.value
                  ? opt.value === 'abierto'  ? 'rgba(34,197,94,0.1)'
                  : opt.value === 'pausa'    ? 'rgba(245,158,11,0.1)'
                  : 'rgba(239,68,68,0.1)'
                  : 'transparent',
                border: `1px solid ${
                  config.estadoSistema === opt.value
                    ? opt.value === 'abierto'  ? 'rgba(34,197,94,0.3)'
                    : opt.value === 'pausa'    ? 'rgba(245,158,11,0.3)'
                    : 'rgba(239,68,68,0.3)'
                    : '#1E1E23'
                }`,
                borderRadius: 8,
                padding: '10px 20px',
                fontSize: 13,
                fontWeight: 500,
                color: config.estadoSistema === opt.value
                  ? opt.value === 'abierto' ? '#22C55E' : opt.value === 'pausa' ? '#F59E0B' : '#EF4444'
                  : '#71717A',
                cursor: 'pointer',
                transition: 'all 150ms ease',
                fontFamily: 'inherit',
                display: 'flex',
                alignItems: 'center',
                gap: 7,
              }}
            >
              {config.estadoSistema === opt.value && <IconCheck />}
              {opt.label}
            </button>
          ))}
        </div>

        {/* Toggle on/off visual */}
        <div
          style={{
            marginTop: 16,
            paddingTop: 16,
            borderTop: '1px solid #1E1E23',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ fontSize: 13, fontWeight: 500, color: '#FAFAFA' }}>Sistema activo</div>
            <div style={{ fontSize: 11, color: '#52525B', marginTop: 2 }}>
              {config.estadoSistema === 'abierto' ? 'Recibiendo nuevos turnos' : 'No acepta nuevos turnos'}
            </div>
          </div>
          <button
            onClick={() =>
              update('estadoSistema', config.estadoSistema === 'abierto' ? 'cerrado' : 'abierto')
            }
            style={{
              width: 44,
              height: 24,
              borderRadius: 12,
              background: config.estadoSistema === 'abierto' ? '#22C55E' : '#27272A',
              border: 'none',
              cursor: 'pointer',
              position: 'relative',
              transition: 'background 200ms ease',
              flexShrink: 0,
            }}
          >
            <span
              style={{
                position: 'absolute',
                top: 3,
                left: config.estadoSistema === 'abierto' ? 23 : 3,
                width: 18,
                height: 18,
                borderRadius: '50%',
                background: '#fff',
                transition: 'left 200ms ease',
                boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
              }}
            />
          </button>
        </div>
      </div>

      {/* Config general */}
      <div className="main-card" style={{ marginBottom: 16 }}>
        <div style={{ marginBottom: 16 }}>
          <div className="card-header-title">Configuración general</div>
          <div className="card-header-sub">Parámetros operativos de la fila</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <div>
            <label className="form-label">Capacidad máxima de la fila</label>
            <input
              type="number"
              className="form-input"
              min={1} max={500}
              value={config.capacidadMaxima}
              onChange={(e) => update('capacidadMaxima', Number(e.target.value))}
            />
            <span style={{ fontSize: 11, color: '#52525B', marginTop: 5, display: 'block' }}>
              Personas máximas en espera simultánea
            </span>
          </div>

          <div>
            <label className="form-label">Tiempo estimado por turno (min)</label>
            <input
              type="number"
              className="form-input"
              min={1} max={120}
              value={config.tiempoPorTurno}
              onChange={(e) => update('tiempoPorTurno', Number(e.target.value))}
            />
            <span style={{ fontSize: 11, color: '#52525B', marginTop: 5, display: 'block' }}>
              Usado para calcular el tiempo estimado de espera
            </span>
          </div>

          <div>
            <label className="form-label">Horario de atención — desde</label>
            <input
              type="time"
              className="form-input"
              value={config.horarioDesde}
              onChange={(e) => update('horarioDesde', e.target.value)}
            />
          </div>

          <div>
            <label className="form-label">Horario de atención — hasta</label>
            <input
              type="time"
              className="form-input"
              value={config.horarioHasta}
              onChange={(e) => update('horarioHasta', e.target.value)}
            />
          </div>
        </div>

        <div style={{ marginTop: 20 }}>
          <label className="form-label">Mensaje de bienvenida</label>
          <textarea
            className="form-input form-textarea"
            value={config.mensajeBienvenida}
            onChange={(e) => update('mensajeBienvenida', e.target.value)}
            rows={3}
          />
          <span style={{ fontSize: 11, color: '#52525B', marginTop: 5, display: 'block' }}>
            Se muestra en la pantalla de inicio para los usuarios
          </span>
        </div>
      </div>

      {/* Prioridades */}
      <div className="main-card" style={{ marginBottom: 24 }}>
        <div style={{ marginBottom: 16 }}>
          <div className="card-header-title">Configuración de prioridades</div>
          <div className="card-header-sub">Cuántos lugares adelanta cada nivel de prioridad en la fila</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <div>
            <label className="form-label">
              Prioridad alta
              <span className="badge badge--red" style={{ marginLeft: 8, fontSize: 10 }}>Alta</span>
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <input
                type="range"
                min={1} max={10}
                value={config.prioridadAlta}
                onChange={(e) => update('prioridadAlta', Number(e.target.value))}
                style={{ flex: 1, accentColor: '#EF4444' }}
              />
              <span className="mono" style={{ fontSize: 16, fontWeight: 600, color: '#EF4444', minWidth: 28, textAlign: 'center' }}>
                {config.prioridadAlta}
              </span>
            </div>
            <span style={{ fontSize: 11, color: '#52525B', marginTop: 4, display: 'block' }}>
              Avanza {config.prioridadAlta} posiciones en la fila
            </span>
          </div>

          <div>
            <label className="form-label">
              Prioridad media
              <span className="badge badge--amber" style={{ marginLeft: 8, fontSize: 10 }}>Media</span>
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <input
                type="range"
                min={1} max={10}
                value={config.prioridadMedia}
                onChange={(e) => update('prioridadMedia', Number(e.target.value))}
                style={{ flex: 1, accentColor: '#F59E0B' }}
              />
              <span className="mono" style={{ fontSize: 16, fontWeight: 600, color: '#F59E0B', minWidth: 28, textAlign: 'center' }}>
                {config.prioridadMedia}
              </span>
            </div>
            <span style={{ fontSize: 11, color: '#52525B', marginTop: 4, display: 'block' }}>
              Avanza {config.prioridadMedia} posiciones en la fila
            </span>
          </div>
        </div>

        {/* Resumen */}
        <div
          style={{
            marginTop: 16,
            padding: '12px 14px',
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid #1E1E23',
            borderRadius: 8,
          }}
        >
          <div className="micro-label" style={{ marginBottom: 8 }}>Resumen del sistema de prioridades</div>
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            {[
              { label: 'Estándar', color: '#71717A', value: 'Sin avance (posición natural)' },
              { label: 'Media',    color: '#F59E0B', value: `Avanza ${config.prioridadMedia} posiciones` },
              { label: 'Alta',     color: '#EF4444', value: `Avanza ${config.prioridadAlta} posiciones` },
            ].map((item) => (
              <div key={item.label} style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: item.color, flexShrink: 0 }} />
                <span style={{ fontSize: 12, color: item.color, fontWeight: 500 }}>{item.label}:</span>
                <span style={{ fontSize: 12, color: '#52525B' }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Guardar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button
          className="btn-primary"
          style={{
            width: 'auto',
            padding: '10px 24px',
            gap: 7,
            background: saved
              ? 'linear-gradient(180deg,#22C55E 0%,#16A34A 100%)'
              : undefined,
          }}
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? (
            <span style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <SpinnerIcon />
              Guardando...
            </span>
          ) : saved ? (
            <span style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <IconCheck />
              Cambios guardados
            </span>
          ) : (
            <span style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <IconSave />
              Guardar configuración
            </span>
          )}
        </button>

        {saved && (
          <span style={{ fontSize: 12, color: '#22C55E', animation: 'onboardingIn 300ms ease both' }}>
            Configuración actualizada correctamente
          </span>
        )}
      </div>
    </div>
  );
}

function SpinnerIcon() {
  return (
    <svg
      width={14}
      height={14}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      style={{ animation: 'spin 0.7s linear infinite' }}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </svg>
  );
}
