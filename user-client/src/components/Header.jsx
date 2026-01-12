import { useMemo } from "react"; // Added for performance
import { Link } from "react-router-dom";
import { FaShoppingCart, FaHeart, FaUser } from "react-icons/fa"; // Grouped icons
import { useCart } from "../context/CartContext";
import "../styles/Header.css";

export default function Header() {
  const { cart } = useCart();

  // ✅ EFFICIENT: Only recalculates if 'cart' changes
  const totalQty = useMemo(() => {
    return Array.isArray(cart)
      ? cart.reduce((sum, item) => sum + item.qty, 0)
      : 0;
  }, [cart]);

  return (
    <header className="header">
      {/* ✅ Fixed class name to match CSS */}
      <h2 className="header-logo">
        KidsStore<span>.</span>
      </h2>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search for kids wear..."
          aria-label="Search"
        />
      </div>

      <div className="header-right">
        <Link to="/cart" className="cart-icon" title="Cart">
          <FaShoppingCart />
          {totalQty > 0 && <span className="cart-badge">{totalQty}</span>}
        </Link>

        <Link to="/wishlist" className="icon-btn" title="Wishlist">
          <FaHeart />
        </Link>

        <Link to="/profile" className="icon-btn" title="Profile">
          <FaUser />
        </Link>
      </div>
    </header>
  );
}
