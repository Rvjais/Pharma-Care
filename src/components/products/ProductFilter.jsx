import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import './ProductFilter.css';

const { FiSearch, FiFilter } = FiIcons;

/**
 * ProductFilter Component
 * Provides filtering options for products including search, category, and price range
 */
const ProductFilter = ({ filters, onFilterChange, totalProducts }) => {
  // Available categories for filtering
  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'prescription', label: 'Prescription' },
    { value: 'otc', label: 'Over-the-Counter' },
    { value: 'vitamins', label: 'Vitamins & Supplements' },
    { value: 'skincare', label: 'Skincare' },
    { value: 'personal-care', label: 'Personal Care' },
    { value: 'baby-care', label: 'Baby Care' }
  ];

  // Available price ranges
  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: '0-25', label: 'Under $25' },
    { value: '25-50', label: '$25 - $50' },
    { value: '50-100', label: '$50 - $100' },
    { value: '100', label: 'Over $100' }
  ];

  return (
    <motion.div
      className="filter-sidebar"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <div className="filter-header">
        <SafeIcon 
          icon={FiFilter} 
          style={{ color: 'var(--primary-500)' }} 
        />
        <h3 className="filter-title">Filters</h3>
      </div>

      {/* Search Input */}
      <div className="filter-group">
        <label className="filter-label">
          Search Products
        </label>
        <div className="search-input-wrapper">
          <SafeIcon 
            icon={FiSearch} 
            className="search-icon"
          />
          <input
            type="text"
            placeholder="Search by name or description..."
            value={filters.searchTerm}
            onChange={(e) => onFilterChange({ searchTerm: e.target.value })}
            className="search-input"
          />
        </div>
      </div>

      {/* Category Filter */}
      <div className="filter-group">
        <label className="filter-label">
          Category
        </label>
        <select
          value={filters.category}
          onChange={(e) => onFilterChange({ category: e.target.value })}
          className="filter-select"
        >
          {categories.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range Filter */}
      <div className="filter-group">
        <label className="filter-label">
          Price Range
        </label>
        <select
          value={filters.priceRange}
          onChange={(e) => onFilterChange({ priceRange: e.target.value })}
          className="filter-select"
        >
          {priceRanges.map((range) => (
            <option key={range.value} value={range.value}>
              {range.label}
            </option>
          ))}
        </select>
      </div>

      {/* Results Count */}
      <div className="filter-results">
        <p className="results-text">
          Showing <span className="results-count">{totalProducts}</span> products
        </p>
      </div>

      {/* Clear Filters Button */}
      <button
        onClick={() => onFilterChange({ 
          category: 'all', 
          priceRange: 'all', 
          searchTerm: '' 
        })}
        className="clear-filters-btn"
      >
        Clear All Filters
      </button>
    </motion.div>
  );
};

export default ProductFilter;