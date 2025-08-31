import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

interface ProtectedRouteProps {
  children: React.ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, isLoading, forceRefreshAuth } = useAuth()
  const location = useLocation()

  console.log('ProtectedRoute: isLoading:', isLoading)
  console.log('ProtectedRoute: user:', user)
  console.log('ProtectedRoute: current location:', location.pathname)

  if (isLoading) {
    console.log('ProtectedRoute: Still loading, showing spinner')
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading authentication...</p>
          <button 
            onClick={forceRefreshAuth}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Force Refresh Auth
          </button>
        </div>
      </div>
    )
  }

  if (!user) {
    console.log('ProtectedRoute: No user, redirecting to /admin')
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Authentication Required</h2>
          <p className="text-gray-600 mb-4">You need to be logged in to access this page.</p>
          <button 
            onClick={forceRefreshAuth}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 mr-4"
          >
            Retry Authentication
          </button>
          <button 
            onClick={() => window.location.href = '/admin'}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Go to Login
          </button>
        </div>
      </div>
    )
  }

  console.log('ProtectedRoute: User authenticated, rendering children')
  return <>{children}</>
}

export default ProtectedRoute
