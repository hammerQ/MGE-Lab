import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { useAuth } from '../contexts/AuthContext'

interface LoginFormData {
  mobile_phone: string
  password: string
}

const Login: React.FC = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>()

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    try {
      await login(data.mobile_phone, data.password)
      toast.success('Login successful!')
      navigate('/hub')
    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-8">
      <div className="bg-white py-8 px-6 shadow-lg rounded-lg">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Welcome back to
          </h2>
          <h1 className="text-3xl font-bold text-blue-600">
            Mind & GrowEasy Lab
          </h1>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="mobile_phone" className="block text-sm font-medium text-gray-700">
              Mobile Phone Number
            </label>
            <input
              {...register('mobile_phone', {
                required: 'Mobile phone number is required',
                pattern: {
                  value: /^\+?1?\d{10,15}$/,
                  message: 'Please enter a valid mobile phone number',
                },
              })}
              type="tel"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your mobile phone number"
            />
            {errors.mobile_phone && (
              <p className="mt-1 text-sm text-red-600">{errors.mobile_phone.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 4,
                  message: 'Password must be at least 4 characters',
                },
                maxLength: {
                  value: 12,
                  message: 'Password must be less than 12 characters',
                },
                pattern: {
                  value: /^[A-Za-z0-9]+$/,
                  message: 'Password can only contain letters and numbers',
                },
              })}
              type="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>

        <div className="mt-6 space-y-4 text-center">
          <Link 
            to="/reset-password" 
            className="text-sm text-blue-600 hover:text-blue-500"
          >
            Forgot your password?
          </Link>
          
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-600 hover:text-blue-500 font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login 