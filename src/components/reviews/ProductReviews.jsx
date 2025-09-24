import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { getProductReviews } from '../../services/reviewService';
import { formatDistanceToNow } from 'date-fns';

const { FiStar, FiUser } = FiIcons;

/**
 * ProductReviews Component
 * Displays reviews specific to a product on the product detail page
 */
const ProductReviews = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load product-specific reviews
  useEffect(() => {
    const loadProductReviews = async () => {
      try {
        const productReviews = await getProductReviews(productId);
        setReviews(productReviews);
      } catch (error) {
        console.error('Error loading product reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProductReviews();
  }, [productId]);

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {[...Array(3)].map((_, index) => (
          <div 
            key={index} 
            style={{
              border: '1px solid var(--gray-200)',
              borderRadius: '0.5rem',
              padding: '1rem'
            }}
            className="animate-pulse"
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '0.75rem'
            }}>
              <div style={{
                width: '2rem',
                height: '2rem',
                backgroundColor: 'var(--gray-200)',
                borderRadius: '9999px'
              }}></div>
              <div style={{ flex: '1' }}>
                <div style={{
                  height: '1rem',
                  backgroundColor: 'var(--gray-200)',
                  borderRadius: '0.25rem',
                  width: '25%',
                  marginBottom: '0.25rem'
                }}></div>
                <div style={{
                  height: '0.75rem',
                  backgroundColor: 'var(--gray-200)',
                  borderRadius: '0.25rem',
                  width: '16.666667%'
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
                width: '75%'
              }}></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-8">
        <p style={{
          color: 'var(--gray-500)'
        }}>
          No reviews yet for this product.
        </p>
        <p style={{
          fontSize: '0.875rem',
          color: 'var(--gray-400)',
          marginTop: '0.5rem'
        }}>
          Be the first to leave a review!
        </p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {reviews.map((review) => (
        <motion.div
          key={review.id}
          style={{
            border: '1px solid var(--gray-200)',
            borderRadius: '0.5rem',
            padding: '1.5rem',
            transition: 'box-shadow 0.3s ease'
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = 'none';
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
              backgroundColor: 'var(--gray-200)',
              borderRadius: '9999px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <SafeIcon 
                icon={FiUser} 
                style={{ color: 'var(--gray-500)' }} 
              />
            </div>
            <div style={{ flex: '1' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <h4 style={{
                  fontWeight: '500',
                  color: 'var(--gray-900)'
                }}>
                  {review.customerName}
                </h4>
                <span style={{
                  fontSize: '0.875rem',
                  color: 'var(--gray-500)'
                }}>
                  {formatDistanceToNow(new Date(review.date), { addSuffix: true })}
                </span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                marginTop: '0.25rem'
              }}>
                {[...Array(5)].map((_, i) => (
                  <SafeIcon
                    key={i}
                    icon={FiStar}
                    style={{
                      fontSize: '0.875rem',
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
            lineHeight: '1.625'
          }}>
            {review.comment}
          </p>

          {/* Verified Purchase Badge */}
          <div style={{
            marginTop: '1rem',
            paddingTop: '1rem',
            borderTop: '1px solid var(--gray-100)'
          }}>
            <span className="badge badge-success">
              Verified Purchase
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ProductReviews;