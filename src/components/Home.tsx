import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { EquipmentService } from '../services/api'
import type { Equipment } from '../types'
import { ArrowRight, Package, Users, Award, Shield, Truck, Star } from 'lucide-react'
import { useScrollToTop } from '../hooks/useScrollToTop'

const Home: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Equipment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  // Scroll to top when component mounts
  useScrollToTop([])

  useEffect(() => {
    fetchFeaturedProducts()
    // Trigger animations after component mounts
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
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
      label: 'Medical Equipment/consumables'
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
        <div className="text-center animate-fade-in">
          <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-red-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600 animate-pulse">Loading amazing medical equipment/consumables...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Curved Background */}
      <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden">
        {/* Curved background with gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-blue-50 to-red-100">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-full">
              <svg className="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fef2f2" stopOpacity="0.8"/>
                    <stop offset="50%" stopColor="#eff6ff" stopOpacity="0.6"/>
                    <stop offset="100%" stopColor="#fef2f2" stopOpacity="0.8"/>
                  </linearGradient>
                </defs>
                <path 
                  d="M0,200 Q300,100 600,200 T1200,200 L1200,800 L0,800 Z" 
                  fill="url(#heroGradient)"
                  className="animate-float"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Animated decorative elements - hidden on mobile for better readability */}
        <div className="absolute inset-0 opacity-20 hidden md:block">
          <div className="absolute top-10 left-10 w-32 h-32 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-red-300 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-blue-300 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className={`mb-4 sm:mb-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="inline-block bg-gradient-to-r from-red-600 to-blue-600 text-white px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4 animate-fade-in-up">
              Trusted by Healthcare Professionals Worldwide
            </span>
          </div>
          
          <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-blue-600 animate-gradient">Medical Equipment/consumables</span>
          </h1>
          <p className={`text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 md:mb-10 max-w-4xl mx-auto leading-relaxed px-2 sm:px-0 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Discover our comprehensive range of high-quality medical equipment/consumables and supplies. 
            Trusted by healthcare professionals worldwide for excellence and reliability.
          </p>
          <div className={`flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Link
              to="/products"
              className="group bg-gradient-to-r from-red-600 to-red-700 text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-xl text-base sm:text-lg font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-2 sm:gap-3 animate-fade-in-up"
            >
              Browse Products
              <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/contact"
              className="group border-2 border-blue-600 text-blue-600 px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-xl text-base sm:text-lg font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-105 animate-fade-in-up"
              style={{ animationDelay: '0.2s' }}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Curved Separator */}
      <div className="relative -mt-12 sm:-mt-16 md:-mt-20">
        <svg className="w-full h-12 sm:h-16 md:h-20" viewBox="0 0 1200 80" preserveAspectRatio="none">
          <path 
            d="M0,80 Q300,0 600,80 T1200,80 L1200,80 L0,80 Z" 
            fill="white"
            className="animate-slide-up"
          />
        </svg>
      </div>

      {/* Stats Section with Staggered Animation */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-8 sm:mb-12 md:mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Our Impact in Numbers</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">Delivering excellence across the healthcare industry</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className={`text-center group transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl mb-4 sm:mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 ${
                  index === 0 ? 'bg-gradient-to-br from-red-100 to-red-200' : 
                  index === 1 ? 'bg-gradient-to-br from-blue-100 to-blue-200' : 
                  'bg-gradient-to-br from-red-100 to-red-200'
                }`}>
                  <stat.icon className={`h-8 w-8 sm:h-10 sm:w-10 transition-all duration-300 ${
                    index === 0 ? 'text-red-600' : index === 1 ? 'text-blue-600' : 'text-red-600'
                  }`} />
                </div>
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-red-600 transition-colors duration-300">
                  {stat.value}
                </div>
                <div className="text-base sm:text-lg md:text-xl text-gray-600 mb-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curved Separator */}
      <div className="relative">
        <svg className="w-full h-16" viewBox="0 0 1200 64" preserveAspectRatio="none">
          <path 
            d="M0,0 Q300,64 600,0 T1200,0 L1200,64 L0,64 Z" 
            fill="#f9fafb"
            className="animate-slide-down"
          />
        </svg>
      </div>

      {/* Featured Products with Card Animations */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Products</h2>
            <p className="text-xl text-gray-600">Quality medical equipment/consumables for your healthcare needs</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl mb-8 text-center max-w-2xl mx-auto animate-shake">
              <div className="flex items-center justify-center gap-2">
                <span className="text-red-500">⚠</span>
                <span>{error}</span>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <div 
                key={product._id} 
                className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 transform hover:-translate-y-2 hover:rotate-1 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.image || '/placeholder-image.svg'}
                    alt={product.name}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder-image.svg'
                    }}
                  />
                  {product.isFeatured && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-red-600 to-red-700 text-white px-3 py-2 rounded-full text-sm font-medium shadow-lg animate-pulse">
                      Featured
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <div className="p-8">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-blue-600 font-medium bg-blue-50 px-3 py-1 rounded-full group-hover:bg-blue-100 transition-colors">
                      {product.categoryName || 'Medical Equipment/consumables'}
                    </span>
                                            {product.rating && (
                          <div className="flex items-center gap-2 bg-yellow-50 px-3 py-1 rounded-full group-hover:bg-yellow-100 transition-colors">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="text-sm text-yellow-700 font-medium">{product.rating}</span>
                          </div>
                        )}
                  </div>
                  
                  <h3 className="font-bold text-xl text-gray-900 mb-3 line-clamp-2 group-hover:text-red-600 transition-colors duration-300">
                    {product.name}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-6 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900 group-hover:text-red-600 transition-colors">₦{product.price}</span>
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
            <div className="text-center py-16 animate-fade-in">
              <div className="text-gray-400 mb-4">
                <Package className="h-16 w-16 mx-auto animate-bounce" />
              </div>
              <p className="text-gray-500 text-xl">No products available at the moment.</p>
            </div>
          )}

          <div className={`text-center mt-16 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
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

      {/* Curved Separator */}
      <div className="relative">
        <svg className="w-full h-16" viewBox="0 0 1200 64" preserveAspectRatio="none">
          <path 
            d="M0,64 Q300,0 600,64 T1200,64 L1200,64 L0,64 Z" 
            fill="white"
            className="animate-slide-up"
          />
        </svg>
      </div>

      {/* Why Choose Us with Floating Cards */}
      <section className="py-20 bg-gradient-to-br from-red-50 via-blue-50 to-red-100 relative overflow-hidden">
        {/* Floating background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-16 h-16 bg-red-400 rounded-full animate-float" style={{ animationDelay: '0s' }}></div>
          <div className="absolute bottom-20 right-20 w-12 h-12 bg-blue-400 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 right-1/3 w-8 h-8 bg-red-300 rounded-full animate-float" style={{ animationDelay: '4s' }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Hafak Surgicals?</h2>
            <p className="text-xl text-gray-600">We're committed to providing the best medical equipment/consumables solutions with excellence</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Package,
                title: "Quality Assured",
                description: "All our products meet international quality standards and certifications, ensuring the highest level of safety and reliability.",
                color: "red"
              },
              {
                icon: Users,
                title: "Expert Support",
                description: "Our team of medical equipment/consumables specialists is here to help you choose the right products for your specific needs.",
                color: "blue"
              },
              {
                icon: Award,
                title: "Trusted Partner",
                description: "Serving healthcare professionals with dedication and reliability for decades, building lasting relationships.",
                color: "red"
              }
            ].map((item, index) => (
              <div 
                key={index}
                className={`group bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 hover:rotate-1 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className={`w-16 h-16 bg-gradient-to-br from-${item.color}-100 to-${item.color}-200 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                  <item.icon className={`h-8 w-8 text-${item.color}-600`} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-red-600 transition-colors">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curved Separator */}
      <div className="relative">
        <svg className="w-full h-16" viewBox="0 0 1200 64" preserveAspectRatio="none">
          <path 
            d="M0,0 Q300,64 600,0 T1200,0 L1200,64 L0,64 Z" 
            fill="#f9fafb"
            className="animate-slide-down"
          />
        </svg>
      </div>

      {/* Services Section with Icon Animations */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600">Comprehensive medical equipment/consumables solutions for healthcare professionals</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Package, title: "Equipment Sales", description: "Wide range of medical equipment/consumables and supplies for all healthcare needs", color: "red" },
              { icon: Shield, title: "Maintenance", description: "Regular maintenance and repair services to keep your medical equipment/consumables running smoothly", color: "blue" },
              { icon: Truck, title: "Installation", description: "Expert installation and setup services for complex medical equipment/consumables", color: "red" },
              { icon: Users, title: "Training", description: "Staff training and technical support to maximize equipment efficiency", color: "blue" }
            ].map((service, index) => (
              <div 
                key={index}
                className={`group text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className={`w-20 h-20 bg-gradient-to-br from-${service.color}-100 to-${service.color}-200 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg group-hover:shadow-xl`}>
                  <service.icon className={`h-10 w-10 text-${service.color}-600 group-hover:scale-110 transition-transform`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curved Separator */}
      <div className="relative">
        <svg className="w-full h-16" viewBox="0 0 1200 64" preserveAspectRatio="none">
          <path 
            d="M0,64 Q300,0 600,64 T1200,64 L1200,64 L0,64 Z" 
            fill="white"
            className="animate-slide-up"
          />
        </svg>
      </div>

      {/* CTA Section with Animated Background */}
      <section className="py-20 bg-gradient-to-r from-red-600 via-red-700 to-blue-600 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-10 w-32 h-32 bg-white rounded-full animate-ping" style={{ animationDelay: '0s' }}></div>
          <div className="absolute bottom-10 left-10 w-24 h-24 bg-white rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-white rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
            <p className="text-red-100 mb-10 max-w-3xl mx-auto text-xl leading-relaxed">
              Contact us today to discuss your medical equipment/consumables needs. Our experts are here to help you find the perfect solutions for your healthcare facility.
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
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6">
            <Package className="h-12 w-12 text-red-400 mx-auto animate-bounce" />
          </div>
          <p className="text-lg mb-4">
            <strong>Hafak Surgicals</strong> - Your Trusted Medical Equipment/consumables Partner
          </p>
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} Hafak Surgicals. All rights reserved. | 
            Made with care for healthcare professionals
          </p>
        </div>
      </footer>

      {/* Animation styles are included in the main CSS */}
    </div>
  )
}

export default Home
