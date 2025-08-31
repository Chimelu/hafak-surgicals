import React, { useState, useEffect } from 'react'
import AdminNavbar from './AdminNavbar'
import { EquipmentService, CategoryService } from '../../services/api'
import { 
  Package, 
  FolderOpen, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  AlertCircle
} from 'lucide-react'

const Analytics: React.FC = () => {
  const [stats, setStats] = useState({
    totalEquipment: 0,
    totalCategories: 0,
    inStock: 0,
    outOfStock: 0,
    lowStock: 0,
    totalValue: 0
  })
  const [loading, setLoading] = useState(true)
  const [recentActivity, setRecentActivity] = useState<any[]>([])
  const [categoryStats, setCategoryStats] = useState<any[]>([])

  useEffect(() => {
    loadAnalytics()
  }, [])

  const loadAnalytics = async () => {
    try {
      setLoading(true)
      
      // Load equipment data
      const equipmentResponse = await EquipmentService.getAll({ limit: 1000 })
      const categoriesResponse = await CategoryService.getAll()
      
      if (equipmentResponse.success && equipmentResponse.data) {
        const equipment = equipmentResponse.data || []
        
        // Calculate stats
        const totalEquipment = equipment.length
        const inStock = equipment.filter((item: any) => item.availability === 'In Stock').length
        const outOfStock = equipment.filter((item: any) => item.availability === 'Out of Stock').length
        const lowStock = equipment.filter((item: any) => {
          return item.stockQuantity && item.minStockLevel && item.stockQuantity <= item.minStockLevel
        }).length
        
        // Calculate total value
        const totalValue = equipment.reduce((sum: number, item: any) => {
          return sum + (item.price || 0)
        }, 0)
        
        setStats({
          totalEquipment,
          totalCategories: 0, // Will be set below
          inStock,
          outOfStock,
          lowStock,
          totalValue
        })
        
        // Generate recent activity from equipment data
        const activity = equipment
          .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, 5)
          .map((item: any, index: number) => ({
            id: index + 1,
            action: 'Equipment added',
            item: item.name,
            time: new Date(item.createdAt).toLocaleDateString(),
            user: 'admin'
          }))
        
        setRecentActivity(activity)
      }
      
      if (categoriesResponse.success && categoriesResponse.data) {
        const categories = categoriesResponse.data || []
        setStats(prev => ({ ...prev, totalCategories: categories.length }))
        
        // Generate category stats
        const catStats = categories.map((cat: any) => ({
          name: cat.name,
          count: 0, // Would need to count equipment per category
          percentage: 0
        }))
        setCategoryStats(catStats)
      }
      
    } catch (error) {
      console.error('Failed to load analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  // Dynamic stats based on real data
  const dynamicStats = [
    {
      name: 'Total Equipment',
      value: stats.totalEquipment.toString(),
      change: '+0%',
      changeType: 'increase',
      icon: Package,
      color: 'bg-blue-500'
    },
    {
      name: 'Categories',
      value: stats.totalCategories.toString(),
      change: '+0',
      changeType: 'increase',
      icon: FolderOpen,
      color: 'bg-green-500'
    },
    {
      name: 'In Stock',
      value: stats.inStock.toString(),
      change: '+0%',
      changeType: 'increase',
      icon: TrendingUp,
      color: 'bg-emerald-500'
    },
    {
      name: 'Out of Stock',
      value: stats.outOfStock.toString(),
      change: '0',
      changeType: 'decrease',
      icon: TrendingDown,
      color: 'bg-red-500'
    },
    {
      name: 'Total Value',
      value: `₦${stats.totalValue.toLocaleString()}`,
      change: '+0%',
      changeType: 'increase',
      icon: DollarSign,
      color: 'bg-purple-500'
    },
    {
      name: 'Low Stock Items',
      value: stats.lowStock.toString(),
      change: '0',
      changeType: 'decrease',
      icon: AlertCircle,
      color: 'bg-yellow-500'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
            <p className="text-gray-600">View equipment statistics and reports</p>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading analytics...</p>
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {dynamicStats.map((stat) => (
              <div key={stat.name} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                    <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    stat.changeType === 'increase' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {stat.change}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Category Distribution */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Category Distribution</h3>
              <div className="space-y-4">
                {categoryStats.map((category) => (
                  <div key={category.name} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                      <span className="text-sm font-medium text-gray-700">{category.name}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-gray-900">{category.count}</span>
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${category.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-500 w-12">{category.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">
                        <span className="font-medium">{activity.action}</span>
                        <span className="text-gray-600">: {activity.item}</span>
                      </p>
                      <p className="text-xs text-gray-500">
                        {activity.time} by {activity.user}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Insights */}
          <div className="mt-8 bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">75%</div>
                <div className="text-sm text-blue-800">Equipment in Stock</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">8</div>
                <div className="text-sm text-green-800">Active Categories</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">3</div>
                <div className="text-sm text-yellow-800">Low Stock Alerts</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Analytics
