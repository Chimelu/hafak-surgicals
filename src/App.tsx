// React import removed as it's not needed in modern React
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './styles/animations.css'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/admin/ProtectedRoute'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './components/Home'
import Products from './components/Products'
import ProductDetail from './components/ProductDetail'
import About from './components/About'
import Contact from './components/Contact'
import OfficeInfo from './components/OfficeInfo'
import AdminLogin from './components/admin/AdminLogin'
import AdminDashboard from './components/admin/AdminDashboard'
import EquipmentManagement from './components/admin/EquipmentManagement'
import CategoryManagement from './components/admin/CategoryManagement'
import Analytics from './components/admin/Analytics'
import Settings from './components/admin/Settings'
import FloatingWhatsApp from './components/FloatingWhatsApp'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Admin Routes - No Navbar/Footer */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/equipment"
              element={
                <ProtectedRoute>
                  <EquipmentManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/equipment/add"
              element={
                <ProtectedRoute>
                  <EquipmentManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/equipment/edit/:id"
              element={
                <ProtectedRoute>
                  <EquipmentManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/categories"
              element={
                <ProtectedRoute>
                  <CategoryManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/analytics"
              element={
                <ProtectedRoute>
                  <Analytics />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />
            
            {/* Public routes - With Navbar/Footer */}
            <Route path="/" element={
              <>
                <Navbar />
                <Home />
                <Footer />
                <FloatingWhatsApp />
              </>
            } />
            <Route path="/products" element={
              <>
                <Navbar />
                <Products />
                <Footer />
                <FloatingWhatsApp />
              </>
            } />
            <Route path="/products/:id" element={
              <>
                <Navbar />
                <ProductDetail />
                <Footer />
                <FloatingWhatsApp />
              </>
            } />
            <Route path="/about" element={
              <>
                <Navbar />
                <About />
                <Footer />
                <FloatingWhatsApp />
              </>
            } />
            <Route path="/contact" element={
              <>
                <Navbar />
                <Contact />
                <Footer />
                <FloatingWhatsApp />
              </>
            } />
            <Route path="/office-info" element={
              <>
                <Navbar />
                <OfficeInfo />
                <Footer />
                <FloatingWhatsApp />
              </>
            } />
          </Routes>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: '#10B981',
                  secondary: '#fff',
                },
              },
              error: {
                duration: 5000,
                iconTheme: {
                  primary: '#EF4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
