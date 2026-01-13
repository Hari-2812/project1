import { FaHeart } from "react-icons/fa";
import { useFavorite } from "../context/FavoriteContext";
import "../styles/Favorites.css";

export default function Favorites() {
  const { favorites, toggleFavorite } = useFavorite();

  if (favorites.length === 0) {
    return (
      <div className="fav-container">
        <h1>My Favorites</h1>
        <p className="fav-empty">💔 No favorite products yet</p>
      </div>
    );
  }

  return (
    <div className="fav-container">
      <h1>My Favorites</h1>

      <div className="fav-grid">
        {favorites.map((item) => (
          <div key={item._id} className="fav-card">
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p className="fav-price">₹{item.price}</p>

            <button
              className="fav-remove"
              onClick={() => toggleFavorite(item)}
            >
              <FaHeart /> Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
