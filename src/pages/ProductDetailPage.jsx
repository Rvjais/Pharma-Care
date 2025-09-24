import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { getProductById } from '../services/productService';
import ProductReviews from '../components/reviews/ProductReviews';

const { FiArrowLeft, FiShoppingCart, FiHeart, FiInfo, FiShield, FiStar, FiCheck } = FiIcons;

/**
 * ProductDetailPage Component
 * Displays detailed information about a specific product including reviews
 */
const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState('description');

  // Load product data on component mount
  useEffect(() => {
    const loadProduct = async () => {
      try {
        const productData = await getProductById(id);
        setProduct(productData);
      } catch (error) {
        console.error('Error loading product:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

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

  if (!product) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div className="text-center">
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: 'var(--gray-900)',
            marginBottom: '1rem'
          }}>
            Product Not Found
          </h2>
          <Link 
            to="/products" 
            style={{
              color: 'var(--primary-600)',
              textDecoration: 'none'
            }}
            onMouseEnter={(e) => e.target.style.color = 'var(--primary-700)'}
            onMouseLeave={(e) => e.target.style.color = 'var(--primary-600)'}
          >
            Return to Products
          </Link>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'description', label: 'Description', icon: FiInfo },
    { id: 'reviews', label: 'Reviews', icon: FiStar },
    { id: 'safety', label: 'Safety Info', icon: FiShield }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--gray-50)',
      paddingTop: '2rem',
      paddingBottom: '2rem'
    }}>
      <div className="container">
        
        {/* Back Button */}
        <Link
          to="/products"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: 'var(--primary-600)',
            textDecoration: 'none',
            marginBottom: '1.5rem',
            transition: 'color 0.3s ease'
          }}
          onMouseEnter={(e) => e.target.style.color = 'var(--primary-700)'}
          onMouseLeave={(e) => e.target.style.color = 'var(--primary-600)'}
        >
          <SafeIcon icon={FiArrowLeft} />
          <span>Back to Products</span>
        </Link>

        <div style={{
          backgroundColor: 'white',
          borderRadius: '1rem',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '2rem',
            padding: '2rem'
          }}>
            
            {/* Product Image */}
            <motion.div
              style={{
                aspectRatio: '1 / 1',
                backgroundColor: 'var(--gray-100)',
                borderRadius: '0.75rem',
                overflow: 'hidden'
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </motion.div>

            {/* Product Info */}
            <motion.div
              style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div>
                <span className="badge badge-primary" style={{ marginBottom: '0.75rem' }}>
                  {product.category}
                </span>
                <h1 style={{
                  fontSize: '1.875rem',
                  fontWeight: '700',
                  color: 'var(--gray-900)',
                  marginBottom: '0.5rem'
                }}>
                  {product.name}
                </h1>
                <p style={{ color: 'var(--gray-600)' }}>
                  {product.manufacturer}
                </p>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}>
                <span style={{
                  fontSize: '1.875rem',
                  fontWeight: '700',
                  color: 'var(--primary-600)'
                }}>
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span style={{
                    fontSize: '1.125rem',
                    color: 'var(--gray-500)',
                    textDecoration: 'line-through'
                  }}>
                    ${product.originalPrice}
                  </span>
                )}
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {[...Array(5)].map((_, i) => (
                    <SafeIcon
                      key={i}
                      icon={FiStar}
                      style={{
                        fontSize: '0.875rem',
                        color: i < Math.floor(product.rating)
                          ? 'var(--yellow-400)'
                          : 'var(--gray-300)'
                      }}
                      className={i < Math.floor(product.rating) ? 'fill-current' : ''}
                    />
                  ))}
                </div>
                <span style={{ color: 'var(--gray-600)' }}>
                  ({product.reviewCount} reviews)
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <SafeIcon 
                    icon={FiShield} 
                    style={{ color: 'var(--pharmacy-green)' }} 
                  />
                  <span style={{
                    fontSize: '0.875rem',
                    color: 'var(--gray-600)'
                  }}>
                    FDA Approved
                  </span>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <SafeIcon 
                    icon={FiCheck} 
                    style={{ color: 'var(--pharmacy-green)' }} 
                  />
                  <span style={{
                    fontSize: '0.875rem',
                    color: 'var(--gray-600)'
                  }}>
                    In Stock
                  </span>
                </div>
              </div>

              <div style={{
                display: 'flex',
                gap: '1rem'
              }}>
                <button 
                  className="btn-primary"
                  style={{
                    flex: '1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <SafeIcon icon={FiShoppingCart} />
                  <span>Add to Cart</span>
                </button>
                <button style={{
                  padding: '0.75rem',
                  border: '1px solid var(--gray-300)',
                  borderRadius: '0.5rem',
                  backgroundColor: 'white',
                  transition: 'background-color 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--gray-50)'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                >
                  <SafeIcon 
                    icon={FiHeart} 
                    style={{ fontSize: '1.25rem' }} 
                  />
                </button>
              </div>
            </motion.div>
          </div>

          {/* Tabs Section */}
          <div style={{ borderTop: '1px solid var(--gray-200)' }}>
            <div style={{
              display: 'flex',
              gap: '2rem',
              padding: '0 2rem'
            }}>
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    paddingTop: '1rem',
                    paddingBottom: '1rem',
                    borderBottom: selectedTab === tab.id ? '2px solid var(--primary-500)' : '2px solid transparent',
                    fontWeight: '500',
                    color: selectedTab === tab.id ? 'var(--primary-600)' : 'var(--gray-500)',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (selectedTab !== tab.id) {
                      e.target.style.color = 'var(--gray-700)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedTab !== tab.id) {
                      e.target.style.color = 'var(--gray-500)';
                    }
                  }}
                >
                  <SafeIcon icon={tab.icon} style={{ fontSize: '0.875rem' }} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            <div style={{ padding: '2rem' }}>
              {selectedTab === 'description' && (
                <div className="prose max-w-none">
                  <p style={{
                    color: 'var(--gray-700)',
                    lineHeight: '1.625'
                  }}>
                    {product.description}
                  </p>
                  {product.ingredients && (
                    <div style={{ marginTop: '1.5rem' }}>
                      <h3 style={{
                        fontSize: '1.125rem',
                        fontWeight: '600',
                        color: 'var(--gray-900)',
                        marginBottom: '0.75rem'
                      }}>
                        Active Ingredients
                      </h3>
                      <ul style={{
                        listStyleType: 'disc',
                        listStylePosition: 'inside',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.25rem',
                        color: 'var(--gray-700)'
                      }}>
                        {product.ingredients.map((ingredient, index) => (
                          <li key={index}>{ingredient}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {selectedTab === 'reviews' && (
                <ProductReviews productId={product.id} />
              )}

              {selectedTab === 'safety' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{
                    backgroundColor: 'var(--yellow-50)',
                    border: '1px solid var(--yellow-200)',
                    borderRadius: '0.5rem',
                    padding: '1rem'
                  }}>
                    <h3 style={{
                      fontWeight: '600',
                      color: 'var(--yellow-800)',
                      marginBottom: '0.5rem'
                    }}>
                      Important Safety Information
                    </h3>
                    <p style={{
                      color: 'var(--yellow-700)',
                      fontSize: '0.875rem'
                    }}>
                      Please read all safety information and consult with your healthcare provider 
                      before use. This product may interact with other medications.
                    </p>
                  </div>
                  
                  {product.warnings && (
                    <div>
                      <h4 style={{
                        fontWeight: '600',
                        color: 'var(--gray-900)',
                        marginBottom: '0.5rem'
                      }}>
                        Warnings
                      </h4>
                      <ul style={{
                        listStyleType: 'disc',
                        listStylePosition: 'inside',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.25rem',
                        color: 'var(--gray-700)',
                        fontSize: '0.875rem'
                      }}>
                        {product.warnings.map((warning, index) => (
                          <li key={index}>{warning}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;