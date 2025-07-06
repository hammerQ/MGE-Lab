import React, { createContext, useContext, useEffect, useState } from 'react'
import { api } from '../lib/api'
import { User } from '../types/User'

interface AuthContextType {
  user: User | null
  login: (mobile_phone: string, password: string) => Promise<void>
  register: (name: string, mobile_phone: string, email: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`
      fetchCurrentUser()
    } else {
      setIsLoading(false)
    }
  }, [])

  const fetchCurrentUser = async () => {
    try {
      const response = await api.get('/users/me')
      setUser(response.data)
    } catch (error) {
      localStorage.removeItem('token')
      delete api.defaults.headers.Authorization
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (mobile_phone: string, password: string) => {
    const formData = new FormData()
    formData.append('username', mobile_phone) // FastAPI OAuth2 uses 'username' field
    formData.append('password', password)

    const response = await api.post('/token', formData)
    const { access_token } = response.data

    localStorage.setItem('token', access_token)
    api.defaults.headers.Authorization = `Bearer ${access_token}`
    
    await fetchCurrentUser()
  }

  const register = async (name: string, mobile_phone: string, email: string, password: string) => {
    await api.post('/users/', { name, mobile_phone, email, password })
    await login(mobile_phone, password)
  }

  const logout = () => {
    localStorage.removeItem('token')
    delete api.defaults.headers.Authorization
    setUser(null)
  }

  const value = {
    user,
    login,
    register,
    logout,
    isLoading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
} 