import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { EquipmentService } from '../services/api'
import type { Equipment } from '../types'
import { ArrowRight, Star, Package, Users, Award, Shield, Truck, Heart, Zap, CheckCircle } from 'lucide-react'

const Home: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Equipment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchFeaturedProducts()
  }, [])

  const fetchFeaturedProducts = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // First try to get featured products
      const featuredResponse = await EquipmentService.getFeatured(6)
      
      if (featuredResponse.success && featuredResponse.data && featuredResponse.data.length > 0) {
        setFeaturedProducts(featuredResponse.data)
      } else {
        // Fallback: get recent public products if no featured products
        const recentResponse = await EquipmentService.getPublic({ limit: 6 })
        
        if (recentResponse.success) {
          setFeaturedProducts(recentResponse.data || [])
        } else {
          setError(recentResponse.message || 'Failed to fetch products')
        }
      }
    } catch (error) {
      setError('Error fetching featured products')
      console.error('Error fetching featured products:', error)
    } finally {
      setLoading(false)
    }
  }

  const stats = [
    {
      icon: Package,
      value: '500+',
      label: 'Medical Equipment'
    },
    {
      icon: Users,
      value: '1000+',
      label: 'Happy Customers'
    },
    {
      icon: Award,
      value: '15+',
      label: 'Years Experience'    
    }
  ]

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-red-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading amazing medical equipment...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-50 via-blue-50 to-red-100 py-24 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-red-400 rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-blue-400 rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-red-300 rounded-full"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="mb-6">
            <span className="inline-block bg-gradient-to-r from-red-600 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-medium mb-4">
              Trusted by Healthcare Professionals Worldwide
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-blue-600">Medical Equipment</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-4xl mx-auto leading-relaxed">
            Discover our comprehensive range of high-quality medical equipment and supplies. 
            Trusted by healthcare professionals worldwide for excellence and reliability.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="group bg-gradient-to-r from-red-600 to-red-700 text-white px-10 py-5 rounded-xl text-lg font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center gap-3"
            >
              Browse Products
              <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/contact"
              className="group border-2 border-blue-600 text-blue-600 px-10 py-5 rounded-xl text-lg font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-105"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Decorative Separator */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-gray-400">✦ ✦ ✦</span>
        </div>
      </div>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Impact in Numbers</h2>
            <p className="text-xl text-gray-600">Delivering excellence across the healthcare industry</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6 transition-all duration-300 group-hover:scale-110 ${
                  index === 0 ? 'bg-gradient-to-br from-red-100 to-red-200' : 
                  index === 1 ? 'bg-gradient-to-br from-blue-100 to-blue-200' : 
                  'bg-gradient-to-br from-red-100 to-red-200'
                }`}>
                  <stat.icon className={`h-10 w-10 ${
                    index === 0 ? 'text-red-600' : index === 1 ? 'text-blue-600' : 'text-red-600'
                  }`} />
                </div>
                <div className="text-5xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">
                  {stat.value}
                </div>
                <div className="text-xl text-gray-600 mb-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Decorative Separator */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-gray-400">✦ ✦ ✦</span>
        </div>
      </div>

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Products</h2>
            <p className="text-xl text-gray-600">Quality medical equipment for your healthcare needs</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl mb-8 text-center max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-2">
                <span className="text-red-500">⚠</span>
                <span>{error}</span>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div key={product._id} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 transform hover:-translate-y-2">
                <div className="relative">
                  <img
                    src={product.image || '/placeholder-image.svg'}
                    alt={product.name}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder-image.svg'
                    }}
                  />
                  {product.isFeatured && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-red-600 to-red-700 text-white px-3 py-2 rounded-full text-sm font-medium shadow-lg">
                      Featured
                    </div>
                  )}
                </div>
                
                <div className="p-8">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-blue-600 font-medium bg-blue-50 px-3 py-1 rounded-full">
                      {product.categoryName || 'Medical Equipment'}
                    </span>
                    {product.rating && (
                      <div className="flex items-center gap-2 bg-yellow-50 px-3 py-1 rounded-full">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm text-yellow-700 font-medium">{product.rating}</span>
                      </div>
                    )}
                  </div>
                  
                  <h3 className="font-bold text-xl text-gray-900 mb-3 line-clamp-2 group-hover:text-red-600 transition-colors">
                    {product.name}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-6 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                    <Link
                      to={`/products/${product._id}`}
                      className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-300 text-sm font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {featuredProducts.length === 0 && !loading && (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <Package className="h-16 w-16 mx-auto" />
              </div>
              <p className="text-gray-500 text-xl">No products available at the moment.</p>
            </div>
          )}

          <div className="text-center mt-16">
            <Link
              to="/products"
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-red-600 to-red-700 text-white px-10 py-4 rounded-xl font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              View All Products
              <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Decorative Separator */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-gray-400">✦ ✦ ✦</span>
        </div>
      </div>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-br from-red-50 via-blue-50 to-red-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Hafak Surgicals?</h2>
            <p className="text-xl text-gray-600">We're committed to providing the best medical equipment solutions with excellence</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Package className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Quality Assured</h3>
              <p className="text-gray-600 leading-relaxed">All our products meet international quality standards and certifications, ensuring the highest level of safety and reliability.</p>
            </div>
            
            <div className="group bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Expert Support</h3>
              <p className="text-gray-600 leading-relaxed">Our team of medical equipment specialists is here to help you choose the right products for your specific needs.</p>
            </div>
            
            <div className="group bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Award className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Trusted Partner</h3>
              <p className="text-gray-600 leading-relaxed">Serving healthcare professionals with dedication and reliability for decades, building lasting relationships.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Decorative Separator */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-gray-400">✦ ✦ ✦</span>
        </div>
      </div>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600">Comprehensive medical equipment solutions for healthcare professionals</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <Package className="h-10 w-10 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Equipment Sales</h3>
              <p className="text-gray-600 leading-relaxed">Wide range of medical equipment and supplies for all healthcare needs</p>
            </div>
            
            <div className="group text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <Shield className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Maintenance</h3>
              <p className="text-gray-600 leading-relaxed">Professional maintenance and repair services to keep your equipment running</p>
            </div>
            
            <div className="group text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <Truck className="h-10 w-10 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Installation</h3>
              <p className="text-gray-600 leading-relaxed">Expert installation and setup services for complex medical equipment</p>
            </div>
            
            <div className="group text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <Users className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Training</h3>
              <p className="text-gray-600 leading-relaxed">Staff training and technical support to maximize equipment efficiency</p>
            </div>
          </div>
        </div>
      </section>

      {/* Decorative Separator */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-gray-400">✦ ✦ ✦</span>
        </div>
      </div>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 via-red-700 to-blue-600 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-10 w-32 h-32 bg-white rounded-full"></div>
          <div className="absolute bottom-10 left-10 w-24 h-24 bg-white rounded-full"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-red-100 mb-10 max-w-3xl mx-auto text-xl leading-relaxed">
            Contact us today to discuss your medical equipment needs. Our experts are here to help you find the perfect solutions for your healthcare facility.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/products"
              className="group bg-white text-red-600 px-10 py-4 rounded-xl text-lg font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center gap-3"
            >
              Browse Equipment
              <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/contact"
              className="group border-2 border-white text-white px-10 py-4 rounded-xl text-lg font-bold hover:bg-white hover:text-red-600 transition-all duration-300 transform hover:scale-105"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6">
            <Package className="h-12 w-12 text-red-400 mx-auto" />
          </div>
          <p className="text-lg mb-4">
            <strong>Hafak Surgicals</strong> - Your Trusted Medical Equipment Partner
          </p>
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} Hafak Surgicals. All rights reserved. | 
            Made with care for healthcare professionals
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Home
