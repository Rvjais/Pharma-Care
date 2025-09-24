import React from 'react';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import './Footer.css';

const { FiMapPin, FiPhone, FiMail, FiFacebook, FiTwitter, FiInstagram, FiPackage } = FiIcons;

/**
 * Footer Component
 * Contains contact information, social links, and company details
 */
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-grid">
          
          {/* Company Info Section */}
          <div className="footer-company">
            <div className="footer-logo">
              <div className="footer-logo-icon">
                <SafeIcon icon={FiPackage} style={{ color: 'white', fontSize: '1.125rem' }} />
              </div>
              <span className="footer-logo-text">PharmaCare</span>
            </div>
            <p className="footer-description">
              Your trusted pharmacy partner, providing quality medications and healthcare products 
              with exceptional customer service since 2010.
            </p>
            
            {/* Social Media Links */}
            <div className="social-links">
              <button className="social-btn">
                <SafeIcon icon={FiFacebook} style={{ fontSize: '1.125rem' }} />
              </button>
              <button className="social-btn">
                <SafeIcon icon={FiTwitter} style={{ fontSize: '1.125rem' }} />
              </button>
              <button className="social-btn">
                <SafeIcon icon={FiInstagram} style={{ fontSize: '1.125rem' }} />
              </button>
            </div>
          </div>

          {/* Contact Information */}
          <div className="footer-section">
            <h3>Contact Info</h3>
            <div className="contact-info">
              <div className="contact-item">
                <SafeIcon icon={FiMapPin} className="contact-icon" />
                <span className="contact-text">
                  123 Healthcare Ave, Medical District, City 12345
                </span>
              </div>
              <div className="contact-item">
                <SafeIcon icon={FiPhone} className="contact-icon" />
                <span className="contact-text">+1 (555) 123-4567</span>
              </div>
              <div className="contact-item">
                <SafeIcon icon={FiMail} className="contact-icon" />
                <span className="contact-text">info@pharmacare.com</span>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div className="footer-section">
            <h3>Business Hours</h3>
            <div className="business-hours">
              <div className="hours-row">
                <span>Mon - Fri:</span>
                <span>8:00 AM - 8:00 PM</span>
              </div>
              <div className="hours-row">
                <span>Saturday:</span>
                <span>9:00 AM - 6:00 PM</span>
              </div>
              <div className="hours-row">
                <span>Sunday:</span>
                <span>10:00 AM - 4:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>&copy; 2024 PharmaCare. All rights reserved. | Licensed Pharmacy #RX123456</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;