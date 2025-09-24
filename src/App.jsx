import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';

// Import all components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ReviewsPage from './pages/ReviewsPage';

// Import global styles
import './App.css';

/**
 * Main App Component
 * This is the root component that sets up routing and layout structure
 * Uses HashRouter for compatibility with static hosting
 */
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Header component - contains navigation */}
        <Header />
        
        {/* Main content area with animation */}
        <motion.main 
          className="flex-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Route definitions */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
          </Routes>
        </motion.main>

        {/* Footer component */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;