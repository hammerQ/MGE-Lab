import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth()
  const location = useLocation()

  const isActive = (path: string) => {
    return location.pathname === path
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-gray-900">
                  Mind & <span className="text-blue-600">GrowEasy</span> Lab
                </h1>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      isActive('/dashboard')
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-700 hover:text-blue-700'
                    }`}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/profile"
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      isActive('/profile')
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-700 hover:text-blue-700'
                    }`}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={logout}
                    className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700"
                  >
                    Logout
                  </button>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {user.name
                          .split(' ')
                          .map(name => name.charAt(0).toUpperCase())
                          .slice(0, 2)
                          .join('')}
                      </span>
                    </div>
                    <span className="text-sm text-gray-600">
                      {user.name}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      isActive('/login')
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-700 hover:text-blue-700'
                    }`}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  )
}

export default Layout 