import { useState, useEffect } from 'react'
import './App.css'

interface Turno {
  id: number
  paciente: string
  fecha: string
  hora: string
  doctor: string
  especialidad: string
  estado: 'confirmado' | 'pendiente' | 'cancelado'
}

interface TurnosResponse {
  turnos: Turno[]
  total: number
}

function App() {
  const [turnos, setTurnos] = useState<Turno[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filtroEstado, setFiltroEstado] = useState<string>('todos')
  const [filtroEspecialidad, setFiltroEspecialidad] = useState<string>('todos')
  const [busqueda, setBusqueda] = useState('')

  useEffect(() => {
    fetchTurnos()
  }, [])

  const fetchTurnos = async () => {
    try {
      setLoading(true)
      const response = await fetch('https://sistema-turnos-backend.murillosantiago28.workers.dev/api/turnos')
      if (!response.ok) throw new Error('Error al cargar los turnos')
      const data: TurnosResponse = await response.json()
      setTurnos(data.turnos)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
    } finally {
      setLoading(false)
    }
  }

  const especialidades = [...new Set(turnos.map(t => t.especialidad))]
  
  const turnosFiltrados = turnos.filter(turno => {
    const matchEstado = filtroEstado === 'todos' || turno.estado === filtroEstado
    const matchEspecialidad = filtroEspecialidad === 'todos' || turno.especialidad === filtroEspecialidad
    const matchBusqueda = busqueda === '' || 
      turno.paciente.toLowerCase().includes(busqueda.toLowerCase()) ||
      turno.doctor.toLowerCase().includes(busqueda.toLowerCase())
    return matchEstado && matchEspecialidad && matchBusqueda
  })

  const formatearFecha = (fecha: string) => {
    const date = new Date(fecha + 'T00:00:00')
    return date.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  }

  const getEstadoBadgeClass = (estado: string) => {
    switch (estado) {
      case 'confirmado': return 'badge-confirmado'
      case 'pendiente': return 'badge-pendiente'
      case 'cancelado': return 'badge-cancelado'
      default: return ''
    }
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Cargando turnos...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-icon">⚠️</div>
        <h2>Error al cargar los turnos</h2>
        <p>{error}</p>
        <button onClick={fetchTurnos} className="btn-retry">Reintentar</button>
      </div>
    )
  }

  return (
    <div className="app-container">
      <header className="header">
        <div className="header-content">
          <div className="header-title">
            <h1>🏥 Sistema de Turnos Médicos</h1>
            <p className="subtitle">Gestión de citas y consultas</p>
          </div>
          <div className="header-stats">
            <div className="stat-card">
              <span className="stat-number">{turnos.length}</span>
              <span className="stat-label">Total</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">{turnos.filter(t => t.estado === 'confirmado').length}</span>
              <span className="stat-label">Confirmados</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">{turnos.filter(t => t.estado === 'pendiente').length}</span>
              <span className="stat-label">Pendientes</span>
            </div>
          </div>
        </div>
      </header>

      <div className="filters-section">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Buscar por paciente o doctor..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filters">
          <select 
            value={filtroEstado} 
            onChange={(e) => setFiltroEstado(e.target.value)}
            className="filter-select"
          >
            <option value="todos">Todos los estados</option>
            <option value="confirmado">Confirmado</option>
            <option value="pendiente">Pendiente</option>
            <option value="cancelado">Cancelado</option>
          </select>

          <select 
            value={filtroEspecialidad} 
            onChange={(e) => setFiltroEspecialidad(e.target.value)}
            className="filter-select"
          >
            <option value="todos">Todas las especialidades</option>
            {especialidades.map(esp => (
              <option key={esp} value={esp}>{esp}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="turnos-grid">
        {turnosFiltrados.length === 0 ? (
          <div className="no-results">
            <span className="no-results-icon">📋</span>
            <h3>No se encontraron turnos</h3>
            <p>Intenta ajustar los filtros de búsqueda</p>
          </div>
        ) : (
          turnosFiltrados.map(turno => (
            <div key={turno.id} className="turno-card">
              <div className="turno-header">
                <div className="turno-id">#{turno.id}</div>
                <span className={`badge ${getEstadoBadgeClass(turno.estado)}`}>
                  {turno.estado}
                </span>
              </div>
              
              <div className="turno-body">
                <div className="paciente-info">
                  <span className="icon">👤</span>
                  <div>
                    <p className="label">Paciente</p>
                    <p className="value">{turno.paciente}</p>
                  </div>
                </div>

                <div className="doctor-info">
                  <span className="icon">👨‍⚕️</span>
                  <div>
                    <p className="label">Doctor</p>
                    <p className="value">{turno.doctor}</p>
                    <p className="especialidad">{turno.especialidad}</p>
                  </div>
                </div>

                <div className="datetime-info">
                  <div className="fecha">
                    <span className="icon">📅</span>
                    <div>
                      <p className="label">Fecha</p>
                      <p className="value">{formatearFecha(turno.fecha)}</p>
                    </div>
                  </div>
                  <div className="hora">
                    <span className="icon">🕐</span>
                    <div>
                      <p className="label">Hora</p>
                      <p className="value">{turno.hora}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="turno-footer">
                <button className="btn-secondary">Ver detalles</button>
                <button className="btn-primary">Modificar</button>
              </div>
            </div>
          ))
        )}
      </div>

      <button onClick={fetchTurnos} className="btn-refresh">
        🔄 Actualizar
      </button>
    </div>
  )
}

export default App
