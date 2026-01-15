import { useMemo } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaHeart, FaUser } from "react-icons/fa";

import { useCart } from "../context/CartContext";
import { useFavorite } from "../context/FavoriteContext";

import "../styles/Header.css";
import SearchBox from "./SearchBox";

export default function Header() {
  const { cart } = useCart();
  const { favorites } = useFavorite();

  /* ======================
     CART COUNT
  ====================== */
  const totalQty = useMemo(() => {
    return Array.isArray(cart)
      ? cart.reduce((sum, item) => sum + item.qty, 0)
      : 0;
  }, [cart]);

  /* ======================
     FAVORITES COUNT
  ====================== */
  const totalFav = useMemo(() => {
    return Array.isArray(favorites) ? favorites.length : 0;
  }, [favorites]);

  /* ======================
     UI
  ====================== */
  return (
    <header className="header">
      {/* LOGO */}
      <Link to="/home" className="header-logo">
        Kids<span>Store</span>
      </Link>

      {/* SEARCH */}
      <SearchBox />
      
      {/* RIGHT ICONS */}
      <div className="header-right">
        {/* FAVORITES */}
        <Link to="/favorites" className="cart-icon" title="Favorites">
          <FaHeart />
          {totalFav > 0 && (
            <span className="cart-badge">{totalFav}</span>
          )}
        </Link>

        {/* CART */}
        <Link to="/cart" className="cart-icon" title="Cart">
          <FaShoppingCart />
          {totalQty > 0 && (
            <span className="cart-badge">{totalQty}</span>
          )}
        </Link>

        {/* PROFILE */}
        <Link to="/profile" className="icon-btn" title="Profile">
          <FaUser />
        </Link>
      </div>
    </header>
  );
}
