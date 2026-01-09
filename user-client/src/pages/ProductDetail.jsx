import { useState } from "react";
import { FaHeart, FaRegHeart, FaStar, FaShoppingCart, FaBolt } from "react-icons/fa";
import ImageGallery from "../components/ImageGallery";
import RelatedProducts from "../components/RelatedProducts";
import "../styles/productDetail.css";

export default function ProductDetail() {
  const [selectedSize, setSelectedSize] = useState(null);
  const [qty, setQty] = useState(1);
  const [fav, setFav] = useState(false);

  return (
    <div className="pd-container">
      <div className="pd-main pd-card">

        {/* LEFT: IMAGES */}
        <ImageGallery />

        {/* RIGHT: INFO */}
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

          {/* RATINGS */}
          <div className="pd-rating">
            <FaStar /><FaStar /><FaStar /><FaStar /><FaStar className="dim" />
            <span>4.5 (128 Reviews)</span>
          </div>

          {/* DESCRIPTION */}
          <p className="pd-desc">
            Premium quality cotton t-shirt crafted especially for kids.
            Ultra-soft, breathable, and skin-friendly fabric ensures
            all-day comfort. Perfect for playtime, outings, and casual wear.
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
            {!selectedSize && <span className="pd-warning">Please select a size</span>}
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
            🚚 Free Delivery by <strong>3-5 Business Days</strong><br />
            🔁 Easy 7-Day Return Policy
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

      {/* REVIEWS */}
      <div className="pd-reviews">
        <h2>Customer Reviews</h2>

        <div className="pd-review-card">
          <strong>⭐ ⭐ ⭐ ⭐ ⭐</strong>
          <p>
            Very soft material and perfect fitting for my kid.
            Totally worth the price!
          </p>
          <span>— Aarthi, Chennai</span>
        </div>

        <div className="pd-review-card">
          <strong>⭐ ⭐ ⭐ ⭐</strong>
          <p>
            Nice quality and fast delivery. My son loved it.
          </p>
          <span>— Rohit, Bengaluru</span>
        </div>
      </div>

      {/* RELATED */}
      <RelatedProducts />
    </div>
  );
}
