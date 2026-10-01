import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../controllers/useAuth'
import { AuthLayout } from './AuthLayout'

const RIESGOS = [
  { v: 1, t: 'I — Mínimo (oficinas, comercio)' },
  { v: 2, t: 'II — Bajo' },
  { v: 3, t: 'III — Medio' },
  { v: 4, t: 'IV — Alto' },
  { v: 5, t: 'V — Máximo' },
]

export function RegisterView() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [f, setF] = useState({
    razonSocial: '', nit: '', numTrabajadores: '', claseRiesgo: '1', nombre: '', email: '', password: '',
  })
  const [error, setError] = useState<string | null>(null)
  const [enviando, setEnviando] = useState(false)

  const set = (k: keyof typeof f) => (e: { target: { value: string } }) => setF({ ...f, [k]: e.target.value })

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setEnviando(true)
    try {
      await register({
        ...f,
        numTrabajadores: Number(f.numTrabajadores),
        claseRiesgo: Number(f.claseRiesgo),
      })
      navigate('/', { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error inesperado')
    } finally {
      setEnviando(false)
    }
  }

  return (
    <AuthLayout title="Crea tu cuenta" subtitle="Registra tu empresa y empieza con el diagnóstico SG-SST.">
      <form className="auth-form" onSubmit={onSubmit}>
        {error && <div className="form-error" role="alert">{error}</div>}
        <span className="auth-section">Empresa</span>
        <div className="field">
          <label htmlFor="razon">Razón social</label>
          <input id="razon" required value={f.razonSocial} onChange={set('razonSocial')} />
        </div>
        <div className="auth-grid">
          <div className="field">
            <label htmlFor="nit">NIT</label>
            <input id="nit" required placeholder="900123456-7" value={f.nit} onChange={set('nit')} />
          </div>
          <div className="field">
            <label htmlFor="trab">N.º de trabajadores</label>
            <input id="trab" type="number" min={1} required value={f.numTrabajadores} onChange={set('numTrabajadores')} />
          </div>
        </div>
        <div className="field">
          <label htmlFor="riesgo">Clase de riesgo (ARL)</label>
          <select id="riesgo" value={f.claseRiesgo} onChange={set('claseRiesgo')}>
            {RIESGOS.map((r) => <option key={r.v} value={r.v}>{r.t}</option>)}
          </select>
        </div>
        <span className="auth-section">Administrador</span>
        <div className="field">
          <label htmlFor="nombre">Nombre completo</label>
          <input id="nombre" required autoComplete="name" value={f.nombre} onChange={set('nombre')} />
        </div>
        <div className="auth-grid">
          <div className="field">
            <label htmlFor="remail">Correo electrónico</label>
            <input id="remail" type="email" required autoComplete="email" value={f.email} onChange={set('email')} />
          </div>
          <div className="field">
            <label htmlFor="rpass">Contraseña</label>
            <input id="rpass" type="password" required minLength={8} autoComplete="new-password" value={f.password} onChange={set('password')} />
          </div>
        </div>
        <button className="btn btn-block" disabled={enviando}>{enviando ? 'Creando cuenta…' : 'Crear cuenta'}</button>
      </form>
      <p className="auth-foot">¿Ya tienes cuenta? <Link to="/login">Ingresa</Link></p>
    </AuthLayout>
  )
}
