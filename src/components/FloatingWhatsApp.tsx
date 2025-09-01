import React from 'react'
import { MessageCircle } from 'lucide-react'
import { officeInfo } from '../data/mockData'

const FloatingWhatsApp: React.FC = () => {
  const handleWhatsApp = () => {
    const currentUrl = window.location.href
    const message = `Hi! I'd like to get more information about your medical equipment/consumables and services.\n\nWebsite: ${currentUrl}`
    const whatsappUrl = `https://wa.me/${officeInfo.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={handleWhatsApp}
        className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 group animate-pulse hover:animate-none relative"
        title="Chat with us on WhatsApp"
        aria-label="Chat with us on WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
        
        {/* Notification Badge */}
        <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-bounce">
          <span className="text-[10px]">💬</span>
        </div>
        
        {/* Tooltip */}
        <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
          Chat with us on WhatsApp
          <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-gray-900 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
        </div>
      </button>
    </div>
  )
}

export default FloatingWhatsApp
