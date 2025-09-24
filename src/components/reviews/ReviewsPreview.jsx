import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { getReviews } from '../../services/reviewService';

const { FiStar, FiArrowRight, FiUser } = FiIcons;

/**
 * ReviewsPreview Component
 * Shows a preview of customer reviews on the homepage
 * Displays the most recent positive reviews
 */
const ReviewsPreview = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load preview reviews (latest positive reviews)
  useEffect(() => {
    const loadPreviewReviews = async () => {
      try {
        const allReviews = await getReviews();
        // Filter for high-rated reviews and take the first 3
        const positiveReviews = allReviews
          .filter(review => review.rating >= 4)
          .slice(0, 3);
        setReviews(positiveReviews);
      } catch (error) {
        console.error('Error loading preview reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPreviewReviews();
  }, []);

  if (loading) {
    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.5rem'
      }}>
        {[...Array(3)].map((_, index) => (
          <div 
            key={index} 
            style={{
              backgroundColor: 'white',
              borderRadius: '0.75rem',
              padding: '1.5rem'
            }}
            className="animate-pulse"
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '1rem'
            }}>
              <div style={{
                width: '2.5rem',
                height: '2.5rem',
                backgroundColor: 'var(--gray-200)',
                borderRadius: '9999px'
              }}></div>
              <div style={{ flex: '1' }}>
                <div style={{
                  height: '1rem',
                  backgroundColor: 'var(--gray-200)',
                  borderRadius: '0.25rem',
                  width: '75%',
                  marginBottom: '0.5rem'
                }}></div>
                <div style={{
                  height: '0.75rem',
                  backgroundColor: 'var(--gray-200)',
                  borderRadius: '0.25rem',
                  width: '50%'
                }}></div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{
                height: '0.75rem',
                backgroundColor: 'var(--gray-200)',
                borderRadius: '0.25rem'
              }}></div>
              <div style={{
                height: '0.75rem',
                backgroundColor: 'var(--gray-200)',
                borderRadius: '0.25rem',
                width: '83.333333%'
              }}></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <motion.div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
      >
        {reviews.map((review, index) => (
          <motion.div
            key={review.id}
            style={{
              backgroundColor: 'white',
              borderRadius: '0.75rem',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
              padding: '1.5rem',
              transition: 'box-shadow 0.3s ease'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1)';
            }}
          >
            {/* Review Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '1rem'
            }}>
              <div style={{
                width: '2.5rem',
                height: '2.5rem',
                backgroundColor: 'var(--primary-100)',
                borderRadius: '9999px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <SafeIcon 
                  icon={FiUser} 
                  style={{ 
                    color: 'var(--primary-600)', 
                    fontSize: '1.125rem' 
                  }} 
                />
              </div>
              <div style={{ flex: '1' }}>
                <h4 style={{
                  fontWeight: '600',
                  color: 'var(--gray-900)'
                }}>
                  {review.customerName}
                </h4>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}>
                  {[...Array(5)].map((_, i) => (
                    <SafeIcon
                      key={i}
                      icon={FiStar}
                      style={{
                        fontSize: '0.75rem',
                        color: i < review.rating
                          ? 'var(--yellow-400)'
                          : 'var(--gray-300)'
                      }}
                      className={i < review.rating ? 'fill-current' : ''}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Review Content */}
            <p style={{
              color: 'var(--gray-700)',
              fontSize: '0.875rem',
              lineHeight: '1.625',
              marginBottom: '1rem',
              display: '-webkit-box',
              WebkitLineClamp: 4,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}>
              {review.comment}
            </p>

            {/* Product Name (if available) */}
            {review.productName && (
              <div style={{
                fontSize: '0.75rem',
                color: 'var(--primary-600)',
                fontWeight: '500'
              }}>
                About: {review.productName}
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* View All Reviews Button */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Link
          to="/reviews"
          className="btn-secondary"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            textDecoration: 'none'
          }}
        >
          <span>View All Reviews</span>
          <SafeIcon icon={FiArrowRight} style={{ fontSize: '0.875rem' }} />
        </Link>
      </motion.div>
    </div>
  );
};

export default ReviewsPreview;