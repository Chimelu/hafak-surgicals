import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { EquipmentService, CategoryService } from '../../services/api'
import AdminNavbar from './AdminNavbar'
import { 
  Package, 
  FolderOpen, 
  BarChart3, 
  Settings, 
  Plus,
  Edit,
  List
} from 'lucide-react'

const AdminDashboard: React.FC = () => {
  const { user } = useAuth()
  const [stats, setStats] = useState({
    totalEquipment: 0,
    totalCategories: 0,
    inStock: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      setLoading(true)
      
      // Load equipment stats
      const equipmentResponse = await EquipmentService.getAll({ limit: 1000 })
      const categoriesResponse = await CategoryService.getAll()
      
      let totalEquipment = 0
      let inStock = 0
      
      if (equipmentResponse.success && equipmentResponse.data) {
        // Backend returns { success: true, data: equipment[], pagination: {...} }
        const equipment = equipmentResponse.data || [];
        totalEquipment = equipment.length;
        inStock = equipment.filter((item: any) => item.availability === 'In Stock').length;
      }
      
      let totalCategories = 0
      if (categoriesResponse.success && categoriesResponse.data) {
        totalCategories = Array.isArray(categoriesResponse.data) ? categoriesResponse.data.length : 0
      }
      
      setStats({
        totalEquipment,
        totalCategories,
        inStock
      })
    } catch (error) {
      console.error('Failed to load stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const adminCards = [
    {
      title: 'Equipment Management',
      description: 'Add, edit, and manage medical equipment',
      icon: Package,
      link: '/admin/equipment',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      title: 'Categories',
      description: 'Manage equipment categories',
      icon: FolderOpen,
      link: '/admin/categories',
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      title: 'Analytics',
      description: 'View equipment statistics and reports',
      icon: BarChart3,
      link: '/admin/analytics',
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      title: 'Settings',
      description: 'Configure admin panel settings',
      icon: Settings,
      link: '/admin/settings',
      color: 'bg-gray-500 hover:bg-gray-600'
    }
  ]

  const quickActions = [
    {
      title: 'Add New Equipment',
      description: 'Quickly add a new medical equipment',
      icon: Plus,
      link: '/admin/equipment/add',
      color: 'bg-blue-100 text-blue-700 hover:bg-blue-200'
    },
    {
      title: 'Edit Equipment',
      description: 'Modify existing equipment details',
      icon: Edit,
      link: '/admin/equipment',
      color: 'bg-green-100 text-green-700 hover:bg-green-200'
    },
    {
      title: 'View All Equipment',
      description: 'Browse complete equipment inventory',
      icon: List,
      link: '/admin/equipment',
      color: 'bg-purple-100 text-purple-700 hover:bg-purple-200'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user?.username}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {adminCards.map((card, index) => (
            <Link
              key={index}
              to={card.link}
              className="block group"
            >
              <div className={`${card.color} rounded-lg shadow-lg p-6 text-white transition-all duration-200 transform group-hover:scale-105`}>
                <div className="flex items-center">
                  <card.icon className="h-8 w-8 mr-4" />
                  <div>
                    <h3 className="text-lg font-semibold">{card.title}</h3>
                    <p className="text-sm opacity-90">{card.description}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.link}
                className="block group"
              >
                <div className={`${action.color} rounded-lg p-6 transition-all duration-200 transform group-hover:scale-105 border-2 border-transparent group-hover:border-current`}>
                  <div className="flex items-center">
                    <action.icon className="h-6 w-6 mr-3" />
                    <div>
                      <h3 className="font-semibold">{action.title}</h3>
                      <p className="text-sm opacity-75">{action.description}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Stats Overview */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Overview</h2>
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading stats...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{stats.totalEquipment}</div>
                <div className="text-gray-600">Total Equipment</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{stats.totalCategories}</div>
                <div className="text-gray-600">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">{stats.inStock}</div>
                <div className="text-gray-600">In Stock</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
