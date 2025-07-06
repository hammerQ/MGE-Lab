import React from 'react'
import { useAuth } from '../contexts/AuthContext'

const Dashboard: React.FC = () => {
  const { user } = useAuth()

  return (
    <div className="px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Welcome to your Dashboard
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-primary-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-primary-700 mb-2">
                  User Profile
                </h3>
                <p className="text-primary-600">
                  Name: {user?.name}
                </p>
                <p className="text-primary-600">
                  Email: {user?.email}
                </p>
                <p className="text-primary-600">
                  Status: {user?.is_active ? 'Active' : 'Inactive'}
                </p>
              </div>
              
              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-700 mb-2">
                  Quick Stats
                </h3>
                <p className="text-green-600">
                  Account created: {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                </p>
                <p className="text-green-600">
                  Last updated: {user?.updated_at ? new Date(user.updated_at).toLocaleDateString() : 'N/A'}
                </p>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-700 mb-2">
                  Actions
                </h3>
                <div className="space-y-2">
                  <button className="block w-full text-left px-3 py-2 text-sm text-blue-600 hover:bg-blue-100 rounded">
                    Edit Profile
                  </button>
                  <button className="block w-full text-left px-3 py-2 text-sm text-blue-600 hover:bg-blue-100 rounded">
                    View Settings
                  </button>
                  <button className="block w-full text-left px-3 py-2 text-sm text-blue-600 hover:bg-blue-100 rounded">
                    Help & Support
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Recent Activity
              </h2>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-600">
                  No recent activity to display.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard 