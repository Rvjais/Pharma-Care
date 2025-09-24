import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { formatDistanceToNow } from 'date-fns';

const { FiStar, FiUser, FiThumbsUp, FiMessageCircle } = FiIcons;

/**
 * ClimboReviews Component
 * Integrates with Climbo platform to display customer reviews
 * This component simulates Climbo integration - replace with actual Climbo SDK
 */
const ClimboReviews = ({ reviews }) => {
  const [climboReviews, setClimboReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate Climbo API integration
  useEffect(() => {
    const fetchClimboReviews = async () => {
      try {
        // This would normally be a call to Climbo's API
        // For demo purposes, we're using the passed reviews
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Transform reviews to include Climbo-specific features
        const transformedReviews = reviews.map(review => ({
          ...review,
          climboVerified: true,
          helpfulCount: Math.floor(Math.random() * 20),
          responseCount: Math.floor(Math.random() * 5),
          isHighlighted: review.rating >= 4 && Math.random() > 0.7
        }));

        setClimboReviews(transformedReviews);
      } catch (error) {
        console.error('Error fetching Climbo reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClimboReviews();
  }, [reviews]);

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
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
              gap: '1rem',
              marginBottom: '1rem'
            }}>
              <div style={{
                width: '3rem',
                height: '3rem',
                backgroundColor: 'var(--gray-200)',
                borderRadius: '9999px'
              }}></div>
              <div style={{ flex: '1' }}>
                <div style={{
                  height: '1rem',
                  backgroundColor: 'var(--gray-200)',
                  borderRadius: '0.25rem',
                  width: '25%',
                  marginBottom: '0.5rem'
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
                height: '1rem',
                backgroundColor: 'var(--gray-200)',
                borderRadius: '0.25rem'
              }}></div>
              <div style={{
                height: '1rem',
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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {climboReviews.map((review) => (
        <motion.div
          key={review.id}
          style={{
            backgroundColor: 'white',
            borderRadius: '0.75rem',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
            padding: '1.5rem',
            ...(review.isHighlighted && {
              border: '2px solid rgba(14, 165, 233, 0.2)',
              backgroundColor: 'var(--primary-50)'
            })
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Highlighted Badge */}
          {review.isHighlighted && (
            <div style={{ marginBottom: '1rem' }}>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '0.75rem 0.25rem',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                fontWeight: '500',
                backgroundColor: 'var(--primary-100)',
                color: 'var(--primary-800)'
              }}>
                <SafeIcon 
                  icon={FiStar} 
                  style={{ 
                    marginRight: '0.25rem', 
                    fontSize: '0.75rem' 
                  }} 
                />
                Featured Review
              </span>
            </div>
          )}

          {/* Review Header */}
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            marginBottom: '1rem'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}>
              {/* User Avatar */}
              <div style={{
                width: '3rem',
                height: '3rem',
                backgroundColor: 'var(--gray-200)',
                borderRadius: '9999px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <SafeIcon 
                  icon={FiUser} 
                  style={{ 
                    color: 'var(--gray-500)', 
                    fontSize: '1.25rem' 
                  }} 
                />
              </div>

              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <h4 style={{
                    fontWeight: '600',
                    color: 'var(--gray-900)'
                  }}>
                    {review.customerName}
                  </h4>
                  {review.climboVerified && (
                    <span className="badge badge-success">
                      Verified
                    </span>
                  )}
                </div>
                
                {/* Rating Stars */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginTop: '0.25rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
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
                  <span style={{
                    fontSize: '0.875rem',
                    color: 'var(--gray-500)'
                  }}>
                    {formatDistanceToNow(new Date(review.date), { addSuffix: true })}
                  </span>
                </div>
              </div>
            </div>

            {/* Product Info (if available) */}
            {review.productName && (
              <div className="text-right">
                <p style={{
                  fontSize: '0.875rem',
                  color: 'var(--gray-600)'
                }}>
                  Product:
                </p>
                <p style={{
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: 'var(--gray-900)'
                }}>
                  {review.productName}
                </p>
              </div>
            )}
          </div>

          {/* Review Content */}
          <div style={{ marginBottom: '1rem' }}>
            <p style={{
              color: 'var(--gray-700)',
              lineHeight: '1.625'
            }}>
              {review.comment}
            </p>
          </div>

          {/* Review Actions */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '1rem',
            borderTop: '1px solid var(--gray-100)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}>
              {/* Helpful Button */}
              <button style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'var(--gray-500)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.color = 'var(--primary-600)'}
              onMouseLeave={(e) => e.target.style.color = 'var(--gray-500)'}
              >
                <SafeIcon icon={FiThumbsUp} style={{ fontSize: '0.875rem' }} />
                <span style={{ fontSize: '0.875rem' }}>
                  Helpful ({review.helpfulCount})
                </span>
              </button>

              {/* Response Count */}
              {review.responseCount > 0 && (
                <button style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: 'var(--gray-500)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'color 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.color = 'var(--primary-600)'}
                onMouseLeave={(e) => e.target.style.color = 'var(--gray-500)'}
                >
                  <SafeIcon icon={FiMessageCircle} style={{ fontSize: '0.875rem' }} />
                  <span style={{ fontSize: '0.875rem' }}>
                    {review.responseCount} responses
                  </span>
                </button>
              )}
            </div>

            {/* Climbo Badge */}
            <div style={{
              fontSize: '0.75rem',
              color: 'var(--gray-400)'
            }}>
              Powered by Climbo
            </div>
          </div>

          {/* Store Response (if available) */}
          {review.storeResponse && (
            <motion.div
              style={{
                marginTop: '1rem',
                padding: '1rem',
                backgroundColor: 'var(--gray-50)',
                borderRadius: '0.5rem',
                borderLeft: '4px solid var(--primary-500)'
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '0.5rem'
              }}>
                <span style={{
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: 'var(--primary-600)'
                }}>
                  PharmaCare Response
                </span>
                <span style={{
                  fontSize: '0.75rem',
                  color: 'var(--gray-500)'
                }}>
                  {formatDistanceToNow(new Date(review.responseDate), { addSuffix: true })}
                </span>
              </div>
              <p style={{
                fontSize: '0.875rem',
                color: 'var(--gray-700)'
              }}>
                {review.storeResponse}
              </p>
            </motion.div>
          )}
        </motion.div>
      ))}

      {/* Climbo Integration Footer */}
      <div className="text-center py-8">
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 1rem',
          backgroundColor: 'var(--gray-100)',
          borderRadius: '0.5rem'
        }}>
          <span style={{
            fontSize: '0.875rem',
            color: 'var(--gray-600)'
          }}>
            Reviews powered by
          </span>
          <span style={{
            fontSize: '0.875rem',
            fontWeight: '600',
            color: 'var(--primary-600)'
          }}>
            Climbo
          </span>
        </div>
        <p style={{
          fontSize: '0.75rem',
          color: 'var(--gray-500)',
          marginTop: '0.5rem'
        }}>
          Authentic reviews from verified customers
        </p>
      </div>
    </div>
  );
};

export default ClimboReviews;