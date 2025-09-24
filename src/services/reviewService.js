/**
 * Review Service
 * Handles all review-related API calls and Climbo integration
 * In a real application, these would connect to Climbo's API
 */

// Mock review data - replace with actual Climbo API calls
const mockReviews = [
  {
    id: 'r1',
    productId: '1',
    productName: 'Acetaminophen Extra Strength',
    customerName: 'Sarah Johnson',
    rating: 5,
    comment: 'Excellent pain relief medication. Works quickly and effectively for headaches and muscle pain. The extra strength formula is perfect for my needs.',
    date: '2024-01-15T10:30:00Z',
    verified: true,
    storeResponse: 'Thank you for your positive feedback, Sarah! We\'re glad our product provided the relief you needed.',
    responseDate: '2024-01-16T09:15:00Z'
  },
  {
    id: 'r2',
    productId: '2',
    productName: 'Vitamin D3 2000 IU',
    customerName: 'Michael Chen',
    rating: 5,
    comment: 'Great vitamin D supplement. I\'ve been taking it for 3 months and my energy levels have improved significantly. Easy to swallow softgels.',
    date: '2024-01-10T14:22:00Z',
    verified: true
  },
  {
    id: 'r3',
    productId: '3',
    productName: 'Moisturizing Face Cream SPF 30',
    customerName: 'Emily Rodriguez',
    rating: 4,
    comment: 'Good moisturizer with sun protection. Doesn\'t leave a greasy feeling and works well under makeup. Would recommend for daily use.',
    date: '2024-01-08T16:45:00Z',
    verified: true
  },
  {
    id: 'r4',
    productId: '1',
    productName: 'Acetaminophen Extra Strength',
    customerName: 'David Williams',
    rating: 4,
    comment: 'Reliable pain reliever that I keep in my medicine cabinet. Works well for fever reduction too. Good value for the price.',
    date: '2024-01-05T11:30:00Z',
    verified: true
  },
  {
    id: 'r5',
    productId: '5',
    productName: 'Omega-3 Fish Oil',
    customerName: 'Lisa Thompson',
    rating: 5,
    comment: 'High-quality fish oil supplement. No fishy aftertaste and I feel the difference in my joint health. Will definitely reorder.',
    date: '2024-01-03T09:15:00Z',
    verified: true,
    storeResponse: 'We\'re thrilled to hear about your positive experience with our Omega-3 supplement, Lisa!',
    responseDate: '2024-01-04T10:30:00Z'
  },
  {
    id: 'r6',
    productId: '6',
    productName: 'Baby Gentle Shampoo',
    customerName: 'Jennifer Brown',
    rating: 5,
    comment: 'Perfect for my baby\'s sensitive skin. Truly tear-free and leaves hair soft and clean. Been using for months with no issues.',
    date: '2024-01-01T13:20:00Z',
    verified: true
  },
  {
    id: 'r7',
    productId: '2',
    productName: 'Vitamin D3 2000 IU',
    customerName: 'Robert Davis',
    rating: 4,
    comment: 'Good quality vitamin D. Doctor recommended this brand and I\'ve been satisfied with the results. Easy to incorporate into daily routine.',
    date: '2023-12-28T15:45:00Z',
    verified: true
  },
  {
    id: 'r8',
    productId: '4',
    productName: 'Ibuprofen 200mg',
    customerName: 'Amanda Wilson',
    rating: 5,
    comment: 'Fast-acting and effective for my arthritis pain. Much better than other brands I\'ve tried. Great value for money.',
    date: '2023-12-25T12:10:00Z',
    verified: true
  }
];

/**
 * Get all reviews
 * @returns {Promise<Array>} Array of all reviews
 */
export const getReviews = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockReviews.sort((a, b) => new Date(b.date) - new Date(a.date));
};

/**
 * Get reviews for a specific product
 * @param {string} productId - Product ID
 * @returns {Promise<Array>} Array of reviews for the product
 */
export const getProductReviews = async (productId) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 400));
  
  return mockReviews
    .filter(review => review.productId === productId)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
};

/**
 * Get reviews by rating
 * @param {number} rating - Rating filter (1-5)
 * @returns {Promise<Array>} Array of reviews with specified rating
 */
export const getReviewsByRating = async (rating) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 400));
  
  return mockReviews
    .filter(review => review.rating === rating)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
};

/**
 * Submit a new review (Climbo integration)
 * @param {Object} reviewData - Review data object
 * @returns {Promise<Object>} Created review object
 */
export const submitReview = async (reviewData) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const newReview = {
    id: `r${Date.now()}`,
    ...reviewData,
    date: new Date().toISOString(),
    verified: false // Would be verified through Climbo's verification process
  };
  
  // In a real app, this would send to Climbo's API
  mockReviews.unshift(newReview);
  
  return newReview;
};

/**
 * Get review statistics
 * @returns {Promise<Object>} Review statistics object
 */
export const getReviewStats = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const totalReviews = mockReviews.length;
  const averageRating = totalReviews > 0 
    ? mockReviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews 
    : 0;
  
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: mockReviews.filter(review => review.rating === rating).length,
    percentage: totalReviews > 0 
      ? (mockReviews.filter(review => review.rating === rating).length / totalReviews) * 100 
      : 0
  }));
  
  return {
    totalReviews,
    averageRating,
    ratingDistribution
  };
};

/**
 * Mark review as helpful (Climbo feature)
 * @param {string} reviewId - Review ID
 * @returns {Promise<boolean>} Success status
 */
export const markReviewHelpful = async (reviewId) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // In a real app, this would update the review's helpful count via Climbo's API
  console.log(`Marked review ${reviewId} as helpful`);
  
  return true;
};

/**
 * Report review (Climbo moderation feature)
 * @param {string} reviewId - Review ID
 * @param {string} reason - Report reason
 * @returns {Promise<boolean>} Success status
 */
export const reportReview = async (reviewId, reason) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 400));
  
  // In a real app, this would send a report to Climbo's moderation system
  console.log(`Reported review ${reviewId} for: ${reason}`);
  
  return true;
};