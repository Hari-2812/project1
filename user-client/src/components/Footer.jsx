import { useState } from "react";
import axios from "axios";
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

const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export default function Footer({ showNewsletter = false }) {
  const currentYear = new Date().getFullYear();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  /* 📩 SUBSCRIBE HANDLER */
  const handleSubscribe = async () => {
    if (!email.trim()) {
      setError("Please enter a valid email");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setMessage("");

      const res = await axios.post(
        `${BACKEND_URL}/api/newsletter/subscribe`,
        { email }
      );

      setMessage(res.data.message || "Subscribed successfully 🎉");
      setEmail("");
    } catch (err) {
      setError(
        err?.response?.data?.message || "Subscription failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="footer">
      {/* 📬 NEWSLETTER SECTION */}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />

              <button
                className="newsletter-btn"
                onClick={handleSubscribe}
                disabled={loading}
              >
                {loading ? "Subscribing..." : "Subscribe"}
              </button>
            </div>

            {/* ✅ SUCCESS / ERROR MESSAGE */}
            {message && (
              <p className="newsletter-success">{message}</p>
            )}
            {error && (
              <p className="newsletter-error">{error}</p>
            )}
          </div>
        </div>
      )}

      {/* MAIN FOOTER */}
      <div className="footer-main">
        <div className="footer-grid">
          {/* ABOUT */}
          <div className="footer-column">
            <div className="footer-logo">
              Kids<span>Store</span>
            </div>
            <p className="footer-desc">
              Your trusted destination for quality kids' clothing.
              We bring joy to every little adventure.
            </p>

            <div className="social-links">
              <a href="#" className="social-icon">
                <FaFacebookF />
              </a>
              <a href="#" className="social-icon">
                <FaInstagram />
              </a>
              <a href="#" className="social-icon">
                <FaTwitter />
              </a>
              <a href="#" className="social-icon">
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="footer-column">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/boys">Boys Collection</Link></li>
              <li><Link to="/girls">Girls Collection</Link></li>
              <li><Link to="/favorites">Favorites</Link></li>
              <li><Link to="/cart">Shopping Cart</Link></li>
              <li><Link to="/profile">My Account</Link></li>
            </ul>
          </div>

          {/* CUSTOMER SERVICE */}
          <div className="footer-column">
            <h4>Customer Service</h4>
            <ul className="footer-links">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/shipping">Shipping Info</Link></li>
              <li><Link to="/returns">Returns & Exchanges</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
            </ul>
          </div>

          {/* CONTACT */}
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
                  123 Kids Avenue, NY 10001
                </a>
              </li>
              <li>
                <FaPhone className="contact-icon" />
                <a href="tel:+919361876698">+91 93618 76698</a>
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

      {/* FOOTER BOTTOM */}
      <div className="footer-bottom">
        <p>© {currentYear} KidsStore. All rights reserved.</p>

        <div className="footer-bottom-links">
          <Link to="/privacy">Privacy Policy</Link>
          <span>•</span>
          <Link to="/terms">Terms of Service</Link>
          <span>•</span>
          <Link to="/cookies">Cookie Policy</Link>
        </div>

        <p className="made-with">
          Made with <FaHeart className="heart-icon" /> for kids everywhere
        </p>
      </div>
    </footer>
  );
}
