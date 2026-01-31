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

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useFavorite();
  const { addToCart } = useCart();

  const fav = isFavorite(product._id);

  /* ======================
     FAVORITE
  ====================== */
  const handleFavorite = (e) => {
    e.stopPropagation();
    toggleFavorite(product);
  };

  /* ======================
     CART
  ====================== */
  const handleAddToCart = (e) => {
    e.stopPropagation();

    addToCart({
      _id: String(product._id), // keep consistent
      name: product.name,
      price: product.price,
      image: product.image,
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
      <img src={product.image} alt={product.name} />

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
