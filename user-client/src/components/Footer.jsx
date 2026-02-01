import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaHeart,
} from "react-icons/fa";

import "../styles/Footer.css";

export default function Footer({ showNewsletter = false }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      {/* Newsletter Section - Only shows when showNewsletter={true} */}
      {showNewsletter && (
        <div className="newsletter-section">
          <div className="newsletter-content">
            <h3>Stay Updated!</h3>
            <p>Subscribe to get special offers and updates</p>
            <div className="newsletter-form">
              <input
                type="email"
                placeholder="Enter your email"
                className="newsletter-input"
              />
              <button className="newsletter-btn">Subscribe</button>
            </div>
          </div>
        </div>
      )}

      {/* Main Footer Content */}
      <div className="footer-main">
        <div className="footer-grid">
          {/* About Section */}
          <div className="footer-column">
            <div className="footer-logo">
              Kids<span>Store</span>
            </div>
            <p className="footer-desc">
              Your trusted destination for quality kids' clothing. We bring joy
              to every little adventure with our carefully curated collection.
            </p>
            <div className="social-links">
              <a href="#" className="social-icon" aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="#" className="social-icon" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="#" className="social-icon" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="#" className="social-icon" aria-label="YouTube">
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-column">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li>
                <Link to="/boys">Boys Collection</Link>
              </li>
              <li>
                <Link to="/girls">Girls Collection</Link>
              </li>
              <li>
                <Link to="/favorites">Favorites</Link>
              </li>
              <li>
                <Link to="/cart">Shopping Cart</Link>
              </li>
              <li>
                <Link to="/profile">My Account</Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="footer-column">
            <h4>Customer Service</h4>
            <ul className="footer-links">
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
              <li>
                <Link to="/shipping">Shipping Info</Link>
              </li>
              <li>
                <Link to="/returns">Returns & Exchanges</Link>
              </li>
              <li>
                <Link to="/faq">FAQ</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-column">
            <h4>Get in Touch</h4>
            <ul className="contact-info">
              <li>
                <FaMapMarkerAlt className="contact-icon" />
                <a
                  href="https://www.google.com/maps?q=123+Kids+Avenue+NY+10001"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  123 Kids Avenue, Fashion District, NY 10001
                </a>

              </li>
              <li>
                <FaPhone className="contact-icon" />
                <a href="tel:+919361876698">+91 9361876698</a>
              </li>

              <li>
                <FaEnvelope className="contact-icon" />
                <a href="mailto:support@kidsstore.com">
                  support@kidsstore.com
                </a>
              </li>

            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p className="copyright">
          © {currentYear} KidsStore. All rights reserved.
        </p>
        <div className="footer-bottom-links">
          <Link to="/privacy">Privacy Policy</Link>
          <span className="separator">•</span>
          <Link to="/terms">Terms of Service</Link>
          <span className="separator">•</span>
          <Link to="/cookies">Cookie Policy</Link>
        </div>
        <p className="made-with">
          Made with <FaHeart className="heart-icon" /> for kids everywhere
        </p>
      </div>
    </footer>
  );
}
