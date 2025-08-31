import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { AuthService } from '../services/api'
import type { AdminUser } from '../types'
import toast from 'react-hot-toast'

interface AuthContextType {
  user: AdminUser | null
  isLoading: boolean
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
  checkAuth: () => Promise<void>
  forceRefreshAuth: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check if user is already authenticated on mount
  useEffect(() => {
    console.log('AuthContext: useEffect triggered, calling checkAuth')
    checkAuth()
    
    // Set up periodic auth check every 5 minutes, but only if user is authenticated
    const interval = setInterval(() => {
      const token = localStorage.getItem('token')
      if (token && user) {
        console.log('AuthContext: Periodic auth check...')
        checkAuth()
      }
    }, 5 * 60 * 1000) // 5 minutes
    
    return () => clearInterval(interval)
  }, []) // Remove user dependency to prevent infinite loop

  // Force refresh authentication state
  const forceRefreshAuth = async () => {
    console.log('AuthContext: Force refreshing authentication...')
    setIsLoading(false) // Reset loading state
    setUser(null) // Reset user state
    await checkAuth() // Check again
  }

  const checkAuth = async () => {
    try {
      console.log('AuthContext: checkAuth called, current isLoading:', isLoading)
      
      // Don't check if already loading
      if (isLoading) {
        console.log('AuthContext: Already loading, skipping check')
        return
      }
      
      setIsLoading(true)
      
      // Add timeout to prevent hanging
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Authentication check timeout')), 10000) // 10 seconds
      })
      
      const authPromise = async () => {
        const token = localStorage.getItem('token')
        console.log('AuthContext: Checking auth, token exists:', !!token)
        console.log('AuthContext: Current user state:', user)
        
        if (!token) {
          console.log('AuthContext: No token found, user not authenticated')
          return
        }

        // Don't check if user is already set and we have a token
        if (user && token) {
          console.log('AuthContext: User already authenticated, skipping check')
          return
        }

        // Verify token with backend
        console.log('AuthContext: Verifying token with backend...')
        const response = await AuthService.getProfile()
        console.log('AuthContext: Profile response:', response)
        
        if (response.success && response.data) {
          console.log('AuthContext: Token valid, setting user:', response.data)
          // Handle both { user: {...} } and direct user object responses
          const userData = response.data.user || response.data
          console.log('AuthContext: Setting user to:', userData)
          setUser(userData as AdminUser)
          // Don't show toast on page refresh
          // toast.success('Welcome back!')
        } else {
          console.log('AuthContext: Token invalid, removing token')
          console.log('AuthContext: Response success:', response.success)
          console.log('AuthContext: Response data:', response.data)
          // Token is invalid, remove it
          localStorage.removeItem('token')
          setUser(null)
        }
      }
      
      // Race between timeout and auth check
      await Promise.race([authPromise(), timeoutPromise])
      
    } catch (error) {
      console.error('AuthContext: Auth check failed:', error)
      // Remove token on any error to be safe
      localStorage.removeItem('token')
      setUser(null)
    } finally {
      console.log('AuthContext: Setting isLoading to false')
      setIsLoading(false)
    }
  }

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      console.log('AuthContext: Calling login API...')
      const response = await AuthService.login({ username, password })
      console.log('AuthContext: Login API response:', response)

      if (response.success && response.data) {
        console.log('AuthContext: Full response object:', response)
        console.log('AuthContext: response.token:', (response as any).token)
        console.log('AuthContext: response.data.token:', (response.data as any).token)
        
        // Handle both { token: '...', user: {...} } and direct user object responses
        const token = (response as any).token || (response.data as any).token
        const userData = (response.data as any).user || response.data
        
        console.log('AuthContext: Extracted token:', token)
        console.log('AuthContext: Extracted userData:', userData)
        
        if (token) {
          localStorage.setItem('token', token)
          console.log('AuthContext: Token stored, setting user:', userData)
          setUser(userData as AdminUser)
          toast.success('Login successful! Welcome back!')
          return true
        } else {
          toast.error('No token received from server')
          return false
        }
      } else {
        const errorMessage = response.message || 'Login failed'
        toast.error(errorMessage)
        return false
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed'
      console.error('Login error:', error)
      toast.error(errorMessage)
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
    toast.success('Logged out successfully!')
  }

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    logout,
    checkAuth,
    forceRefreshAuth
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
