// Modelos (tipos) — reflejan los DTO del backend.
export interface Usuario {
  id: number
  nombre: string
  email: string
  rol: string
  empresaId: number | null
  empresa: string | null
  plan: string | null
  estadoSuscripcion: string | null
}

export interface AuthResponse {
  token: string
  usuario: Usuario
}

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  razonSocial: string
  nit: string
  numTrabajadores: number
  claseRiesgo: number
  nombre: string
  email: string
  password: string
}
