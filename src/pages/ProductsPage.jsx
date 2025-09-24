import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '../components/products/ProductCard';
import ProductFilter from '../components/products/ProductFilter';
import { getProducts } from '../services/productService';

/**
 * ProductsPage Component
 * Displays all pharmacy products with filtering and search functionality
 */
const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: 'all',
    priceRange: 'all',
    searchTerm: ''
  });

  // Load products on component mount
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productsData = await getProducts();
        setProducts(productsData);
        setFilteredProducts(productsData);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Apply filters whenever filters change
  useEffect(() => {
    let filtered = [...products];

    // Filter by category
    if (filters.category !== 'all') {
      filtered = filtered.filter(product => product.category === filters.category);
    }

    // Filter by price range
    if (filters.priceRange !== 'all') {
      const [min, max] = filters.priceRange.split('-').map(Number);
      filtered = filtered.filter(product => {
        const price = product.price;
        return max ? (price >= min && price <= max) : price >= min;
      });
    }

    // Filter by search term
    if (filters.searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [filters, products]);

  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div 
          style={{
            width: '3rem',
            height: '3rem',
            borderBottom: '2px solid var(--primary-500)'
          }}
          className="animate-spin rounded-full"
        ></div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--gray-50)',
      paddingTop: '2rem',
      paddingBottom: '2rem'
    }}>
      <div className="container">
        
        {/* Page Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 style={{
            fontSize: '1.875rem',
            fontWeight: '700',
            color: 'var(--gray-900)',
            marginBottom: '1rem'
          }}>
            Our Products
          </h1>
          <p style={{
            color: 'var(--gray-600)',
            maxWidth: '42rem',
            margin: '0 auto'
          }}>
            Browse our comprehensive selection of quality pharmaceutical products 
            and healthcare essentials.
          </p>
        </motion.div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem'
        }}>
          
          {/* Filter Sidebar */}
          <div style={{ width: '100%' }}>
            <ProductFilter
              filters={filters}
              onFilterChange={handleFilterChange}
              totalProducts={filteredProducts.length}
            />
          </div>

          {/* Products Grid */}
          <div style={{ width: '100%' }}>
            {filteredProducts.length === 0 ? (
              <motion.div
                style={{
                  textAlign: 'center',
                  paddingTop: '3rem',
                  paddingBottom: '3rem'
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <p style={{
                  color: 'var(--gray-500)',
                  fontSize: '1.125rem'
                }}>
                  No products found matching your criteria.
                </p>
              </motion.div>
            ) : (
              <motion.div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '1.5rem'
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ staggerChildren: 0.1 }}
              >
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;