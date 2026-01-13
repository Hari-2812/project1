import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useFavorite } from "../context/FavoriteContext";
import "../styles/Header.css";

export default function Header() {
  const { cart } = useCart();
  const { favorites } = useFavorite();

  const totalQty = Array.isArray(cart)
    ? cart.reduce((sum, item) => sum + item.qty, 0)
    : 0;

  return (
    <header className="header">
      <h2 className="logo">
        Kids<span>Store</span>
      </h2>

      <div className="header-icons">
        {/* FAVORITES */}
        <Link to="/favorites" className="cart-icon">
          <FaHeart />
          {favorites.length > 0 && (
            <span className="cart-badge">{favorites.length}</span>
          )}
        </Link>

        {/* CART */}
        <Link to="/cart" className="cart-icon">
          <FaShoppingCart />
          {totalQty > 0 && (
            <span className="cart-badge">{totalQty}</span>
          )}
        </Link>
      </div>
    </header>
  );
}
