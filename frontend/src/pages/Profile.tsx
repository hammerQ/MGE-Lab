import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { useAuth } from '../contexts/AuthContext'
import { api } from '../lib/api'
import { UserProfile, UserProfileCreate } from '../types/Profile'

interface ProfileFormData {
  // Father
  father_first_name: string
  father_middle_name?: string
  father_last_name: string
  father_birth_year: number
  father_birth_month: number
  father_birth_day: number
  
  // Mother
  mother_first_name: string
  mother_middle_name?: string
  mother_last_name: string
  mother_birth_year: number
  mother_birth_month: number
  mother_birth_day: number
  
  // Child
  child_first_name: string
  child_middle_name?: string
  child_last_name: string
  child_gender: 'male' | 'female' | 'other'
  child_birth_year: number
  child_birth_month: number
  child_birth_day: number
  
  // Pet (optional)
  has_pet: boolean
  pet_name?: string
  pet_type?: 'dog' | 'cat'
  pet_breed?: string
  pet_color?: string
}

const Profile: React.FC = () => {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [existingProfile, setExistingProfile] = useState<UserProfile | null>(null)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<ProfileFormData>()

  const hasPet = watch('has_pet')

  // Generate year, month, day options
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 125 }, (_, i) => currentYear - i)
  const childYears = Array.from({ length: 25 }, (_, i) => currentYear - i)
  const months = Array.from({ length: 12 }, (_, i) => i + 1)
  const days = Array.from({ length: 31 }, (_, i) => i + 1)

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  // Load existing profile on component mount
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await api.get('/profile/me')
        const profile = response.data
        setExistingProfile(profile)
        
        // Populate form with existing data
        reset({
          father_first_name: profile.father.first_name,
          father_middle_name: profile.father.middle_name || '',
          father_last_name: profile.father.last_name,
          father_birth_year: profile.father.birth_year,
          father_birth_month: profile.father.birth_month,
          father_birth_day: profile.father.birth_day,
          
          mother_first_name: profile.mother.first_name,
          mother_middle_name: profile.mother.middle_name || '',
          mother_last_name: profile.mother.last_name,
          mother_birth_year: profile.mother.birth_year,
          mother_birth_month: profile.mother.birth_month,
          mother_birth_day: profile.mother.birth_day,
          
          child_first_name: profile.child.first_name,
          child_middle_name: profile.child.middle_name || '',
          child_last_name: profile.child.last_name,
          child_gender: profile.child.gender,
          child_birth_year: profile.child.birth_year,
          child_birth_month: profile.child.birth_month,
          child_birth_day: profile.child.birth_day,
          
          has_pet: !!profile.pet,
          pet_name: profile.pet?.name || '',
          pet_type: profile.pet?.pet_type || 'dog',
          pet_breed: profile.pet?.breed || '',
          pet_color: profile.pet?.color || '',
        })
      } catch (error: any) {
        if (error.response?.status !== 404) {
          toast.error('Failed to load profile')
        }
      }
    }

    loadProfile()
  }, [reset])

  const onSubmit = async (data: ProfileFormData) => {
    setIsLoading(true)
    try {
      const profileData: UserProfileCreate = {
        father: {
          first_name: data.father_first_name,
          middle_name: data.father_middle_name || undefined,
          last_name: data.father_last_name,
          birth_year: data.father_birth_year,
          birth_month: data.father_birth_month,
          birth_day: data.father_birth_day,
        },
        mother: {
          first_name: data.mother_first_name,
          middle_name: data.mother_middle_name || undefined,
          last_name: data.mother_last_name,
          birth_year: data.mother_birth_year,
          birth_month: data.mother_birth_month,
          birth_day: data.mother_birth_day,
        },
        child: {
          first_name: data.child_first_name,
          middle_name: data.child_middle_name || undefined,
          last_name: data.child_last_name,
          gender: data.child_gender,
          birth_year: data.child_birth_year,
          birth_month: data.child_birth_month,
          birth_day: data.child_birth_day,
        },
        pet: data.has_pet ? {
          name: data.pet_name!,
          pet_type: data.pet_type!,
          breed: data.pet_breed!,
          color: data.pet_color!,
        } : undefined,
      }

      if (existingProfile) {
        await api.put('/profile/me', profileData)
        toast.success('Profile updated successfully!')
      } else {
        await api.post('/profile/', profileData)
        toast.success('Profile created successfully!')
      }
    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'Failed to save profile')
    } finally {
      setIsLoading(false)
    }
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Family Profile</h1>
          <p className="text-gray-600">
            Tell us about your family to create personalized stories and experiences
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Father Information */}
          <div className="border-b border-gray-200 pb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Father's Information</h2>
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                <input
                  {...register('father_first_name', {
                    required: 'First name is required',
                    pattern: {
                      value: /^[A-Za-z\s]+$/,
                      message: 'Only letters and spaces allowed',
                    },
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="John"
                />
                {errors.father_first_name && (
                  <p className="text-red-600 text-sm mt-1">{errors.father_first_name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Middle Name</label>
                <input
                  {...register('father_middle_name', {
                    pattern: {
                      value: /^[A-Za-z\s]*$/,
                      message: 'Only letters and spaces allowed',
                    },
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Michael"
                />
                {errors.father_middle_name && (
                  <p className="text-red-600 text-sm mt-1">{errors.father_middle_name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                <input
                  {...register('father_last_name', {
                    required: 'Last name is required',
                    pattern: {
                      value: /^[A-Za-z\s]+$/,
                      message: 'Only letters and spaces allowed',
                    },
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Smith"
                />
                {errors.father_last_name && (
                  <p className="text-red-600 text-sm mt-1">{errors.father_last_name.message}</p>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Birth Year *</label>
                <select
                  {...register('father_birth_year', {
                    required: 'Birth year is required',
                    valueAsNumber: true,
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Year</option>
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
                {errors.father_birth_year && (
                  <p className="text-red-600 text-sm mt-1">{errors.father_birth_year.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Birth Month *</label>
                <select
                  {...register('father_birth_month', {
                    required: 'Birth month is required',
                    valueAsNumber: true,
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Month</option>
                  {months.map(month => (
                    <option key={month} value={month}>{monthNames[month - 1]}</option>
                  ))}
                </select>
                {errors.father_birth_month && (
                  <p className="text-red-600 text-sm mt-1">{errors.father_birth_month.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Birth Day *</label>
                <select
                  {...register('father_birth_day', {
                    required: 'Birth day is required',
                    valueAsNumber: true,
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Day</option>
                  {days.map(day => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
                {errors.father_birth_day && (
                  <p className="text-red-600 text-sm mt-1">{errors.father_birth_day.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Mother Information */}
          <div className="border-b border-gray-200 pb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Mother's Information</h2>
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                <input
                  {...register('mother_first_name', {
                    required: 'First name is required',
                    pattern: {
                      value: /^[A-Za-z\s]+$/,
                      message: 'Only letters and spaces allowed',
                    },
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Jane"
                />
                {errors.mother_first_name && (
                  <p className="text-red-600 text-sm mt-1">{errors.mother_first_name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Middle Name</label>
                <input
                  {...register('mother_middle_name', {
                    pattern: {
                      value: /^[A-Za-z\s]*$/,
                      message: 'Only letters and spaces allowed',
                    },
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Marie"
                />
                {errors.mother_middle_name && (
                  <p className="text-red-600 text-sm mt-1">{errors.mother_middle_name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                <input
                  {...register('mother_last_name', {
                    required: 'Last name is required',
                    pattern: {
                      value: /^[A-Za-z\s]+$/,
                      message: 'Only letters and spaces allowed',
                    },
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Smith"
                />
                {errors.mother_last_name && (
                  <p className="text-red-600 text-sm mt-1">{errors.mother_last_name.message}</p>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Birth Year *</label>
                <select
                  {...register('mother_birth_year', {
                    required: 'Birth year is required',
                    valueAsNumber: true,
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Year</option>
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
                {errors.mother_birth_year && (
                  <p className="text-red-600 text-sm mt-1">{errors.mother_birth_year.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Birth Month *</label>
                <select
                  {...register('mother_birth_month', {
                    required: 'Birth month is required',
                    valueAsNumber: true,
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Month</option>
                  {months.map(month => (
                    <option key={month} value={month}>{monthNames[month - 1]}</option>
                  ))}
                </select>
                {errors.mother_birth_month && (
                  <p className="text-red-600 text-sm mt-1">{errors.mother_birth_month.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Birth Day *</label>
                <select
                  {...register('mother_birth_day', {
                    required: 'Birth day is required',
                    valueAsNumber: true,
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Day</option>
                  {days.map(day => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
                {errors.mother_birth_day && (
                  <p className="text-red-600 text-sm mt-1">{errors.mother_birth_day.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Child Information */}
          <div className="border-b border-gray-200 pb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Child's Information</h2>
            <div className="grid md:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                <input
                  {...register('child_first_name', {
                    required: 'First name is required',
                    pattern: {
                      value: /^[A-Za-z\s]+$/,
                      message: 'Only letters and spaces allowed',
                    },
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Alex"
                />
                {errors.child_first_name && (
                  <p className="text-red-600 text-sm mt-1">{errors.child_first_name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Middle Name</label>
                <input
                  {...register('child_middle_name', {
                    pattern: {
                      value: /^[A-Za-z\s]*$/,
                      message: 'Only letters and spaces allowed',
                    },
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Jordan"
                />
                {errors.child_middle_name && (
                  <p className="text-red-600 text-sm mt-1">{errors.child_middle_name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                <input
                  {...register('child_last_name', {
                    required: 'Last name is required',
                    pattern: {
                      value: /^[A-Za-z\s]+$/,
                      message: 'Only letters and spaces allowed',
                    },
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Smith"
                />
                {errors.child_last_name && (
                  <p className="text-red-600 text-sm mt-1">{errors.child_last_name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender *</label>
                <select
                  {...register('child_gender', {
                    required: 'Gender is required',
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.child_gender && (
                  <p className="text-red-600 text-sm mt-1">{errors.child_gender.message}</p>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Birth Year *</label>
                <select
                  {...register('child_birth_year', {
                    required: 'Birth year is required',
                    valueAsNumber: true,
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Year</option>
                  {childYears.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
                {errors.child_birth_year && (
                  <p className="text-red-600 text-sm mt-1">{errors.child_birth_year.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Birth Month *</label>
                <select
                  {...register('child_birth_month', {
                    required: 'Birth month is required',
                    valueAsNumber: true,
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Month</option>
                  {months.map(month => (
                    <option key={month} value={month}>{monthNames[month - 1]}</option>
                  ))}
                </select>
                {errors.child_birth_month && (
                  <p className="text-red-600 text-sm mt-1">{errors.child_birth_month.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Birth Day *</label>
                <select
                  {...register('child_birth_day', {
                    required: 'Birth day is required',
                    valueAsNumber: true,
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Day</option>
                  {days.map(day => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
                {errors.child_birth_day && (
                  <p className="text-red-600 text-sm mt-1">{errors.child_birth_day.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Pet Information */}
          <div className="pb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Pet Information (Optional)</h2>
            
            <div className="mb-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  {...register('has_pet')}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">My family has a pet</span>
              </label>
            </div>

            {hasPet && (
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pet Name *</label>
                  <input
                    {...register('pet_name', {
                      required: hasPet ? 'Pet name is required' : false,
                      pattern: {
                        value: /^[A-Za-z0-9\s]+$/,
                        message: 'Only letters, numbers, and spaces allowed',
                      },
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Buddy"
                  />
                  {errors.pet_name && (
                    <p className="text-red-600 text-sm mt-1">{errors.pet_name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pet Type *</label>
                  <select
                    {...register('pet_type', {
                      required: hasPet ? 'Pet type is required' : false,
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="dog">Dog</option>
                    <option value="cat">Cat</option>
                  </select>
                  {errors.pet_type && (
                    <p className="text-red-600 text-sm mt-1">{errors.pet_type.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Breed *</label>
                  <input
                    {...register('pet_breed', {
                      required: hasPet ? 'Pet breed is required' : false,
                      pattern: {
                        value: /^[A-Za-z0-9\s]+$/,
                        message: 'Only letters, numbers, and spaces allowed',
                      },
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Golden Retriever"
                  />
                  {errors.pet_breed && (
                    <p className="text-red-600 text-sm mt-1">{errors.pet_breed.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Color *</label>
                  <input
                    {...register('pet_color', {
                      required: hasPet ? 'Pet color is required' : false,
                      pattern: {
                        value: /^[A-Za-z0-9\s]+$/,
                        message: 'Only letters, numbers, and spaces allowed',
                      },
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Golden"
                  />
                  {errors.pet_color && (
                    <p className="text-red-600 text-sm mt-1">{errors.pet_color.message}</p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full md:w-auto bg-blue-600 text-white px-8 py-3 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isLoading ? 'Saving...' : existingProfile ? 'Update Profile' : 'Create Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Profile 