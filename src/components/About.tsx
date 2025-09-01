import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Award, Target, Users, Clock, Shield, Heart } from 'lucide-react'
import { companyInfo, officeInfo } from '../data/mockData'
import { useScrollToTop } from '../hooks/useScrollToTop'

const About: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)

  // Scroll to top when component mounts
  useScrollToTop([])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">About Hafak Surgicals</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8">
            Your trusted partner in medical equipment/consumables for over 15 years
          </p>
          <button
            onClick={() => {
              const currentUrl = window.location.href
              const message = `Hi! I'd like to learn more about Hafak Surgicals and get a quote for medical equipment/consumables.\n\nAbout Page: ${currentUrl}`
              const whatsappUrl = `https://wa.me/${officeInfo.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`
              window.open(whatsappUrl, '_blank')
            }}
            className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg gap-2"
          >
            <span>💬</span>
            Get Quote on WhatsApp
          </button>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Who We Are</h2>
              <p className="text-lg text-gray-600 mb-6">{companyInfo.description}</p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Clock className="h-6 w-6 text-red-600 mr-3" />
                  <span className="text-gray-700">15+ Years of Experience</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-6 w-6 text-blue-600 mr-3" />
                  <span className="text-gray-700">Serving Healthcare Professionals</span>
                </div>
                <div className="flex items-center">
                  <Shield className="h-6 w-6 text-red-600 mr-3" />
                  <span className="text-gray-700">Quality Assured Products</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-red-100 to-blue-100 rounded-2xl p-8">
                <div className="text-center">
                  <div className="text-8xl mb-4">🏥</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Medical Excellence</h3>
                  <p className="text-gray-600">Committed to advancing healthcare through innovative equipment</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="text-center mb-6">
                <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              </div>
              <p className="text-gray-600 text-center leading-relaxed">{companyInfo.mission}</p>
            </div>

            {/* Vision */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="text-center mb-6">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              </div>
              <p className="text-gray-600 text-center leading-relaxed">{companyInfo.vision}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience & Expertise */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Experience & Expertise</h2>
            <p className="text-lg text-gray-600">Building trust through years of dedicated service</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-red-600">15+</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Years of Experience</h3>
              <p className="text-gray-600">Serving the healthcare industry with dedication and expertise</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-blue-600">1000+</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Products Delivered</h3>
              <p className="text-gray-600">Successfully providing medical equipment/consumables to healthcare facilities</p>
            </div>
            
            <div className="text-center">
              <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-red-600">500+</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Happy Customers</h3>
              <p className="text-gray-600">Building long-term relationships with healthcare professionals</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-lg text-gray-600">The principles that guide everything we do</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Quality</h3>
              <p className="text-gray-600 text-sm">We never compromise on the quality of our products</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Care</h3>
              <p className="text-gray-600 text-sm">We care about the health and safety of patients</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Service</h3>
              <p className="text-gray-600 text-sm">Exceptional customer service is our priority</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Excellence</h3>
              <p className="text-gray-600 text-sm">We strive for excellence in everything we do</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Work With Us?</h2>
          <p className="text-xl mb-8">Discover our products and experience the Hafak Surgicals difference</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-200"
            >
              Browse Products
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors duration-200"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
