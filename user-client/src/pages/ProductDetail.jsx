import { useState } from "react";
import {
  FaHeart,
  FaRegHeart,
  FaStar,
  FaShoppingCart,
  FaBolt,
} from "react-icons/fa";

import ImageGallery from "../components/ImageGallery";
import RelatedProducts from "../components/RelatedProducts";
import "../styles/productDetail.css";

export default function ProductDetail() {
  /* ---------------- STATES ---------------- */
  const [selectedSize, setSelectedSize] = useState(null);
  const [qty, setQty] = useState(1);
  const [fav, setFav] = useState(false);

  /* ---------------- REVIEWS ---------------- */
  const [reviews, setReviews] = useState([
    {
      name: "Aarthi",
      rating: 5,
      comment: "Very soft fabric and perfect fit for my kid!",
    },
    {
      name: "Rohit",
      rating: 4,
      comment: "Good quality and fast delivery. Worth buying.",
    },
  ]);

  const [newReview, setNewReview] = useState({
    name: "",
    rating: 5,
    comment: "",
  });

  const submitReview = () => {
    if (!newReview.name || !newReview.comment) return;

    setReviews([{ ...newReview }, ...reviews]);
    setNewReview({ name: "", rating: 5, comment: "" });
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="pd-container">
      {/* ================= PRODUCT CARD ================= */}
      <div className="pd-main pd-card">
        {/* LEFT : IMAGE SLIDER */}
        <ImageGallery />

        {/* RIGHT : PRODUCT INFO */}
        <div className="pd-info">
          {/* TITLE + FAV */}
          <div className="pd-title-row">
            <h1 className="pd-title">Cute Cotton Kids T-Shirt</h1>
            <span className="pd-fav" onClick={() => setFav(!fav)}>
              {fav ? <FaHeart /> : <FaRegHeart />}
            </span>
          </div>

          {/* PRICE */}
          <p className="pd-price">₹899</p>

          {/* RATING */}
          <div className="pd-rating">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar className="dim" />
            <span>4.5 (128 reviews)</span>
          </div>

          {/* DESCRIPTION */}
          <p className="pd-desc">
            Premium cotton t-shirt specially designed for kids.
            Ultra-soft, breathable and skin-friendly fabric ensures
            all-day comfort. Ideal for daily wear, playtime and outings.
          </p>

          {/* HIGHLIGHTS */}
          <ul className="pd-highlights">
            <li>✔ 100% Organic Cotton</li>
            <li>✔ Safe for Sensitive Skin</li>
            <li>✔ Lightweight & Breathable</li>
            <li>✔ Easy Wash & Long Lasting</li>
          </ul>

          {/* SIZE */}
          <div className="pd-option">
            <label>Select Size</label>
            <div className="pd-sizes">
              {["S", "M", "L"].map((size) => (
                <button
                  key={size}
                  className={selectedSize === size ? "active" : ""}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
            {!selectedSize && (
              <span className="pd-warning">Please select a size</span>
            )}
          </div>

          {/* QUANTITY */}
          <div className="pd-option">
            <label>Quantity</label>
            <input
              type="number"
              min="1"
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
            />
          </div>

          {/* DELIVERY */}
          <div className="pd-delivery">
            🚚 Free delivery in <strong>3-5 business days</strong>
            <br />
            🔁 Easy 7-day return policy
          </div>

          {/* ACTION BUTTONS */}
          <div className="pd-actions">
            <button className="pd-cart-btn">
              <FaShoppingCart /> Add to Cart
            </button>

            <button className="pd-buy-btn">
              <FaBolt /> Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* ================= REVIEWS ================= */}
      <div className="pd-reviews">
        <h2>Customer Reviews</h2>

        {/* REVIEW FORM */}
        <div className="pd-review-form">
          <input
            placeholder="Your Name"
            value={newReview.name}
            onChange={(e) =>
              setNewReview({ ...newReview, name: e.target.value })
            }
          />

          <select
            value={newReview.rating}
            onChange={(e) =>
              setNewReview({ ...newReview, rating: Number(e.target.value) })
            }
          >
            <option value="5">★★★★★ (5)</option>
            <option value="4">★★★★☆ (4)</option>
            <option value="3">★★★☆☆ (3)</option>
          </select>

          <textarea
            placeholder="Write your review..."
            value={newReview.comment}
            onChange={(e) =>
              setNewReview({ ...newReview, comment: e.target.value })
            }
          />

          <button onClick={submitReview}>Submit Review</button>
        </div>

        {/* REVIEW LIST */}
        {reviews.map((r, i) => (
          <div key={i} className="pd-review-card">
            <strong>{"★".repeat(r.rating)}</strong>
            <p>{r.comment}</p>
            <span>— {r.name}</span>
          </div>
        ))}
      </div>

      {/* ================= RELATED PRODUCTS ================= */}
      <RelatedProducts />
    </div>
  );
}
