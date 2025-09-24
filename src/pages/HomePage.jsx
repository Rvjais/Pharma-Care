import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import FeaturedProducts from '../components/products/FeaturedProducts';
import ReviewsPreview from '../components/reviews/ReviewsPreview';
import '../pages/HomePage.css';
const { FiShield, FiClock, FiTruck, FiHeart, FiArrowRight } = FiIcons;

/**
 * HomePage Component
 * Landing page showcasing pharmacy services, featured products, and customer reviews
 */
const HomePage = () => {
  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Service features data
  const features = [
    {
      icon: FiShield,
      title: 'Licensed & Certified',
      description: 'All medications are sourced from certified suppliers and verified for quality.'
    },
    {
      icon: FiClock,
      title: '24/7 Support',
      description: 'Round-the-clock customer support for all your pharmaceutical needs.'
    },
    {
      icon: FiTruck,
      title: 'Fast Delivery',
      description: 'Quick and secure delivery right to your doorstep within 24 hours.'
    },
    {
      icon: FiHeart,
      title: 'Health Care',
      description: 'Comprehensive healthcare solutions with professional consultation.'
    }
  ];

  return (
    <div className="min-h-screen">
      
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <motion.div
            className="text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 
              style={{
                fontSize: 'clamp(2.25rem, 5vw, 3.75rem)',
                fontWeight: '700',
                color: 'var(--gray-900)',
                marginBottom: '1.5rem'
              }}
              variants={itemVariants}
            >
              Your Trusted{' '}
              <span style={{ color: 'var(--primary-600)' }}>Pharmacy</span>{' '}
              Partner
            </motion.h1>
            
            <motion.p 
              style={{
                fontSize: '1.25rem',
                color: 'var(--gray-600)',
                marginBottom: '2rem',
                maxWidth: '48rem',
                margin: '0 auto 2rem auto'
              }}
              variants={itemVariants}
            >
              Providing quality medications, healthcare products, and professional 
              pharmaceutical services with a commitment to your health and well-being.
            </motion.p>

            <motion.div 
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                justifyContent: 'center',
                alignItems: 'center'
              }}
              variants={itemVariants}
            >
              <Link
                to="/products"
                className="btn-primary"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  textDecoration: 'none'
                }}
              >
                <span>Shop Products</span>
                <SafeIcon icon={FiArrowRight} style={{ fontSize: '0.875rem' }} />
              </Link>
              
              <Link
                to="/reviews"
                className="btn-secondary"
                style={{ textDecoration: 'none' }}
              >
                View Reviews
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 style={{
              fontSize: '1.875rem',
              fontWeight: '700',
              color: 'var(--gray-900)',
              marginBottom: '1rem'
            }}>
              Why Choose PharmaCare?
            </h2>
            <p style={{
              color: 'var(--gray-600)',
              maxWidth: '42rem',
              margin: '0 auto'
            }}>
              We are committed to providing exceptional pharmaceutical services 
              with the highest standards of quality and care.
            </p>
          </motion.div>

          <motion.div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '2rem'
            }}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                style={{
                  textAlign: 'center',
                  padding: '1.5rem',
                  borderRadius: '0.75rem',
                  backgroundColor: 'var(--gray-50)',
                  transition: 'all 0.3s ease'
                }}
                className="feature-card"
                variants={itemVariants}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = 'white';
                  e.target.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'var(--gray-50)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  width: '4rem',
                  height: '4rem',
                  backgroundColor: 'var(--primary-100)',
                  borderRadius: '9999px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem auto'
                }}>
                  <SafeIcon 
                    icon={feature.icon} 
                    style={{ 
                      fontSize: '1.5rem', 
                      color: 'var(--primary-600)' 
                    }} 
                  />
                </div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: 'var(--gray-900)',
                  marginBottom: '0.5rem'
                }}>
                  {feature.title}
                </h3>
                <p style={{ color: 'var(--gray-600)' }}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 style={{
              fontSize: '1.875rem',
              fontWeight: '700',
              color: 'var(--gray-900)',
              marginBottom: '1rem'
            }}>
              Featured Products
            </h2>
            <p style={{
              color: 'var(--gray-600)',
              maxWidth: '42rem',
              margin: '0 auto'
            }}>
              Discover our most popular and trusted pharmaceutical products.
            </p>
          </motion.div>

          {/* Featured Products Component */}
          <FeaturedProducts />
        </div>
      </section>

      {/* Customer Reviews Preview Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 style={{
              fontSize: '1.875rem',
              fontWeight: '700',
              color: 'var(--gray-900)',
              marginBottom: '1rem'
            }}>
              What Our Customers Say
            </h2>
            <p style={{
              color: 'var(--gray-600)',
              maxWidth: '42rem',
              margin: '0 auto'
            }}>
              Read genuine reviews from our satisfied customers about their experience with PharmaCare.
            </p>
          </motion.div>

          {/* Reviews Preview Component */}
          <ReviewsPreview />
        </div>
      </section>
    </div>
  );
};

export default HomePage;