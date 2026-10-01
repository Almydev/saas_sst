import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import type { ReactNode } from 'react'
import { AuthProvider } from './controllers/AuthProvider'
import { useAuth } from './controllers/useAuth'
import { DashboardView } from './views/DashboardView'
import { LoginView } from './views/LoginView'
import { RegisterView } from './views/RegisterView'

function Protegida({ children }: { children: ReactNode }) {
  const { usuario, cargando } = useAuth()
  if (cargando) return null
  return usuario ? children : <Navigate to="/login" replace />
}

function Publica({ children }: { children: ReactNode }) {
  const { usuario, cargando } = useAuth()
  if (cargando) return null
  return usuario ? <Navigate to="/" replace /> : children
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Publica><LoginView /></Publica>} />
          <Route path="/registro" element={<Publica><RegisterView /></Publica>} />
          <Route path="/" element={<Protegida><DashboardView /></Protegida>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
