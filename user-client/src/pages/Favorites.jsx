import { FaHeart } from "react-icons/fa";
import { useFavorite } from "../context/FavoriteContext";
import ProductCard from "../components/ProductCard";
import "../styles/Favorites.css";

export default function Favorites() {
  const { favorites, toggleFavorite } = useFavorite();

  // EMPTY STATE
  if (favorites.length === 0) {
    return (
      <div className="fav-container">
        <h1 className="fav-title">My Favorites</h1>
        <p className="fav-empty">💔 No favorite products yet</p>
      </div>
    );
  }

  return (
    <div className="fav-container">
      <h1 className="fav-title">My Favorites</h1>

      {/* ✅ REUSE PRODUCT CARD GRID */}
      <div className="boys-grid">
        {favorites.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
}
