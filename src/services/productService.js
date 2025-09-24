/**
 * Product Service
 * Handles all product-related API calls and data management
 * In a real application, these would connect to your backend API
 */

// Mock product data - replace with actual API calls
const mockProducts = [
  {
    id: '1',
    name: 'Paracetamol',
    category: 'otc',
    manufacturer: 'Panadol',
    price: 12.99,
    originalPrice: 15.99,
    discount: 19,
    rating: 4.5,
    reviewCount: 127,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop',
    description: 'Extra strength acetaminophen for effective pain relief and fever reduction. Each caplet contains 500mg of acetaminophen.',
    ingredients: ['Acetaminophen 500mg', 'Microcrystalline cellulose', 'Starch', 'Stearic acid'],
    warnings: [
      'Do not exceed recommended dosage',
      'Consult doctor if symptoms persist',
      'Keep out of reach of children'
    ],
    inStock: true,
    featured: true
  },
  {
    id: '2',
    name: 'Vitamin D3 2000 IU',
    category: 'vitamins',
    manufacturer: 'Nature Made',
    price: 18.99,
    rating: 4.7,
    reviewCount: 89,
    image: 'https://images.unsplash.com/photo-1550572017-edd951aa8ca0?w=400&h=400&fit=crop',
    description: 'High-potency Vitamin D3 supplement to support bone health and immune function. 90 softgels per bottle.',
    ingredients: ['Vitamin D3 (Cholecalciferol) 2000 IU', 'Soybean oil', 'Gelatin', 'Glycerin'],
    warnings: [
      'Consult healthcare provider before use',
      'Do not exceed recommended dose',
      'Store in cool, dry place'
    ],
    inStock: true,
    featured: true
  },
  {
    id: '3',
    name: 'Moisturizing Face Cream SPF 30',
    category: 'skincare',
    manufacturer: 'CeraVe',
    price: 24.99,
    originalPrice: 29.99,
    discount: 17,
    rating: 4.3,
    reviewCount: 156,
    image: 'https://images.unsplash.com/photo-1556229162-6b2e6c4e8b71?w=400&h=400&fit=crop',
    description: 'Daily moisturizing cream with broad-spectrum SPF 30 protection. Developed with dermatologists.',
    ingredients: ['Zinc oxide', 'Octinoxate', 'Ceramides', 'Hyaluronic acid', 'Niacinamide'],
    warnings: [
      'For external use only',
      'Avoid contact with eyes',
      'Discontinue if irritation occurs'
    ],
    inStock: true,
    featured: true
  },
  {
    id: '4',
    name: 'Ibuprofen 200mg',
    category: 'otc',
    manufacturer: 'Advil',
    price: 9.99,
    rating: 4.4,
    reviewCount: 203,
    image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&h=400&fit=crop',
    description: 'Fast-acting ibuprofen for pain relief and inflammation reduction. 100 tablets per bottle.',
    ingredients: ['Ibuprofen 200mg', 'Corn starch', 'Croscarmellose sodium', 'Titanium dioxide'],
    warnings: [
      'Take with food or milk',
      'Do not exceed 6 tablets in 24 hours',
      'Consult doctor for extended use'
    ],
    inStock: true,
    featured: false
  },
  {
    id: '5',
    name: 'Omega-3 Fish Oil',
    category: 'vitamins',
    manufacturer: 'Nordic Naturals',
    price: 32.99,
    rating: 4.6,
    reviewCount: 94,
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop',
    description: 'Premium omega-3 fish oil supplement with EPA and DHA for heart and brain health.',
    ingredients: ['Fish oil concentrate', 'EPA 650mg', 'DHA 450mg', 'Vitamin E'],
    warnings: [
      'Consult physician if pregnant',
      'Keep refrigerated after opening',
      'May cause fishy aftertaste'
    ],
    inStock: true,
    featured: true
  },
  {
    id: '6',
    name: 'Baby Gentle Shampoo',
    category: 'baby-care',
    manufacturer: "Johnson's Baby",
    price: 7.99,
    rating: 4.8,
    reviewCount: 312,
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&h=400&fit=crop',
    description: 'Gentle, tear-free baby shampoo that cleanses delicate hair and scalp. Hypoallergenic formula.',
    ingredients: ['Water', 'Cocamidopropyl betaine', 'PEG-80 sorbitan laurate', 'Sodium trideceth sulfate'],
    warnings: [
      'For external use only',
      'Avoid contact with eyes',
      'Keep out of reach of children'
    ],
    inStock: true,
    featured: true
  }
];

/**
 * Get all products
 * @returns {Promise<Array>} Array of all products
 */
export const getProducts = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockProducts;
};

/**
 * Get featured products
 * @returns {Promise<Array>} Array of featured products
 */
export const getFeaturedProducts = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockProducts.filter(product => product.featured);
};

/**
 * Get product by ID
 * @param {string} id - Product ID
 * @returns {Promise<Object|null>} Product object or null if not found
 */
export const getProductById = async (id) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockProducts.find(product => product.id === id) || null;
};

/**
 * Search products by term
 * @param {string} searchTerm - Search term
 * @returns {Promise<Array>} Array of matching products
 */
export const searchProducts = async (searchTerm) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 400));
  
  const term = searchTerm.toLowerCase();
  return mockProducts.filter(product =>
    product.name.toLowerCase().includes(term) ||
    product.description.toLowerCase().includes(term) ||
    product.category.toLowerCase().includes(term)
  );
};

/**
 * Get products by category
 * @param {string} category - Product category
 * @returns {Promise<Array>} Array of products in the category
 */
export const getProductsByCategory = async (category) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 400));
  
  if (category === 'all') {
    return mockProducts;
  }
  
  return mockProducts.filter(product => product.category === category);
};