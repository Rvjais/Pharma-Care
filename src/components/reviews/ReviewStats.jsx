import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiStar, FiUsers, FiTrendingUp } = FiIcons;

/**
 * ReviewStats Component
 * Displays review statistics and rating distribution
 */
const ReviewStats = ({ reviews }) => {
  // Calculate review statistics
  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews 
    : 0;

  // Calculate rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => {
    const count = reviews.filter(review => review.rating === rating).length;
    const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
    return { rating, count, percentage };
  });

  // Calculate additional stats
  const recentReviews = reviews.filter(review => {
    const reviewDate = new Date(review.date);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return reviewDate >= thirtyDaysAgo;
  }).length;

  const positiveReviews = reviews.filter(review => review.rating >= 4).length;
  const positivePercentage = totalReviews > 0 ? (positiveReviews / totalReviews) * 100 : 0;

  return (
    <motion.div
      style={{
        backgroundColor: 'white',
        borderRadius: '0.75rem',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        padding: '2rem'
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '2rem'
      }}>
        
        {/* Overall Rating */}
        <div className="text-center">
          <div style={{
            fontSize: '2.25rem',
            fontWeight: '700',
            color: 'var(--gray-900)',
            marginBottom: '0.5rem'
          }}>
            {averageRating.toFixed(1)}
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.25rem',
            marginBottom: '0.5rem'
          }}>
            {[...Array(5)].map((_, i) => (
              <SafeIcon
                key={i}
                icon={FiStar}
                style={{
                  fontSize: '1.125rem',
                  color: i < Math.floor(averageRating)
                    ? 'var(--yellow-400)'
                    : 'var(--gray-300)'
                }}
                className={i < Math.floor(averageRating) ? 'fill-current' : ''}
              />
            ))}
          </div>
          <p style={{ color: 'var(--gray-600)' }}>
            Based on {totalReviews} reviews
          </p>
        </div>

        {/* Rating Distribution */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <h3 style={{
            fontWeight: '600',
            color: 'var(--gray-900)',
            marginBottom: '1rem'
          }}>
            Rating Distribution
          </h3>
          {ratingDistribution.map((item) => (
            <div 
              key={item.rating}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}
            >
              <span style={{
                fontSize: '0.875rem',
                fontWeight: '500',
                color: 'var(--gray-700)',
                width: '2rem'
              }}>
                {item.rating}★
              </span>
              <div style={{
                flex: '1',
                backgroundColor: 'var(--gray-200)',
                borderRadius: '9999px',
                height: '0.5rem'
              }}>
                <div
                  style={{
                    backgroundColor: 'var(--primary-500)',
                    height: '0.5rem',
                    borderRadius: '9999px',
                    transition: 'all 0.5s ease',
                    width: `${item.percentage}%`
                  }}
                ></div>
              </div>
              <span style={{
                fontSize: '0.875rem',
                color: 'var(--gray-600)',
                width: '3rem',
                textAlign: 'right'
              }}>
                {item.count}
              </span>
            </div>
          ))}
        </div>

        {/* Additional Stats */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{
            textAlign: 'center',
            padding: '1rem',
            backgroundColor: '#dcfce7',
            borderRadius: '0.5rem'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              marginBottom: '0.5rem'
            }}>
              <SafeIcon 
                icon={FiTrendingUp} 
                style={{ color: 'var(--green-600)' }} 
              />
              <span style={{
                fontWeight: '600',
                color: 'var(--green-800)'
              }}>
                {positivePercentage.toFixed(0)}%
              </span>
            </div>
            <p style={{
              fontSize: '0.875rem',
              color: 'var(--green-700)'
            }}>
              Positive Reviews
            </p>
          </div>

          <div style={{
            textAlign: 'center',
            padding: '1rem',
            backgroundColor: 'var(--blue-50)',
            borderRadius: '0.5rem'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              marginBottom: '0.5rem'
            }}>
              <SafeIcon 
                icon={FiUsers} 
                style={{ color: 'var(--blue-600)' }} 
              />
              <span style={{
                fontWeight: '600',
                color: 'var(--blue-800)'
              }}>
                {recentReviews}
              </span>
            </div>
            <p style={{
              fontSize: '0.875rem',
              color: 'var(--blue-700)'
            }}>
              Reviews This Month
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ReviewStats;