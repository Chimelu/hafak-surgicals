import type { Product, Category, OfficeInfo } from '../types'

export const categories: Category[] = [
  {
    id: '1',
    name: 'Diagnostic Tools',
    description: 'Advanced diagnostic equipment for accurate medical assessments',
    icon: '🔍'
  },
  {
    id: '2',
    name: 'Surgical Equipment',
    description: 'Professional surgical instruments and tools',
    icon: '⚡'
  },
  {
    id: '3',
    name: 'Consumables',
    description: 'Essential medical supplies and disposables',
    icon: '📦'
  },
  {
    id: '4',
    name: 'Monitoring Devices',
    description: 'Patient monitoring and vital signs equipment',
    icon: '📊'
  }
]

export const products: Product[] = [
  {
    id: '1',
    name: 'Digital Stethoscope',
    description: 'High-quality digital stethoscope with noise reduction technology for clear auscultation.',
    category: 'Diagnostic Tools',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop',
    price: 299,
    availability: 'In Stock',
    specifications: ['Digital amplification', 'Noise reduction', 'Bluetooth connectivity', 'Rechargeable battery']
  },
  {
    id: '2',
    name: 'Surgical Scissors Set',
    description: 'Professional grade surgical scissors set with precision cutting edges.',
    category: 'Surgical Equipment',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop',
    price: 189,
    availability: 'In Stock',
    specifications: ['Stainless steel', 'Sterilizable', 'Multiple sizes', 'Precision cutting']
  },
  {
    id: '3',
    name: 'Medical Gloves',
    description: 'Latex-free medical gloves for safe medical procedures.',
    category: 'Consumables',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop',
    price: 25,
    availability: 'In Stock',
    specifications: ['Latex-free', 'Powder-free', 'Multiple sizes', 'Sterile']
  },
  {
    id: '4',
    name: 'Blood Pressure Monitor',
    description: 'Automatic digital blood pressure monitor with memory function.',
    category: 'Monitoring Devices',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop',
    price: 89,
    availability: 'Out of Stock',
    specifications: ['Digital display', 'Memory function', 'Irregular heartbeat detection', 'Cuff included']
  },
  {
    id: '5',
    name: 'Ultrasound Machine',
    description: 'Portable ultrasound machine for diagnostic imaging.',
    category: 'Diagnostic Tools',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop',
    availability: 'In Stock',
    specifications: ['Portable design', 'High-resolution imaging', 'Multiple probes', 'Battery powered']
  },
  {
    id: '6',
    name: 'Surgical Forceps',
    description: 'Precision surgical forceps for delicate procedures.',
    category: 'Surgical Equipment',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop',
    price: 75,
    availability: 'In Stock',
    specifications: ['Stainless steel', 'Fine tips', 'Sterilizable', 'Multiple sizes']
  }
]

export const officeInfo: OfficeInfo = {
  address: 'H4 Suite C, Transpharm Plaza, Opp. Jabi Garage, By Thisday Newspaper, Jabi, Abuja',
  phone: '+2348033760003',
  whatsapp: '+2348033760003',
  email: 'hafakgroups@yahoo.com',
  openingHours: '8:00 AM',
  closingHours: '6:00 PM'
}

export const companyInfo = {
  name: 'Hafak Surgicals',
  tagline: 'Your Trusted Partner in Medical Equipment',
  description: 'Hafak Surgicals is a leading provider of high-quality medical equipment and supplies in Nigeria. With years of experience in the healthcare industry, we are committed to delivering innovative solutions that enhance patient care and support healthcare professionals across the country.',
  mission: 'To provide Nigerian healthcare professionals with reliable, innovative, and high-quality medical equipment that improves patient outcomes and enhances the delivery of healthcare services.',
  vision: 'To be the most trusted name in medical equipment in Nigeria, recognized for our commitment to quality, innovation, and customer satisfaction.',
  experience: 'With over 15 years of experience in the medical equipment industry, Hafak Surgicals has built a reputation for excellence, reliability, and customer service throughout Nigeria.'
}
