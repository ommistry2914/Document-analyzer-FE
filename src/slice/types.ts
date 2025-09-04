export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  firstName: string
  lastName: string
  email: string
  password: string
}

export interface User {
  firstName: string
  lastName: string
  email: string
}

export interface AuthState {
  token: string | null
  user: User | null
  loading: boolean
  error: string | null
}
