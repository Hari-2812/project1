import {
  FaHeart,
  FaRegHeart,
  FaStar,
  FaShoppingCart,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useFavorite } from "../context/FavoriteContext";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { favorites, addFavorite, removeFavorite } = useFavorite();
  const { addToCart } = useCart();

  const isFav = favorites.some((item) => item._id === product._id);

  const toggleFavorite = (e) => {
    e.stopPropagation();

    if (isFav) {
      removeFavorite(product._id);
    } else {
      addFavorite(product);
    }
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();

    addToCart({
      ...product,
      qty: 1,
      size: "M",
    });
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
          <FaStar /> {product.rating}
        </div>

        <p className="price">₹{product.price}</p>

        <div className="card-actions">
          <button className="add-cart" onClick={handleAddToCart}>
            <FaShoppingCart /> Add
          </button>

          <button className="fav-btn" onClick={toggleFavorite}>
            {isFav ? (
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
