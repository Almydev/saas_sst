import type { AuthResponse, LoginPayload, RegisterPayload, Usuario } from '../models/auth'
import { api } from './api'

export const authService = {
  login: (p: LoginPayload) =>
    api<AuthResponse>('/api/auth/login', { method: 'POST', body: JSON.stringify(p) }),
  register: (p: RegisterPayload) =>
    api<AuthResponse>('/api/auth/register', { method: 'POST', body: JSON.stringify(p) }),
  me: () => api<Usuario>('/api/auth/me'),
}
