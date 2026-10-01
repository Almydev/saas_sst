import { Brand } from '../components/Brand'
import { ThemeToggle } from '../components/ThemeToggle'
import { useAuth } from '../controllers/useAuth'
import './dashboard.css'

const MODULOS = [
  { icon: '🧭', t: 'Diagnóstico', d: 'Clasificación de tu empresa y estándares mínimos aplicables (Res. 0312/2019).' },
  { icon: '✅', t: 'Autoevaluación', d: 'Checklist por ciclo PHVA con porcentaje de cumplimiento y plan de mejora.' },
  { icon: '⚠️', t: 'Matriz de peligros', d: 'Identificación y valoración de riesgos según GTC 45.' },
  { icon: '📅', t: 'Plan anual', d: 'Cronograma de actividades y capacitaciones del SG-SST.' },
  { icon: '🩹', t: 'Accidentes e incidentes', d: 'Reporte, investigación y seguimiento de AT/EL.' },
  { icon: '📊', t: 'Indicadores', d: 'Frecuencia, severidad, mortalidad y ausentismo.' },
]

export function DashboardView() {
  const { usuario, logout } = useAuth()
  if (!usuario) return null

  return (
    <div className="dash">
      <header className="dash-bar">
        <Brand />
        <div className="dash-bar-right">
          <ThemeToggle />
          <button className="btn btn-ghost" onClick={logout}>Salir</button>
        </div>
      </header>

      <main className="dash-main">
        <section className="dash-welcome">
          <span className="badge">{usuario.rol.replace('_', ' ')}</span>
          <h1>Hola, {usuario.nombre.split(' ')[0]} 👋</h1>
          <p>{usuario.empresa ?? 'Sin empresa asociada'}</p>
        </section>

        <section className="dash-stats">
          <div className="card"><small>Plan</small><strong>{usuario.plan ?? '—'}</strong></div>
          <div className="card"><small>Suscripción</small><strong>{usuario.estadoSuscripcion ?? '—'}</strong></div>
          <div className="card"><small>Cumplimiento SG-SST</small><strong>— %</strong></div>
        </section>

        <h2 className="dash-h2">Módulos</h2>
        <section className="dash-modules">
          {MODULOS.map((m) => (
            <article className="card module" key={m.t}>
              <div className="module-icon">{m.icon}</div>
              <h3>{m.t}</h3>
              <p>{m.d}</p>
              <span className="soon">Próximamente</span>
            </article>
          ))}
        </section>
      </main>
    </div>
  )
}
