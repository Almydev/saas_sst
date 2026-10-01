import type { ReactNode } from 'react'
import { Brand } from '../components/Brand'
import { ThemeToggle } from '../components/ThemeToggle'
import './auth.css'

export function AuthLayout({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  return (
    <div className="auth-page">
      <aside className="auth-hero">
        <Brand />
        <div className="auth-hero-body">
          <span className="badge">Seguridad y Salud en el Trabajo</span>
          <h1>Tu SG-SST en regla, <span className="grad">sin complicaciones</span>.</h1>
          <p>
            Diagnóstico según Resolución 0312 de 2019, matriz de peligros GTC 45, plan anual e
            indicadores — todo en un solo lugar, hecho para pequeñas empresas en Colombia.
          </p>
        </div>
        <small>Ecosistemas inteligentes · ALMYDEV</small>
      </aside>
      <main className="auth-main">
        <div className="auth-top"><ThemeToggle /></div>
        <div className="auth-card card">
          <h2>{title}</h2>
          <p className="auth-sub">{subtitle}</p>
          {children}
        </div>
      </main>
    </div>
  )
}
