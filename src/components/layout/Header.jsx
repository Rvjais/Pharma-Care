import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import './Header.css';

const { FiMenu, FiX, FiHome, FiPackage, FiStar, FiPhone } = FiIcons;

/**
 * Header Component
 * Contains navigation, logo, and mobile menu functionality
 */
const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Navigation items configuration
  const navItems = [
    { path: '/', label: 'Home', icon: FiHome },
    { path: '/products', label: 'Products', icon: FiPackage },
    { path: '/reviews', label: 'Reviews', icon: FiStar },
  ];

  // Check if current path is active
  const isActivePath = (path) => location.pathname === path;

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-nav">
          
          {/* Logo section */}
          <Link to="/" className="logo">
            <div className="logo-icon">
              <SafeIcon icon={FiPackage} style={{ color: 'white', fontSize: '1.25rem' }} />
            </div>
            <span className="logo-text">PharmaCare</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="nav-desktop">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link ${isActivePath(item.path) ? 'active' : ''}`}
              >
                <SafeIcon icon={item.icon} style={{ fontSize: '0.875rem' }} />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Contact button (desktop) */}
          <button className="contact-btn">
            <SafeIcon icon={FiPhone} style={{ fontSize: '0.875rem' }} />
            <span>Contact</span>
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="mobile-menu-btn"
          >
            <SafeIcon 
              icon={isMobileMenuOpen ? FiX : FiMenu} 
              style={{ fontSize: '1.25rem' }} 
            />
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mobile-menu"
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`mobile-nav-link ${isActivePath(item.path) ? 'active' : ''}`}
                >
                  <SafeIcon icon={item.icon} style={{ fontSize: '0.875rem' }} />
                  <span>{item.label}</span>
                </Link>
              ))}
              
              {/* Mobile contact button */}
              <button className="mobile-nav-link mobile-contact-btn">
                <SafeIcon icon={FiPhone} style={{ fontSize: '0.875rem' }} />
                <span>Contact</span>
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;