import { createContext } from 'react'
import type { LoginPayload, RegisterPayload, Usuario } from '../models/auth'

export interface AuthState {
  usuario: Usuario | null
  cargando: boolean
  login: (p: LoginPayload) => Promise<void>
  register: (p: RegisterPayload) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthState | null>(null)
