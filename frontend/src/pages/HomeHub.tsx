import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const HomeHub: React.FC = () => {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Welcome to Your Hub
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto">
              Your personalized space for family memories and growth
            </p>
            
            <div className="space-y-4">
              <p className="text-lg text-gray-700">
                Hello, {user?.name}! Ready to start creating memories?
              </p>
              <Link
                to="/dashboard"
                className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors shadow-lg"
              >
                Go to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Journey Starts Here</h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              Now that you're part of the Mind & GrowEasy Lab family, you can start creating personalized stories, preserving memories, and building connections that will last for generations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Create Stories</h3>
              <p className="text-gray-600">
                Transform your family memories into beautiful, personalized stories
              </p>
            </div>

            <div className="text-center p-6 bg-purple-50 rounded-lg">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Learning Activities</h3>
              <p className="text-gray-600">
                Discover personalized learning activities based on your family's interests
              </p>
            </div>

            <div className="text-center p-6 bg-green-50 rounded-lg">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Track Progress</h3>
              <p className="text-gray-600">
                Monitor your family's learning journey and celebrate milestones
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Quick Actions</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Jump into your most important tasks and activities
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              to="/dashboard"
              className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-blue-600"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Dashboard</h3>
              <p className="text-gray-600">View your overview and recent activities</p>
            </Link>

            <Link
              to="/profile"
              className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-purple-600"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Profile</h3>
              <p className="text-gray-600">Manage your account settings and preferences</p>
            </Link>

            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-green-600 opacity-50">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Stories</h3>
              <p className="text-gray-600">Create and manage your family stories</p>
              <span className="text-sm text-gray-500">(Coming Soon)</span>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-orange-600 opacity-50">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Activities</h3>
              <p className="text-gray-600">Explore learning activities and games</p>
              <span className="text-sm text-gray-500">(Coming Soon)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeHub 