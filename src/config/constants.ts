export const WHATSAPP_NUMBER = '+2348033760003' // Your actual WhatsApp number

export const COMPANY_NAME = 'Hafak Surgicals'
export const COMPANY_WEBSITE = 'https://hafaksurgicals.com'

export const WHATSAPP_MESSAGE_TEMPLATE = (product: any) => {
  const productUrl = `${window.location.origin}/products/${product._id}`
  
  // Shorter message to test WhatsApp compatibility
  return `Hello! I'm interested in getting a quote for this product:

*${product.name || 'Product Name'}*
*Brand:* ${product.brand || 'N/A'}

*Product Link:* ${productUrl}

Please provide me with more details and pricing information. Thank you!`
}
