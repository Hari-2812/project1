import { useMemo } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaHeart, FaUser } from "react-icons/fa";

import { useCart } from "../context/CartContext";
import { useFavorite } from "../context/FavoriteContext";
import { FaBars } from "react-icons/fa";
import { useState } from "react";
import { useEffect } from "react";

import MobileMenu from "./MobileMenu";

import "../styles/Header.css";
import SearchBox from "./SearchBox";

export default function Header() {
  const { cart } = useCart();
  const { favorites } = useFavorite();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

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
    <>
      <header className="header">
        <button className="menu-btn" onClick={() => setMenuOpen(true)}>
          <FaBars />
        </button>

        <Link to="/home" className="header-logo">
          Kids<span>Store</span>
        </Link>

        <SearchBox />

        <div className="header-right">
          <Link to="/favorites" className="cart-icon">
            <FaHeart />
            {totalFav > 0 && <span className="cart-badge">{totalFav}</span>}
          </Link>

          <Link to="/cart" className="cart-icon">
            <FaShoppingCart />
            {totalQty > 0 && <span className="cart-badge">{totalQty}</span>}
          </Link>

          <Link to="/profile" className="icon-btn">
            <FaUser />
          </Link>
        </div>
      </header>

      {/* ✅ MOBILE SIDEBAR */}
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
