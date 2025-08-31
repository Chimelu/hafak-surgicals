export interface Product {
  _id: string
  name: string
  description: string
  category: string
  image: string
  price?: number
  availability: 'In Stock' | 'Out of Stock'
  specifications: string[]
}

export interface Category {
  _id: string
  name: string
  description: string
  icon: string
}

export interface OfficeInfo {
  address: string
  phone: string
  whatsapp: string
  email: string
  openingHours: string
  closingHours: string
}

export interface CompanyInfo {
  name: string
  tagline: string
  description: string
  mission: string
  vision: string
  experience: string
}

// Admin interfaces
export interface AdminUser {
  _id: string
  username: string
  email: string
  role: 'admin' | 'super_admin'
}

export interface Equipment {
  _id: string
  name: string
  description: string
  categoryId: string
  categoryName?: string
  image: string
  price?: number
  availability: 'In Stock' | 'Out of Stock' | 'Low Stock'
  specifications: string[]
  features: string[]
  brand?: string
  model?: string
  condition: 'New' | 'Used' | 'Refurbished'
  warranty?: string
  stockQuantity: number
  minStockLevel: number
  isPublic?: boolean
  isFeatured?: boolean
  rating?: number
  reviewCount?: number
  sortOrder?: number
  isActive?: boolean
  tags?: string[]
  slug?: string
  createdAt: string
  updatedAt: string
}

export interface EquipmentCategory {
  _id: string
  name: string
  description: string
  icon: string
  equipmentCount?: number
  sortOrder?: number
  isActive?: boolean
  createdAt: string
  updatedAt: string
}

export interface LoginCredentials {
  username: string
  password: string
}
