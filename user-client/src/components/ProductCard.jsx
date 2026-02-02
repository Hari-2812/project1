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

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useFavorite();
  const { addToCart } = useCart();

  console.log("FULL PRODUCT OBJECT:", product);
 console.log("RAW IMAGES ARRAY:", product?.images);

const imageSrc =
  product?.images && product.images.length > 0
    ? product.images[0].startsWith("http")
      ? product.images[0]
      : `${BACKEND_URL}${product.images[0]}`
    : null;

console.log("FINAL IMAGE SRC:", imageSrc);


  console.log("FINAL IMAGE SRC:", imageSrc);

  const fav = isFavorite(product._id);

  const handleFavorite = (e) => {
    e.stopPropagation();
    toggleFavorite(product);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart({
      _id: String(product._id),
      name: product.name,
      price: product.price,
      image: imageSrc,
      size: "M",
      qty: 1,
    });
  };

  const buyNow = (e) => {
    handleAddToCart(e);
    navigate("/checkout");
  };

  return (
    <div
      className="product-card"
      onClick={() => navigate(`/product/${product._id}`)}
    >
      <img
        src={imageSrc}
        alt={product?.name}
        onError={(e) => {
          console.error("IMAGE FAILED TO LOAD:", imageSrc);
          e.currentTarget.src = "/placeholder.png";
        }}
      />

      <div className="product-info">
        <h3>{product.name}</h3>

        <div className="rating">
          <FaStar /> {product.rating || 4.5}
        </div>

        <p className="price">₹{product.price}</p>

        <div className="card-actions">
          <button className="buy-now" onClick={buyNow}>
            Buy Now
          </button>

          <button className="add-cart" onClick={handleAddToCart}>
            <FaShoppingCart /> Add
          </button>

          <button className="fav-btn" onClick={handleFavorite}>
            {fav ? <FaHeart style={{ color: "#ff5e7e" }} /> : <FaRegHeart />}
          </button>
        </div>
      </div>
    </div>
  );
}
