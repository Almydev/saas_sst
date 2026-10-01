import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { AuthResponse, LoginPayload, RegisterPayload, Usuario } from '../models/auth'
import { tokenStore } from '../services/api'
import { authService } from '../services/authService'
import { AuthContext } from './authContext'

// Controlador de sesión: orquesta servicios y expone el estado a las vistas.
export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null)
  const [cargando, setCargando] = useState<boolean>(() => tokenStore.get() !== null)

  useEffect(() => {
    if (!tokenStore.get()) return
    authService.me()
      .then(setUsuario)
      .catch(() => tokenStore.clear())
      .finally(() => setCargando(false))
  }, [])

  const aceptar = useCallback((r: AuthResponse) => {
    tokenStore.set(r.token)
    setUsuario(r.usuario)
  }, [])

  const login = useCallback(async (p: LoginPayload) => aceptar(await authService.login(p)), [aceptar])
  const register = useCallback(async (p: RegisterPayload) => aceptar(await authService.register(p)), [aceptar])
  const logout = useCallback(() => {
    tokenStore.clear()
    setUsuario(null)
  }, [])

  const value = useMemo(
    () => ({ usuario, cargando, login, register, logout }),
    [usuario, cargando, login, register, logout],
  )
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
