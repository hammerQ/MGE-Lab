import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { api } from '../lib/api'

interface PasswordResetFormData {
  mobile_phone: string
  new_password: string
  confirmPassword: string
}

const PasswordReset: React.FC = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState<'check' | 'reset'>('check')
  const [validatedPhone, setValidatedPhone] = useState<string>('')
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<PasswordResetFormData>()

  const new_password = watch('new_password')

  const checkUserExists = async (mobile_phone: string) => {
    try {
      setIsLoading(true)
      const response = await api.post('/check-user', null, {
        params: { mobile_phone }
      })
      
      if (response.data.exists) {
        setValidatedPhone(mobile_phone)
        setStep('reset')
        reset({ mobile_phone }) // Keep the phone number in the form
        toast.success('User found! Please enter your new password.')
      } else {
        toast.error('No account found with this mobile phone number')
      }
    } catch (error) {
      toast.error('Error checking user. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const resetPassword = async (data: PasswordResetFormData) => {
    try {
      setIsLoading(true)
      await api.post('/reset-password', {
        mobile_phone: validatedPhone,
        new_password: data.new_password
      })
      
      toast.success('Password reset successfully!')
      navigate('/login')
    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'Password reset failed')
    } finally {
      setIsLoading(false)
    }
  }

  const onSubmit = async (data: PasswordResetFormData) => {
    if (step === 'check') {
      await checkUserExists(data.mobile_phone)
    } else {
      await resetPassword(data)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-8">
      <div className="bg-white py-8 px-6 shadow-lg rounded-lg">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Reset Your Password
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            {step === 'check' 
              ? 'Enter your mobile phone number to reset your password'
              : 'Enter your new password'
            }
          </p>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {step === 'check' && (
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
          )}

          {step === 'reset' && (
            <>
              <div className="bg-green-50 border border-green-200 rounded-md p-3">
                <p className="text-sm text-green-700">
                  <strong>Account found:</strong> {validatedPhone}
                </p>
              </div>

              <div>
                <label htmlFor="new_password" className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <input
                  {...register('new_password', {
                    required: 'New password is required',
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
                  placeholder="4-12 characters, letters and numbers only"
                />
                {errors.new_password && (
                  <p className="mt-1 text-sm text-red-600">{errors.new_password.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm New Password
                </label>
                <input
                  {...register('confirmPassword', {
                    required: 'Please confirm your new password',
                    validate: (value) =>
                      value === new_password || 'Passwords do not match',
                  })}
                  type="password"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Confirm your new password"
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
                )}
              </div>
            </>
          )}

          <div className="space-y-3">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isLoading 
                ? (step === 'check' ? 'Checking...' : 'Resetting...') 
                : (step === 'check' ? 'Check Account' : 'Reset Password')
              }
            </button>

            {step === 'reset' && (
              <button
                type="button"
                onClick={() => {
                  setStep('check')
                  setValidatedPhone('')
                  reset()
                }}
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Back to Phone Check
              </button>
            )}
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Remember your password?{' '}
            <Link to="/login" className="text-blue-600 hover:text-blue-500 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default PasswordReset 