import {
  FaHeart,
  FaRegHeart,
  FaStar,
  FaShoppingCart,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useFavorite } from "../context/FavoriteContext";
import { useCart } from "../context/CartContext";
import "../styles/ProductCard.css";

const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useFavorite();
  const { addToCart } = useCart();

  if (!product) return null;

  /* 🖼️ SAFE IMAGE HANDLING */
  const image =
    Array.isArray(product?.images) &&
    typeof product.images[0] === "string"
      ? product.images[0]
      : null;

  const imageSrc = image
    ? image.startsWith("http")
      ? image
      : `${BACKEND_URL}${image}`
    : "/placeholder.png";

  const fav = isFavorite(product._id);

  // ✅ PREVENT INFINITE LOOP
  const handleImageError = (e) => {
    // If the image that failed IS ALREADY the placeholder, stop.
    if (e.target.src.includes("placeholder.png")) {
      e.target.style.display = "none"; // Hide broken image icon
    } else {
      e.target.src = "/placeholder.png"; // Try loading placeholder
    }
  };

  return (
    <div
      className="product-card"
      onClick={() => navigate(`/product/${product._id}`)}
    >
      {/* ✅ WRAPPER KEEPS HEIGHT STABLE */}
      <div className="card-image-wrapper">
        <img
          src={imageSrc}
          alt={product?.name || "Product"}
          onError={handleImageError}
        />
      </div>

      <div className="product-info">
        <h3>{product.name}</h3>

        <div className="rating">
          <FaStar /> {product.rating || 4.5}
        </div>

        <p className="price">₹{product.price}</p>

        <div className="card-actions">
          {/* ... buttons ... */}
          <button className="buy-now" onClick={(e) => {
             e.stopPropagation();
             addToCart({...product, image: imageSrc});
             navigate("/checkout");
          }}>
            Buy Now
          </button>

          <button className="add-cart" onClick={(e) => {
             e.stopPropagation();
             addToCart({...product, image: imageSrc});
          }}>
            <FaShoppingCart /> Add
          </button>

          <button className="fav-btn" onClick={(e) => {
             e.stopPropagation();
             toggleFavorite(product);
          }}>
            {fav ? (
              <FaHeart style={{ color: "#ff5e7e" }} />
            ) : (
              <FaRegHeart />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}