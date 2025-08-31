import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { EquipmentService } from '../services/api'
import type { Equipment } from '../types'
import { ArrowLeft, Star, Heart, Shield, Truck, CheckCircle } from 'lucide-react'
import { WHATSAPP_NUMBER, WHATSAPP_MESSAGE_TEMPLATE } from '../config/constants'

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<Equipment | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (id) {
      fetchProduct(id)
    }
  }, [id])

  const fetchProduct = async (productId: string) => {
    try {
      setLoading(true)
      setError(null)
      const response = await EquipmentService.getPublicById(productId)
      if (response.success) {
        setProduct(response.data)
      } else {
        setError(response.message || 'Failed to fetch product')
      }
    } catch (error) {
      setError('Error fetching product')
      console.error('Error fetching product:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleWhatsAppQuote = (product: Equipment) => {
    const message = WHATSAPP_MESSAGE_TEMPLATE(product)
    
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`
    
    window.open(whatsappUrl, '_blank')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
          <p className="text-gray-600 mb-6">{error || 'The product you are looking for does not exist.'}</p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-50 to-blue-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            to="/products"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Product Details</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6 text-center">
            {error}
          </div>
        )}

        {product && (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Product Image */}
              <div className="p-8">
                <div className="relative">
                                     <img
                     src={product.image || '/placeholder-image.svg'}
                     alt={product.name}
                     className="w-full h-96 object-cover rounded-lg"
                     onError={(e) => {
                       e.currentTarget.src = '/placeholder-image.svg'
                     }}
                   />
                  {product.availability === 'Out of Stock' && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded text-sm font-medium">
                      Out of Stock
                    </div>
                  )}
                  <button className="absolute top-4 right-4 p-3 bg-white rounded-full shadow-md hover:bg-gray-50">
                    <Heart className="h-6 w-6 text-red-400 hover:text-red-600" />
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-8">
                <div className="mb-6">
                  <span className="text-sm text-blue-600 font-medium">{product.categoryName || 'Medical Equipment'}</span>
                  <h1 className="text-3xl font-bold text-gray-900 mt-2 mb-4">{product.name}</h1>
                  {product.rating && (
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${
                              i < Math.floor(product.rating!) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-gray-600">({product.rating} out of 5)</span>
                      {product.reviewCount && (
                        <span className="text-gray-500">• {product.reviewCount} reviews</span>
                      )}
                    </div>
                  )}
                  <p className="text-gray-600 text-lg leading-relaxed">{product.description}</p>
                </div>

                <div className="border-t border-gray-200 pt-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-bold text-gray-900">${product.price}</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      product.availability === 'In Stock' ? 'bg-green-100 text-green-800' :
                      product.availability === 'Low Stock' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {product.availability}
                    </span>
                  </div>

                                     <div className="flex gap-3">
                     <button 
                       onClick={() => handleWhatsAppQuote(product)}
                       className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                     >
                       <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                         <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                       </svg>
                       Get Quote on WhatsApp
                     </button>
                     <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                       <Heart className="h-5 w-5 text-red-400" />
                     </button>
                   </div>
                </div>

                {/* Product Details */}
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Details</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {product.brand && (
                      <div>
                        <span className="text-gray-500">Brand:</span>
                        <span className="ml-2 text-gray-900">{product.brand}</span>
                      </div>
                    )}
                    {product.model && (
                      <div>
                        <span className="text-gray-500">Model:</span>
                        <span className="ml-2 text-gray-900">{product.model}</span>
                      </div>
                    )}
                    <div>
                      <span className="text-gray-500">Condition:</span>
                      <span className="ml-2 text-gray-900">{product.condition}</span>
                    </div>
                    {product.warranty && (
                      <div>
                        <span className="text-gray-500">Warranty:</span>
                        <span className="ml-2 text-gray-900">{product.warranty}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Specifications & Features */}
            <div className="border-t border-gray-200 p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Specifications */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-blue-600" />
                    Specifications
                  </h3>
                  <ul className="space-y-2">
                    {product.specifications.map((spec, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Features */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Truck className="h-5 w-5 text-red-600" />
                    Key Features
                  </h3>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Hafak Surgicals. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default ProductDetail
