import React from 'react'
import { officeInfo } from '../data/mockData'
import { Phone, Mail, MapPin, Clock, MessageCircle, Navigation, Car, Bus } from 'lucide-react'
import { useScrollToTop } from '../hooks/useScrollToTop'

const OfficeInfo: React.FC = () => {
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Office Information</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Visit our office or get in touch with us
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Office Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Office Details */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Office Details</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <MapPin className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">Address</h3>
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

                <div className="flex items-center">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                    <Phone className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Phone</h3>
                    <p className="text-gray-700">{officeInfo.phone}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                    <MessageCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">WhatsApp</h3>
                    <p className="text-gray-700">{officeInfo.whatsapp}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                    <Mail className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
                    <p className="text-gray-700">{officeInfo.email}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Business Hours</h2>
              <div className="flex items-start">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="font-medium text-gray-900">Monday - Friday</span>
                    <span className="text-gray-700">{officeInfo.openingHours} - {officeInfo.closingHours}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="font-medium text-gray-900">Saturday</span>
                    <span className="text-gray-700">9:00 AM - 2:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="font-medium text-gray-900">Sunday</span>
                    <span className="text-gray-700 text-red-600">Closed</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> We are closed on major holidays. For urgent inquiries outside business hours, 
                  please contact us via WhatsApp or email.
                </p>
              </div>
            </div>

            {/* Location & Directions */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Location & Directions</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <Navigation className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Getting Here</h3>
                    <p className="text-gray-700 mb-4">
                      Our office is conveniently located in the heart of the medical district, 
                      easily accessible by various modes of transportation.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start">
                    <div className="bg-red-100 w-10 h-10 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <Car className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">By Car</h4>
                      <p className="text-sm text-gray-600">
                        Free parking available on-site. Enter from Jabi Garage area.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <Bus className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">By Public Transport</h4>
                      <p className="text-sm text-gray-600">
                        Multiple bus routes and taxis available from Jabi area. Easy access from major roads.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-100 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Landmarks</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Located opposite Jabi Garage</li>
                    <li>• Next to Thisday Newspaper office</li>
                    <li>• In Transpharm Plaza, H4 Suite B&C</li>
                  </ul>
                </div>

                {/* Enhanced Location Information */}
                <div className="bg-blue-50 rounded-lg p-6">
                  <h4 className="font-semibold text-blue-900 mb-4">📍 Interactive Navigation</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4 border border-blue-200">
                      <div className="flex items-center mb-2">
                        <MapPin className="h-5 w-5 text-blue-600 mr-2" />
                        <span className="font-medium text-blue-900">View on Google Maps</span>
                      </div>
                      <p className="text-sm text-blue-700 mb-3">See our exact location on Google Maps</p>
                      <button
                        onClick={openGoogleMaps}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm"
                      >
                        Open Maps
                      </button>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-green-200">
                      <div className="flex items-center mb-2">
                        <Navigation className="h-5 w-5 text-green-600 mr-2" />
                        <span className="font-medium text-green-900">Get Directions</span>
                      </div>
                      <p className="text-sm text-green-700 mb-3">Get turn-by-turn directions to our office</p>
                      <button
                        onClick={getDirections}
                        className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm"
                      >
                        Get Directions
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={() => {
                    const currentUrl = window.location.href
                    const message = `Hi! I'd like to schedule a visit to your office.\n\nOffice Info Page: ${currentUrl}`
                    const whatsappUrl = `https://wa.me/${officeInfo.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`
                    window.open(whatsappUrl, '_blank')
                  }}
                  className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <MessageCircle className="h-5 w-5" />
                  Schedule Visit
                </button>
                
                <button
                  onClick={getDirections}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <Navigation className="h-5 w-5" />
                  Get Directions
                </button>

                <button
                  onClick={openGoogleMaps}
                  className="w-full bg-red-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-red-700 transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <MapPin className="h-5 w-5" />
                  View on Map
                </button>
              </div>
            </div>

            {/* Contact Hours */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Hours</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Phone Support:</span>
                  <span className="font-medium">8:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">WhatsApp:</span>
                  <span className="font-medium">24/7</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Email Response:</span>
                  <span className="font-medium">Within 24 hours</span>
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-red-900 mb-4">Emergency Contact</h3>
              <p className="text-sm text-red-800 mb-3">
                For urgent medical equipment/consumables needs outside business hours:
              </p>
              <div className="space-y-2">
                <div className="flex items-center">
                  <MessageCircle className="h-4 w-4 text-red-600 mr-2" />
                  <span className="text-sm text-red-800">WhatsApp: {officeInfo.whatsapp}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 text-red-600 mr-2" />
                  <span className="text-sm text-red-800">Email: {officeInfo.email}</span>
                </div>
              </div>
            </div>

            {/* Office Features */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Office Features</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Free Parking
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Wheelchair Accessible
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Product Showroom
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Meeting Rooms
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  WiFi Available
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OfficeInfo
