import { useState } from "react";
import {
  FaHeart,
  FaRegHeart,
  FaStar,
  FaShoppingCart,
  FaBolt,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

import { useCart } from "../context/CartContext";
import Toast from "../components/Toast";
import "../styles/productDetail.css";

/* ---------------- MOCK DATA ---------------- */
const images = [
  "https://images.unsplash.com/photo-1542060748-10c28b62716c?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1520975922203-bc2a6e4d23c3?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=800&q=80",
];

const relatedProducts = [
  {
    _id: "1",
    name: "Kids Denim Jacket",
    price: 1499,
    image:
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=600&q=80",
  },
  {
    _id: "2",
    name: "Printed Cotton Shirt",
    price: 799,
    image:
      "https://images.unsplash.com/photo-1582418702059-97ebafb35d09?auto=format&fit=crop&w=600&q=80",
  },
  {
    _id: "3",
    name: "Summer Shorts",
    price: 599,
    image:
      "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=600&q=80",
  },
];

export default function ProductDetail() {
  const { addToCart } = useCart();

  /* ---------------- STATES ---------------- */
  const [activeImg, setActiveImg] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [qty, setQty] = useState(1);
  const [fav, setFav] = useState(false);
  const [showToast, setShowToast] = useState(false);

  /* ---------------- REVIEWS ---------------- */
  const [reviews, setReviews] = useState([
    { name: "Aarthi", rating: 5, comment: "Very soft fabric and perfect fit!" },
    { name: "Rohit", rating: 4, comment: "Good quality and fast delivery." },
  ]);

  const [newReview, setNewReview] = useState({
    name: "",
    rating: 5,
    comment: "",
  });

  /* ---------------- FUNCTIONS ---------------- */
  const nextImg = () =>
    setActiveImg((prev) => (prev + 1) % images.length);

  const prevImg = () =>
    setActiveImg((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );

  const handleAddToCart = () => {
    if (!selectedSize) return;

    addToCart({
      _id: "kids-tshirt-1",
      name: "Cute Cotton Kids T-Shirt",
      price: 899,
      image: images[0],
      size: selectedSize,
      qty,
    });

    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const submitReview = () => {
    if (!newReview.name || !newReview.comment) return;
    setReviews([{ ...newReview }, ...reviews]);
    setNewReview({ name: "", rating: 5, comment: "" });
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="pd-container">
      {/* TOAST */}
      <Toast show={showToast} message="Item added to cart" />

      {/* PRODUCT CARD */}
      <div className="pd-card">
        {/* IMAGE SLIDER */}
        <div className="pd-gallery">
          <div className="pd-image-frame">
            <img src={images[activeImg]} alt="Product" />
            <button className="pd-img-btn left" onClick={prevImg}>
              <FaChevronLeft />
            </button>
            <button className="pd-img-btn right" onClick={nextImg}>
              <FaChevronRight />
            </button>
          </div>

          <div className="pd-dots">
            {images.map((_, i) => (
              <span
                key={i}
                className={`pd-dot ${i === activeImg ? "active" : ""}`}
                onClick={() => setActiveImg(i)}
              />
            ))}
          </div>
        </div>

        {/* INFO */}
        <div className="pd-info">
          <div className="pd-title-row">
            <h1 className="pd-title">Cute Cotton Kids T-Shirt</h1>
            <span className="pd-fav" onClick={() => setFav(!fav)}>
              {fav ? <FaHeart /> : <FaRegHeart />}
            </span>
          </div>

          <p className="pd-price">₹899</p>

          <div className="pd-rating">
            <FaStar /><FaStar /><FaStar /><FaStar />
            <FaStar className="dim" />
            <span>4.5 (128 reviews)</span>
          </div>

          <p className="pd-desc">
            Premium cotton t-shirt designed for kids. Ultra-soft,
            breathable and skin-friendly.
          </p>

          <ul className="pd-highlights">
            <li>✔ 100% Organic Cotton</li>
            <li>✔ Safe for Sensitive Skin</li>
            <li>✔ Lightweight & Breathable</li>
            <li>✔ Easy Wash & Durable</li>
          </ul>

          <div className="pd-option">
            <label>Select Size</label>
            <div className="pd-sizes">
              {["S", "M", "L"].map((s) => (
                <button
                  key={s}
                  className={selectedSize === s ? "active" : ""}
                  onClick={() => setSelectedSize(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="pd-option">
            <label>Quantity</label>
            <input
              type="number"
              min="1"
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
            />
          </div>

          <div className="pd-actions">
            <button className="pd-cart-btn" onClick={handleAddToCart}>
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

        {reviews.map((r, i) => (
          <div key={i} className="pd-review-card">
            <strong>{"★".repeat(r.rating)}</strong>
            <p>{r.comment}</p>
            <span>— {r.name}</span>
          </div>
        ))}
      </div>

      {/* RELATED */}
      <div className="pd-related">
        <h2>Related Products</h2>
        <div className="pd-related-grid">
          {relatedProducts.map((p) => (
            <div key={p._id} className="pd-related-card">
              <img src={p.image} alt={p.name} />
              <h4>{p.name}</h4>
              <p>₹{p.price}</p>
              <button
                className="pd-related-cart"
                onClick={() =>
                  addToCart({ ...p, qty: 1 })
                }
              >
                <FaShoppingCart /> Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
