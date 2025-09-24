import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import { getFeaturedProducts } from '../../services/productService';
import './FeaturedProducts.css';

/**
 * FeaturedProducts Component
 * Displays a selection of featured pharmacy products on the homepage
 */
const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load featured products on component mount
  useEffect(() => {
    const loadFeaturedProducts = async () => {
      try {
        const featuredProducts = await getFeaturedProducts();
        setProducts(featuredProducts);
      } catch (error) {
        console.error('Error loading featured products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedProducts();
  }, []);

  if (loading) {
    return (
      <div className="loading-grid">
        {[...Array(6)].map((_, index) => (
          <div 
            key={index} 
            className="loading-card animate-pulse"
          >
            <div className="loading-image"></div>
            <div className="loading-text-long"></div>
            <div className="loading-text-short"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="featured-products-container">
      <motion.div
        className="products-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
      >
        {products.map((product) => (
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

      {/* View All Products Button */}
      <motion.div
        className="view-all-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Link
          to="/products"
          className="view-all-btn"
        >
          View All Products
        </Link>
      </motion.div>
    </div>
  );
};

export default FeaturedProducts;