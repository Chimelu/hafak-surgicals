import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { EquipmentService } from '../services/api'
import type { Equipment } from '../types'
import { Search, Filter, Star, Heart } from 'lucide-react'
import { WHATSAPP_NUMBER, WHATSAPP_MESSAGE_TEMPLATE } from '../config/constants'
import { useScrollToTop, scrollToTop } from '../hooks/useScrollToTop'

const Products: React.FC = () => {
  const [products, setProducts] = useState<Equipment[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  // error state removed as it's not displayed in the UI
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  // totalPages removed as it's not used in the UI

  // Scroll to top when component mounts
  useScrollToTop([])

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    fetchProducts()
  }, [currentPage, selectedCategory, searchTerm])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      // Error handling removed as it's not displayed in the UI
      
      console.log('Fetching products with params:', { currentPage, searchTerm, selectedCategory })
      
      const response = await EquipmentService.getPublic({
        page: currentPage,
        limit: 12,
        search: searchTerm || undefined,
        category: selectedCategory || undefined
      })
      
      console.log('API Response:', response)
      
      if (response.success) {
        // The API returns { success: true, data: [...], pagination: {...} }
        setProducts(response.data || [])
        // Pagination handling removed as it's not used in the UI
        console.log('Products fetched:', response.data?.length || 0)
      } else {
        console.error('Failed to fetch products:', response.message)
      }
    } catch (error) {
      console.error('Error fetching products:', error)
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await EquipmentService.getCategories()
      if (response.success) {
        const categoryNames = response.data.map((cat: any) => cat.name)
        setCategories(categoryNames)
        console.log('Categories fetched:', categoryNames)
      } else {
        console.error('Failed to fetch categories:', response.message)
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const handleSearch = () => {
    setCurrentPage(1)
    fetchProducts()
    // Scroll to top when search results change
    scrollToTop()
  }

  const handleCategoryChange = (category: string) => {
    console.log('Category changed to:', category)
    setSelectedCategory(category)
    setCurrentPage(1)
    // Scroll to top when category changes
    scrollToTop()
  }

  const handleWhatsAppQuote = (product: Equipment) => {
    const message = WHATSAPP_MESSAGE_TEMPLATE(product)
    
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`
    
    window.open(whatsappUrl, '_blank')
  }

  if (loading && products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-50 to-blue-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900">Medical Equipment/consumables</h1>
          <p className="mt-2 text-gray-600">Discover our comprehensive range of medical equipment/consumables and supplies</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Bar */}
                 <div className="bg-white rounded-lg shadow p-4 sm:p-6 mb-6 sm:mb-8 border border-gray-200">
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search equipment..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

                                    <div className="sm:col-span-2 lg:col-span-1">
               <label className="block text-sm font-medium text-gray-700 mb-2">&nbsp;</label>
               <button
                 onClick={handleSearch}
                 className="w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 text-sm"
               >
                 <Filter className="h-4 w-4 inline mr-2" />
                 Search
               </button>
             </div>
          </div>
        </div>

        {/* Products Grid/List */}
        {products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {products.map((product) => {
              console.log('Rendering product:', product.name, 'Image:', product.image)
              return (
                <ProductCard key={product._id} product={product} onWhatsAppQuote={handleWhatsAppQuote} />
              )
            })}
          </div>
        )}

        {products.length === 0 && !loading && (
          <div className="text-center py-12">
            <Search className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No products found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search terms or filters.
            </p>
          </div>
        )}
      </div>
      
      {/* Footer */}
      <div className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Hafak Surgicals. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}

// Product Card Component
const ProductCard: React.FC<{ product: Equipment; onWhatsAppQuote: (product: Equipment) => void }> = ({ product, onWhatsAppQuote }) => (
  <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden border border-gray-200">
    <div className="relative image-container">
             <img
         src={product.image || '/placeholder-image.svg'}
         alt={product.name}
         className="w-full h-48 sm:h-56 md:h-64 object-contain object-center"
        onLoad={(e) => {
          console.log('Image loaded successfully:', product.image)
          e.currentTarget.classList.remove('image-loading')
        }}
        onError={(e) => {
          console.error('Image failed to load:', product.image, e)
          e.currentTarget.src = '/placeholder-image.svg'
          e.currentTarget.classList.remove('image-loading')
        }}
        onLoadStart={(e) => {
          e.currentTarget.classList.add('image-loading')
        }}
      />
      <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50">
        <Heart className="h-5 w-5 text-red-400 hover:text-red-600" />
      </button>
      {product.availability === 'Out of Stock' && (
        <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
          Out of Stock
        </div>
      )}
    </div>
    
         <div className="p-3 sm:p-4">
       <div className="flex items-center justify-between mb-2">
         <span className="text-xs sm:text-sm text-blue-600 font-medium">{product.categoryName || 'Medical Equipment/consumables'}</span>
         {product.rating && (
           <div className="flex items-center gap-1">
             <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400 fill-current" />
             <span className="text-xs sm:text-sm text-gray-600">{product.rating}</span>
           </div>
         )}
       </div>
       
       <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 text-sm sm:text-base">
         {product.name}
       </h3>
       
       <p className="text-gray-600 text-xs sm:text-sm mb-3 line-clamp-2">
         {product.description}
       </p>
       
       <div className="flex items-center justify-between mb-3">
         <span className="text-xs sm:text-sm text-gray-500">{product.brand}</span>
       </div>
      
             <div className="flex gap-2">
         <Link
           to={`/products/${product._id}`}
           className="flex-1 bg-red-600 text-white text-center py-2 px-3 sm:px-4 rounded-md hover:bg-red-700 transition-colors text-xs sm:text-sm"
         >
           View Details
         </Link>
         <button 
           onClick={() => onWhatsAppQuote(product)}
           className="p-2 border border-gray-300 rounded-md hover:bg-gray-50"
           title="Get Quote on WhatsApp"
         >
           <svg className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
)

// ProductListItem component removed as it's not used

export default Products