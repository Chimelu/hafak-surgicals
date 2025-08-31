import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Phone, Mail, MapPin, Clock, Search, User } from 'lucide-react'
import { navigation } from '../data/navigation'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-2xl border-b border-gray-200/50' 
        : 'bg-white'
    }`}>
      {/* Top bar with contact info */}
      <div className="bg-gradient-to-r from-red-600 via-red-700 to-blue-800 text-white py-3 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-6">
                             <div className="flex items-center space-x-2 hover:text-blue-200 transition-colors duration-200">
                 <Phone className="h-4 w-4" />
                 <span className="hidden sm:inline">+234 814 584 0203</span>
                 <span className="sm:hidden">+234 814 584 0203</span>
               </div>
              <div className="flex items-center space-x-2 hover:text-blue-200 transition-colors duration-200">
                <Mail className="h-4 w-4" />
                <span className="hidden lg:inline">hafakgroups@yahoo.com</span>
                <span className="lg:hidden">hafakgroups@yahoo.com</span>
              </div>
              <div className="flex items-center space-x-2 hover:text-blue-200 transition-colors duration-200">
                <MapPin className="h-4 w-4" />
                <span className="hidden xl:inline">H4 Suite C, Transpharm Plaza, Jabi, Abuja</span>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>8:00 AM - 6:00 PM</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
                                {/* Logo */}
           <Link 
             to="/" 
             className="flex items-center space-x-3 group"
             onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
           >
             <div className="relative">
               <div className="w-14 h-14 rounded-2xl overflow-hidden group-hover:scale-110 transition-transform duration-300 shadow-lg">
                 <img 
                   src="/hafaksurgicals.png" 
                   alt="Hafak Surgicals Logo" 
                   className="w-full h-full object-cover"
                 />
               </div>
               <div className="absolute -inset-1 bg-gradient-to-br from-red-600 to-blue-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
             </div>
             <div>
               <h1 className="text-2xl font-black text-gray-900 group-hover:text-red-600 transition-colors duration-300">
                 Hafak Surgicals
               </h1>
               <p className="text-sm text-gray-600 font-medium">Medical Equipment Specialists</p>
             </div>
           </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
                            {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`relative px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 group ${
                      isActive(item.href)
                        ? 'text-white bg-gradient-to-r from-red-600 to-blue-600 shadow-lg'
                        : 'text-gray-700 hover:text-red-600 hover:bg-red-50'
                    }`}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  >
                    {isActive(item.href) && (
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full"></div>
                    )}
                    <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-red-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                      isActive(item.href) ? 'opacity-100' : ''
                    }`}></div>
                    <span className="relative z-10">{item.name}</span>
                  </Link>
                ))}
          </div>

          {/* Right side actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200">
              <Search className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200">
              <User className="h-5 w-5" />
            </button>
                         <Link
               to="/products"
               className="px-4 py-2 bg-gradient-to-r from-red-600 to-blue-600 text-white rounded-xl font-semibold hover:from-red-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
               onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
             >
               Get Quote
             </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden">
          <div className="px-4 pt-4 pb-6 space-y-2 bg-white border-t border-gray-200 shadow-lg">
                         {navigation.map((item) => (
               <Link
                 key={item.name}
                 to={item.href}
                 className={`block px-4 py-3 rounded-xl text-base font-semibold transition-all duration-200 ${
                   isActive(item.href)
                     ? 'text-white bg-gradient-to-r from-red-600 to-blue-600 shadow-md'
                     : 'text-gray-700 hover:text-red-600 hover:bg-red-50'
                 }`}
                 onClick={() => {
                   setIsOpen(false)
                   window.scrollTo({ top: 0, behavior: 'smooth' })
                 }}
               >
                 {item.name}
               </Link>
             ))}
            <div className="pt-4 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center px-4 py-3 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200">
                  <Search className="h-5 w-5 mr-2" />
                  Search
                </button>
                <button className="flex items-center justify-center px-4 py-3 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200">
                  <User className="h-5 w-5 mr-2" />
                  Account
                </button>
              </div>
                             <Link
                 to="/products"
                 className="mt-3 w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-red-600 to-blue-600 text-white rounded-xl font-semibold hover:from-red-700 hover:to-blue-700 transition-all duration-300 shadow-lg"
                 onClick={() => {
                   setIsOpen(false)
                   window.scrollTo({ top: 0, behavior: 'smooth' })
                 }}
               >
                 Get Quote
               </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
