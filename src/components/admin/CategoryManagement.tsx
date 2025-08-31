import React, { useState, useEffect } from 'react'
import AdminNavbar from './AdminNavbar'
import { Plus, Edit, Trash2 } from 'lucide-react'
import type { EquipmentCategory } from '../../types'
import { CategoryService } from '../../services/api'
import toast from 'react-hot-toast'

const CategoryManagement: React.FC = () => {
  const [categories, setCategories] = useState<EquipmentCategory[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<EquipmentCategory | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: '📁',
    sortOrder: 0
  })

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await CategoryService.getAll()
      if (response.success) {
        setCategories(response.data as unknown as EquipmentCategory[])
        toast.success('Categories loaded successfully')
      } else {
        setError(response.message || 'Failed to fetch categories')
        toast.error('Failed to fetch categories')
      }
    } catch (error) {
      const errorMessage = 'Error fetching categories'
      setError(errorMessage)
      console.error('Error fetching categories:', error)
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      if (editingCategory) {
        // Update existing category
        const response = await CategoryService.update(editingCategory._id, formData)
        if (response.success) {
          setCategories(categories.map(cat =>
            cat._id === editingCategory._id ? (response.data.category as EquipmentCategory) : cat
          ))
          setIsModalOpen(false)
          setEditingCategory(null)
          resetForm()
          toast.success('Category updated successfully!')
        } else {
          const errorMessage = response.message || 'Failed to update category'
          setError(errorMessage)
          toast.error(errorMessage)
          
          // Show validation errors if any
          if (response.errors) {
            Object.keys(response.errors).forEach(field => {
              toast.error(`${field}: ${response.errors![field]}`)
            })
          }
        }
      } else {
        // Create new category
        const response = await CategoryService.create(formData)
        if (response.success) {
          setCategories([...categories, response.data as unknown as EquipmentCategory])
          setIsModalOpen(false)
          resetForm()
          toast.success('Category created successfully!')
        } else {
          const errorMessage = response.message || 'Failed to create category'
          setError(errorMessage)
          toast.error(errorMessage)
          
          // Show validation errors if any
          if (response.errors) {
            Object.keys(response.errors).forEach(field => {
              toast.error(`${field}: ${response.errors![field]}`)
            })
          }
        }
      }
    } catch (error) {
      const errorMessage = 'Error saving category'
      setError(errorMessage)
      console.error('Error saving category:', error)
      toast.error(errorMessage)
    }
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        const response = await CategoryService.delete(id)
        if (response.success) {
          setCategories(categories.filter(cat => cat._id !== id))
          toast.success('Category deleted successfully!')
        } else {
          const errorMessage = response.message || 'Failed to delete category'
          setError(errorMessage)
          toast.error(errorMessage)
        }
      } catch (error) {
        const errorMessage = 'Error deleting category'
        setError(errorMessage)
        console.error('Error deleting category:', error)
        toast.error(errorMessage)
      }
    }
  }

  const handleEdit = (category: EquipmentCategory) => {
    setEditingCategory(category)
    setFormData({
      name: category.name,
      description: category.description,
      icon: category.icon,
      sortOrder: category.sortOrder || 0
    })
    setIsModalOpen(true)
  }

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      icon: '📁',
      sortOrder: 0
    })
  }

  const openCreateModal = () => {
    setEditingCategory(null)
    resetForm()
    setIsModalOpen(true)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Category Management</h1>
          <button
            onClick={openCreateModal}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus className="h-5 w-5" />
            Add Category
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div key={category._id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="text-4xl">{category.icon}</div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(category)}
                    className="text-blue-600 hover:text-blue-800 p-2"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(category._id)}
                    className="text-red-600 hover:text-red-800 p-2"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {category.name}
              </h3>
              <p className="text-gray-600 mb-4">{category.description}</p>
              
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Sort Order: {category.sortOrder}</span>
                <span>ID: {category._id}</span>
              </div>
            </div>
          ))}
        </div>

        {categories.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No categories found. Create your first category to get started.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {editingCategory ? 'Edit Category' : 'Create Category'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Icon
                </label>
                <input
                  type="text"
                  value={formData.icon}
                  onChange={(e) => setFormData({...formData, icon: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="📁"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sort Order
                </label>   
                <input
                  type="number"
                  value={formData.sortOrder}
                  onChange={(e) => setFormData({...formData, sortOrder: parseInt(e.target.value) || 0})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                >
                  {editingCategory ? 'Update' : 'Create'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false)
                    setEditingCategory(null)
                    resetForm()
                  }}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default CategoryManagement
