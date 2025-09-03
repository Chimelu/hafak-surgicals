import React from 'react'
import { Phone, Mail, MapPin, Clock, MessageCircle, Navigation } from 'lucide-react'
import { officeInfo } from '../data/mockData'
import { useScrollToTop } from '../hooks/useScrollToTop'

const Contact: React.FC = () => {
  // Scroll to top when component mounts
  useScrollToTop([])
  
  // Office address for Google Maps
  const officeAddress = 'H4 Suite B&C, Transpharm Plaza, Opp. Jabi Garage, By Thisday Newspaper, Jabi, Abuja'
  
  // Google Maps functions
  const openGoogleMaps = () => {
    const encodedAddress = encodeURIComponent(officeAddress)
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`
    window.open(googleMapsUrl, '_blank')
  }

  const getDirections = () => {
    const encodedAddress = encodeURIComponent(officeAddress)
    const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`
    window.open(directionsUrl, '_blank')
  }

  const handleWhatsApp = () => {
    const currentUrl = window.location.href
    const message = `Hi! I'd like to get more information about your medical equipment/consumables and services.\n\nContact Page: ${currentUrl}`
    const whatsappUrl = `https://wa.me/${officeInfo.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Get in touch with our team for expert advice and support
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Contact Information */}
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Quick Contact */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Contact</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                  <Phone className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <a 
                    href={`tel:${officeInfo.phone}`}
                    className="font-semibold text-gray-900 hover:text-red-600 transition-colors duration-200 cursor-pointer"
                  >
                    {officeInfo.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                  <Mail className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <a 
                    href={`mailto:${officeInfo.email}`}
                    className="font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-200 cursor-pointer"
                  >
                    {officeInfo.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center">
                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                  <MessageCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">WhatsApp</p>
                  <p className="font-semibold text-gray-900">{officeInfo.whatsapp}</p>
                </div>
              </div>
            </div>

            <button
              onClick={handleWhatsApp}
              className="w-full mt-6 bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <MessageCircle className="h-5 w-5" />
              Chat on WhatsApp
            </button>
          </div>

          {/* Office Address */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Office Address</h2>
            <div className="flex items-start">
              <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <MapPin className="h-6 w-6 text-red-600" />
              </div>
              <div className="flex-1">
                <p className="text-gray-700 leading-relaxed mb-4">{officeInfo.address}</p>
                <div className="flex gap-3">
                  <button
                    onClick={openGoogleMaps}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm"
                  >
                    <MapPin className="h-4 w-4" />
                    View on Map
                  </button>
                  <button
                    onClick={getDirections}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm"
                  >
                    <Navigation className="h-4 w-4" />
                    Get Directions
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Business Hours</h2>
            <div className="flex items-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-gray-700">
                  <span className="font-semibold">Monday - Friday:</span><br />
                  {officeInfo.openingHours} - {officeInfo.closingHours}
                </p>
                <p className="text-gray-700 mt-2">
                  <span className="font-semibold">Saturday:</span><br />
                  9:00 AM - 2:00 PM
                </p>
                <p className="text-gray-700 mt-2">
                  <span className="font-semibold">Sunday:</span><br />
                  Closed
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Google Maps Section */}
        <div className="mt-16">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Find Us</h2>
            <div className="space-y-6">
              {/* Map Preview */}
              <div className="bg-gray-100 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Office Location</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={openGoogleMaps}
                      className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm"
                    >
                      <MapPin className="h-4 w-4" />
                      View on Map
                    </button>
                    <button
                      onClick={getDirections}
                      className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm"
                    >
                      <Navigation className="h-4 w-4" />
                      Get Directions
                    </button>
                  </div>
                </div>
                
                {/* Address Display */}
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-red-600 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900 mb-1">Hafak Surgicals</p>
                      <p className="text-gray-700 text-sm leading-relaxed">{officeAddress}</p>
                      <p className="text-gray-500 text-xs mt-2">📍 Jabi, Abuja, Nigeria</p>
                    </div>
                  </div>
                </div>
                
                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="bg-white rounded-lg p-4 border border-gray-200 text-center">
                    <MapPin className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-900">View Location</p>
                    <p className="text-xs text-gray-500">See on Google Maps</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-gray-200 text-center">
                    <Navigation className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-900">Get Directions</p>
                    <p className="text-xs text-gray-500">Navigate to us</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-gray-200 text-center">
                    <Phone className="h-8 w-8 text-red-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-900">Call Us</p>
                    <p className="text-xs text-gray-500">{officeInfo.phone}</p>
                  </div>
                </div>
              </div>
              
              {/* Location Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">📍 Landmark</h4>
                  <p className="text-blue-800 text-sm">Opposite Jabi Garage, near Thisday Newspaper office</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-900 mb-2">🚗 Parking</h4>
                  <p className="text-green-800 text-sm">Available at Transpharm Plaza</p>
                </div>
              </div>
              
              {/* Additional Info */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">ℹ️ Additional Information</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Located in Transpharm Plaza, Suite C</li>
                  <li>• Easy access from major roads in Jabi area</li>
                  <li>• Close to Jabi Lake Mall and surrounding businesses</li>
                  <li>• Well-known landmark for navigation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
