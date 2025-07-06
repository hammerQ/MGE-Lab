export interface User {
  mobile_phone: string
  name: string
  email: string
  is_active: boolean
  created_at: string
  updated_at?: string
}

export interface UserCreate {
  mobile_phone: string
  name: string
  email: string
  password: string
}

export interface UserUpdate {
  mobile_phone?: string
  name?: string
  email?: string
  is_active?: boolean
}

export interface PasswordReset {
  mobile_phone: string
  new_password: string
} 