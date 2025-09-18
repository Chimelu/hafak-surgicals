import React, { useState, useEffect } from 'react'
import AdminNavbar from './AdminNavbar'
import { EquipmentService, CategoryService, ImageUploadService } from '../../services/api'
import type { Equipment, EquipmentCategory } from '../../types'
import { 
  Plus, 
  Search, 
  Filter,
  Package
} from 'lucide-react'
import toast from 'react-hot-toast'

const EquipmentManagement: React.FC = () => {
  const [equipment, setEquipment] = useState<Equipment[]>([])
  const [categories, setCategories] = useState<EquipmentCategory[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})
  const [showForm, setShowForm] = useState(false)
  const [editingEquipment, setEditingEquipment] = useState<Equipment | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedAvailability, setSelectedAvailability] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  // Load equipment and categories on component mount
  useEffect(() => {
    loadData()
  }, [currentPage, selectedCategory, selectedAvailability])

  const loadData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Load categories
      const categoriesResponse = await CategoryService.getAll()
      console.log('Categories response:', categoriesResponse)
      if (categoriesResponse.success) {
        setCategories(categoriesResponse.data as unknown as EquipmentCategory[] || [])
        toast.success('Categories loaded successfully')
      } else {
        setCategories([])
        console.error('Failed to load categories:', categoriesResponse.message)
        toast.error('Failed to load categories')
      }

      // Load equipment with filters
      const equipmentResponse = await EquipmentService.getAll({
        page: currentPage,
        limit: 10,
        search: searchTerm || undefined,
        categoryId: selectedCategory || undefined,
        availability: selectedAvailability || undefined
      })
      console.log('Equipment response:', equipmentResponse)

      if (equipmentResponse.success) {
        // Backend returns { success: true, data: equipment[], pagination: {...} }
        const equipmentData = equipmentResponse.data || [];
        setEquipment(equipmentData);
        
        // Handle pagination
        if (equipmentResponse.pagination) {
          setTotalPages(equipmentResponse.pagination.pages);
        }
        
        toast.success('Equipment loaded successfully');
      } else {
        setEquipment([]);
        console.error('Failed to load equipment:', equipmentResponse.message);
        toast.error('Failed to load equipment');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load data'
      setError(errorMessage)
      setCategories([])
      setEquipment([])
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = () => {
    setCurrentPage(1)
    loadData()
  }

  const handleSave = async (equipmentData: any, imageFile?: File | null) => {
    try {
      setLoading(true)
      setError(null)
      setValidationErrors({}) // Clear previous validation errors

      // Build JSON payload
      const payload: any = {
        name: equipmentData.name,
        description: equipmentData.description,
        categoryId: equipmentData.categoryId,
        image: equipmentData.image || '',
        availability: equipmentData.availability,
        specifications: Array.isArray(equipmentData.specifications)
          ? equipmentData.specifications.filter((s: string) => s && s.trim() !== '')
          : [],
        features: Array.isArray(equipmentData.features)
          ? equipmentData.features.filter((f: string) => f && f.trim() !== '')
          : [],
        brand: equipmentData.brand,
        model: equipmentData.model,
        condition: equipmentData.condition,
        warranty: equipmentData.warranty,
        stockQuantity: typeof equipmentData.stockQuantity === 'number'
          ? equipmentData.stockQuantity
          : Number(equipmentData.stockQuantity || 0),
        minStockLevel: typeof equipmentData.minStockLevel === 'number'
          ? equipmentData.minStockLevel
          : Number(equipmentData.minStockLevel || 0)
      }

      // Upload image if a new file was selected
      if (imageFile) {
        try {
          const uploadRes: any = await ImageUploadService.uploadImage(imageFile)
          if (uploadRes && uploadRes.success && uploadRes.data && uploadRes.data.url) {
            payload.image = uploadRes.data.url
          } else if (uploadRes && uploadRes.url) {
            // Fallback if API returns plain object
            payload.image = uploadRes.url
          } else {
            toast.error('Image upload failed to return a URL')
          }
        } catch (e) {
          const msg = e instanceof Error ? e.message : 'Image upload failed'
          toast.error(msg)
          setLoading(false)
          return
        }
      } else if (editingEquipment && editingEquipment.image && !payload.image) {
        // Preserve existing image if editing and no new image provided
        payload.image = editingEquipment.image
      }

      let response
      if (editingEquipment) {
        response = await EquipmentService.update(editingEquipment._id, payload)
      } else {
        response = await EquipmentService.create(payload)
      }

      if (response.success) {
        // Only close form and clear data on success
        setShowForm(false)
        setEditingEquipment(null)
        setValidationErrors({}) // Clear validation errors on success
        toast.success(editingEquipment ? 'Equipment updated successfully!' : 'Equipment added successfully!')
        loadData()
      } else {
        // Show validation errors from backend but keep form open
        const errorMessage = response.message || 'Failed to save equipment'
        setError(errorMessage)
        toast.error(errorMessage)
        
        // If there are field-specific errors, set them for display in the form
        if (response.errors && typeof response.errors === 'object') {
          const errors: Record<string, string> = {}
          Object.entries(response.errors).forEach(([field, message]) => {
            if (typeof message === 'string') {
              errors[field] = message
              toast.error(`${field}: ${message}`)
            }
          })
          setValidationErrors(errors)
        }
        
        // Don't close the form - let user fix the errors
        // Form data is preserved in the EquipmentForm component
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to save equipment'
      setError(errorMessage)
      toast.error(errorMessage)
      
      // Don't close the form on network/other errors either
      // Let user retry or fix any issues
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this equipment?')) {
      return
    }

    try {
      setLoading(true)
      setError(null)

      const response = await EquipmentService.delete(id)
      if (response.success) {
        toast.success('Equipment deleted successfully!')
        loadData()
      } else {
        const errorMessage = response.message || 'Failed to delete equipment'
        setError(errorMessage)
        toast.error(errorMessage)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete equipment'
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (equipment: Equipment) => {
    setEditingEquipment(equipment)
    setValidationErrors({}) // Clear validation errors when editing
    setShowForm(true)
  }

  const handleAddNew = () => {
    setEditingEquipment(null)
    setValidationErrors({}) // Clear validation errors when adding new
    setShowForm(true)
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setEditingEquipment(null)
    setValidationErrors({}) // Clear validation errors when closing form
  }

  if (loading && equipment.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminNavbar />
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading equipment...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Equipment Management</h1>
          <p className="mt-2 text-gray-600">Manage your medical equipment/consumables inventory</p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error loading data</h3>
                <div className="mt-2 text-sm text-red-700">
                  {error}
                </div>
                <div className="mt-4">
                  <button
                    onClick={loadData}
                    className="bg-red-100 text-red-800 px-3 py-2 rounded-md text-sm font-medium hover:bg-red-200"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search equipment..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Categories</option>
                {categories && categories.length > 0 ? categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                )) : (
                  <option value="" disabled>No categories available</option>
                )}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
              <select
                value={selectedAvailability}
                onChange={(e) => setSelectedAvailability(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All</option>
                <option value="In Stock">In Stock</option>
                <option value="Out of Stock">Out of Stock</option>
                <option value="Low Stock">Low Stock</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={handleSearch}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <Filter className="h-4 w-4 inline mr-2" />
                Filter
              </button>
            </div>
          </div>
        </div>

        {/* Add Equipment Button */}
        <div className="mb-6">
          <button
            onClick={handleAddNew}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Plus className="h-4 w-4 inline mr-2" />
            Add Equipment
          </button>
        </div>

        {/* Equipment Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Equipment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Availability
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {equipment && equipment.length > 0 ? equipment.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          {item.image ? (
                            <img
                              className="h-10 w-10 rounded-lg object-cover"
                              src={item.image}
                              alt={item.name}
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-lg bg-gray-200 flex items-center justify-center">
                              <Package className="h-5 w-5 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{item.name}</div>
                          <div className="text-sm text-gray-500">{item.brand} {item.model}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.categoryName || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        item.availability === 'In Stock' ? 'bg-green-100 text-green-800' :
                        item.availability === 'Low Stock' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {item.availability}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.stockQuantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                      {loading ? 'Loading equipment...' : 'No equipment found'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing page <span className="font-medium">{currentPage}</span> of{' '}
                    <span className="font-medium">{totalPages}</span>
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                    >
                      Next
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Equipment Form Modal */}
        {showForm && (
          <EquipmentForm
            equipment={editingEquipment}
            categories={categories}
            onSave={handleSave}
            onCancel={handleCloseForm}
            validationErrors={validationErrors}
            setValidationErrors={setValidationErrors}
          />
        )}
      </div>
    </div>
  )
}

// Equipment Form Component
interface EquipmentFormProps {
  equipment: Equipment | null
  categories: EquipmentCategory[]
  onSave: (data: any, imageFile?: File | null) => void
  onCancel: () => void
  validationErrors: Record<string, string>
  setValidationErrors: (errors: Record<string, string>) => void
}

const EquipmentForm: React.FC<EquipmentFormProps> = ({ equipment, categories, onSave, onCancel, validationErrors }) => {
  const [formData, setFormData] = useState({
    name: equipment?.name || '',
    description: equipment?.description || '',
    categoryId: equipment?.categoryId || '',
    image: equipment?.image || '',
    availability: equipment?.availability || 'In Stock',
    specifications: equipment?.specifications || [''],
    features: equipment?.features || [''],
    brand: equipment?.brand || '',
    model: equipment?.model || '',
    condition: equipment?.condition || 'New',
    warranty: equipment?.warranty || '',
    stockQuantity: equipment?.stockQuantity || 1,
    minStockLevel: equipment?.minStockLevel || 1
  })

  const [imageFile, setImageFile] = useState<File | null>(null)

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleArrayChange = (field: string, index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field as keyof typeof prev] as string[]).map((item: string, i: number) => 
        i === index ? value : item
      )
    }))
  }

  const addArrayItem = (field: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...(prev[field as keyof typeof prev] as string[]), '']
    }))
  }

  const removeArrayItem = (field: string, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field as keyof typeof prev] as string[]).filter((_: string, i: number) => i !== index)
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Prepare plain JSON payload; image upload handled upstream
    const submitData: any = {
      ...formData,
      specifications: formData.specifications.filter((s) => s && s.trim() !== ''),
      features: formData.features.filter((f) => f && f.trim() !== ''),
    }

    onSave(submitData, imageFile)
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              {equipment ? 'Edit Equipment' : 'Add New Equipment'}
            </h3>
            <button
              onClick={onCancel}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {validationErrors.name && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Category *</label>
                <select
                  required
                  value={formData.categoryId}
                  onChange={(e) => handleInputChange('categoryId', e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Category</option>
                  {categories && categories.length > 0 ? categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  )) : (
                    <option value="" disabled>No categories available</option>
                  )}
                </select>
                {validationErrors.categoryId && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.categoryId}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Brand</label>
                <input
                  type="text"
                  value={formData.brand}
                  onChange={(e) => handleInputChange('brand', e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {validationErrors.brand && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.brand}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Model</label>
                <input
                  type="text"
                  value={formData.model}
                  onChange={(e) => handleInputChange('model', e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {validationErrors.model && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.model}</p>
                )}
              </div>


              <div>
                <label className="block text-sm font-medium text-gray-700">Availability</label>
                <select
                  value={formData.availability}
                  onChange={(e) => handleInputChange('availability', e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="In Stock">In Stock</option>
                  <option value="Low Stock">Low Stock</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
                {validationErrors.availability && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.availability}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Stock Quantity</label>
                <input
                  type="number"
                  min="0"
                  value={formData.stockQuantity}
                  onChange={(e) => handleInputChange('stockQuantity', parseInt(e.target.value) || 0)}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {validationErrors.stockQuantity && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.stockQuantity}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Condition</label>
                <select
                  value={formData.condition}
                  onChange={(e) => handleInputChange('condition', e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="New">New</option>
                  <option value="Used">Used</option>
                  <option value="Refurbished">Refurbished</option>
                </select>
                {validationErrors.condition && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.condition}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description *</label>
              <textarea
                required
                rows={3}
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {validationErrors.description && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.description}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Specifications</label>
              {formData.specifications.map((spec, index) => (
                <div key={index} className="flex gap-2 mt-2">
                  <input
                    type="text"
                    value={spec}
                    onChange={(e) => handleArrayChange('specifications', index, e.target.value)}
                    className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter specification"
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayItem('specifications', index)}
                    className="px-3 py-2 text-red-600 hover:text-red-800"
                  >
                    ✕
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('specifications')}
                className="mt-2 text-blue-600 hover:text-blue-800 text-sm"
              >
                + Add Specification
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Features</label>
              {formData.features.map((feature, index) => (
                <div key={index} className="flex gap-2 mt-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => handleArrayChange('features', index, e.target.value)}
                    className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter feature"
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayItem('features', index)}
                    className="px-3 py-2 text-red-600 hover:text-red-800"
                  >
                    ✕
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('features')}
                className="mt-2 text-blue-600 hover:text-blue-800 text-sm"
              >
                + Add Feature
              </button>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {equipment ? 'Update Equipment' : 'Add Equipment'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EquipmentManagement
