import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import './ProductCard.css';

const { FiStar, FiShoppingCart, FiHeart } = FiIcons;

/**
 * ProductCard Component
 * Displays individual product information in a card format
 * Used in product grids and featured products sections
 */
const ProductCard = ({ product }) => {
  return (
    <motion.div
      className="product-card"
      whileHover={{ y: -5 }}
    >
      {/* Product Image */}
      <div className="product-image">
        <img
          src={product.image}
          alt={product.name}
        />
        
        {/* Discount Badge */}
        {product.discount && (
          <div className="discount-badge">
            -{product.discount}%
          </div>
        )}

        {/* Wishlist Button */}
        <button className="wishlist-btn">
          <SafeIcon 
            icon={FiHeart} 
            style={{ 
              color: 'var(--gray-600)', 
              fontSize: '0.875rem' 
            }} 
          />
        </button>
      </div>

      {/* Product Info */}
      <div className="product-info">
        {/* Category */}
        <span className="badge badge-primary product-category">
          {product.category}
        </span>

        {/* Product Name */}
        <Link to={`/product/${product.id}`} className="product-name-link">
          <h3 className="product-name">
            {product.name}
          </h3>
        </Link>

        {/* Manufacturer */}
        <p className="product-manufacturer">
          {product.manufacturer}
        </p>

        {/* Rating */}
        <div className="product-rating">
          <div className="rating-stars">
            {[...Array(5)].map((_, i) => (
              <SafeIcon
                key={i}
                icon={FiStar}
                style={{
                  fontSize: '0.75rem',
                  color: i < Math.floor(product.rating)
                    ? 'var(--yellow-400)'
                    : 'var(--gray-300)'
                }}
                className={i < Math.floor(product.rating) ? 'star-filled' : 'star-empty'}
              />
            ))}
          </div>
          <span className="rating-count">
            ({product.reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="product-price-section">
          <div className="price-container">
            <span className="current-price">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="original-price">
                ${product.originalPrice}
              </span>
            )}
          </div>
        </div>

        {/* Add to Cart Button */}
        <button className="add-to-cart-btn">
          <SafeIcon icon={FiShoppingCart} style={{ fontSize: '0.875rem' }} />
          <span>Add to Cart</span>
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;