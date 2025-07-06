import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const Home: React.FC = () => {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Mind & <span className="text-blue-600">GrowEasy</span> Lab
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto">
              Creating an ecosystem that preserves family memories and supports children's growth through personalized storytelling
            </p>
            
            {user ? (
              <div className="space-y-4">
                <p className="text-lg text-gray-700">
                  Welcome back, {user.name}!
                </p>
                <Link
                  to="/dashboard"
                  className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors shadow-lg"
                >
                  Go to Dashboard
                </Link>
              </div>
            ) : (
              <div className="space-x-4">
                <Link
                  to="/register"
                  className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors shadow-lg"
                >
                  Get Started
                </Link>
                <Link
                  to="/login"
                  className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-medium border-2 border-blue-600 hover:bg-blue-50 transition-colors shadow-lg"
                >
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              To foster meaningful family connections, promote education, and nurture creativity through innovative, personalized products. We empower families to create, preserve, and utilize their unique memories as a foundation for personalized learning, value transmission, and lifelong connection.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Family Connection</h3>
              <p className="text-gray-600">
                Strengthen intergenerational bonds through shared memories and storytelling
              </p>
            </div>

            <div className="text-center p-6 bg-purple-50 rounded-lg">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Personalized Learning</h3>
              <p className="text-gray-600">
                Support children's growth through customized educational experiences
              </p>
            </div>

            <div className="text-center p-6 bg-green-50 rounded-lg">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Innovation</h3>
              <p className="text-gray-600">
                Integrate digital and physical products with ethical AI technology
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Vision Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto mb-8">
              To be the leading global ecosystem for family memory preservation and growth, fostering deep intergenerational bonds and empowering individuals to create and practice through personalized education and companionship.
            </p>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              'Family Connection',
              'Personalization',
              'Education',
              'Innovation',
              'Creativity',
              'Trust',
              'Community',
              'Ethical AI'
            ].map((value, index) => (
              <div key={index} className="text-center p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900">{value}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      {!user && (
        <div className="py-16 bg-blue-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join our community and begin creating lasting memories and personalized learning experiences for your family.
            </p>
            <div className="space-x-4">
              <Link
                to="/register"
                className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-medium hover:bg-gray-100 transition-colors shadow-lg"
              >
                Start Free Account
              </Link>
              <Link
                to="/login"
                className="inline-block bg-transparent text-white px-8 py-3 rounded-lg text-lg font-medium border-2 border-white hover:bg-white hover:text-blue-600 transition-colors"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home 