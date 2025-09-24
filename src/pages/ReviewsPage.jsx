import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ClimboReviews from '../components/reviews/ClimboReviews';
import ReviewStats from '../components/reviews/ReviewStats';
import { getReviews } from '../services/reviewService';

/**
 * ReviewsPage Component
 * Displays all customer reviews with Climbo integration and statistics
 */
const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, 5, 4, 3, 2, 1

  // Load reviews on component mount
  useEffect(() => {
    const loadReviews = async () => {
      try {
        const reviewsData = await getReviews();
        setReviews(reviewsData);
      } catch (error) {
        console.error('Error loading reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    loadReviews();
  }, []);

  // Filter reviews based on rating
  const filteredReviews = filter === 'all' 
    ? reviews 
    : reviews.filter(review => review.rating === parseInt(filter));

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div 
          style={{
            width: '3rem',
            height: '3rem',
            borderBottom: '2px solid var(--primary-500)'
          }}
          className="animate-spin rounded-full"
        ></div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--gray-50)',
      paddingTop: '2rem',
      paddingBottom: '2rem'
    }}>
      <div className="container">
        
        {/* Page Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 style={{
            fontSize: '1.875rem',
            fontWeight: '700',
            color: 'var(--gray-900)',
            marginBottom: '1rem'
          }}>
            Customer Reviews
          </h1>
          <p style={{
            color: 'var(--gray-600)',
            maxWidth: '42rem',
            margin: '0 auto'
          }}>
            Read what our customers have to say about their experience with PharmaCare. 
            Your feedback helps us maintain the highest standards of service.
          </p>
        </motion.div>

        {/* Review Statistics */}
        <motion.div
          style={{ marginBottom: '2rem' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <ReviewStats reviews={reviews} />
        </motion.div>

        {/* Filter Options */}
        <motion.div
          style={{
            marginBottom: '2rem',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem',
            justifyContent: 'center'
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {['all', '5', '4', '3', '2', '1'].map((rating) => (
            <button
              key={rating}
              onClick={() => setFilter(rating)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                fontWeight: '500',
                transition: 'all 0.3s ease',
                border: filter === rating ? 'none' : '1px solid var(--gray-200)',
                backgroundColor: filter === rating ? 'var(--primary-500)' : 'white',
                color: filter === rating ? 'white' : 'var(--gray-700)',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                if (filter !== rating) {
                  e.target.style.backgroundColor = 'var(--gray-50)';
                }
              }}
              onMouseLeave={(e) => {
                if (filter !== rating) {
                  e.target.style.backgroundColor = 'white';
                }
              }}
            >
              {rating === 'all' ? 'All Reviews' : `${rating} Stars`}
            </button>
          ))}
        </motion.div>

        {/* Climbo Reviews Integration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <ClimboReviews reviews={filteredReviews} />
        </motion.div>
      </div>
    </div>
  );
};

export default ReviewsPage;