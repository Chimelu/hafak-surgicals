import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Clock, Facebook, Twitter, Instagram, Linkedin, ArrowUp } from 'lucide-react'
import { officeInfo, companyInfo } from '../data/mockData'
import { navigation } from '../data/navigation'

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-blue-600/10"></div>
      <div className="absolute inset-0 opacity-30">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
      
      <div className="relative">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Company Info */}
            <div className="lg:col-span-2">
                             <div className="flex items-center space-x-3 mb-6">
                 <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                   <div className="w-12 h-12 rounded-xl overflow-hidden hover:scale-110 transition-transform duration-300 cursor-pointer">
                     <img 
                       src="/hafaksurgicals.png" 
                       alt="Hafak Surgicals Logo" 
                       className="w-full h-full object-cover"
                     />
                   </div>
                 </Link>
                 <div>
                   <h3 className="text-2xl font-black text-white">{companyInfo.name}</h3>
                   <p className="text-blue-200 font-medium">{companyInfo.tagline}</p>
                 </div>
               </div>
              <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
                {companyInfo.description}
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-gradient-to-r from-red-600 to-blue-600 rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gradient-to-r from-red-600 to-blue-600 rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gradient-to-r from-red-600 to-blue-600 rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gradient-to-r from-red-600 to-blue-600 rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300">
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>

                         {/* Quick Links */}
             <div>
               <h4 className="text-lg font-bold text-white mb-6">Quick Links</h4>
                               <ul className="space-y-3">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Link 
                        to={item.href} 
                        className="text-gray-300 hover:text-red-400 transition-colors duration-200 flex items-center group"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                      >
                        <span className="w-2 h-2 bg-gradient-to-r from-red-500 to-blue-500 rounded-full mr-3 group-hover:scale-150 transition-transform duration-200"></span>
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
             </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-bold text-white mb-6">Contact Info</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <MapPin className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-300 text-sm leading-relaxed">{officeInfo.address}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="h-4 w-4 text-white" />
                  </div>
                  <a href={`tel:${officeInfo.phone}`} className="text-gray-300 hover:text-red-400 transition-colors duration-200">
                    {officeInfo.phone}
                  </a>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="h-4 w-4 text-white" />
                  </div>
                  <a href={`mailto:${officeInfo.email}`} className="text-gray-300 hover:text-red-400 transition-colors duration-200">
                    {officeInfo.email}
                  </a>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-300 text-sm">
                      {officeInfo.openingHours} - {officeInfo.closingHours}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-gray-700/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-4">Stay Updated</h3>
              <p className="text-gray-300 mb-6 max-w-md mx-auto">
                Subscribe to our newsletter for the latest medical equipment updates and industry insights.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                <button className="px-6 py-3 bg-gradient-to-r from-red-600 to-blue-600 text-white rounded-xl font-semibold hover:from-red-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-gray-400 text-sm">
                © {currentYear} {companyInfo.name}. All rights reserved.
              </div>
              <div className="flex items-center space-x-6 text-sm text-gray-400">
                <a href="#" className="hover:text-red-400 transition-colors duration-200">Privacy Policy</a>
                <a href="#" className="hover:text-red-400 transition-colors duration-200">Terms of Service</a>
                <a href="#" className="hover:text-red-400 transition-colors duration-200">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 w-12 h-12 bg-gradient-to-r from-red-600 to-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 z-40"
      >
        <ArrowUp className="h-6 w-6 mx-auto" />
      </button>
    </footer>
  )
}

export default Footer
