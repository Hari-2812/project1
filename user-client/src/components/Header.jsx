import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import "../styles/Header.css";

export default function Header() {
  const { cart } = useCart();

  // ✅ SAFETY GUARD
  const totalQty = Array.isArray(cart)
    ? cart.reduce((sum, item) => sum + item.qty, 0)
    : 0;

  return (
    <header className="header">
      <h2 className="logo">KidsStore</h2>

      <Link to="/cart" className="cart-icon">
        <FaShoppingCart />
        {totalQty > 0 && (
          <span className="cart-badge">{totalQty}</span>
        )}
      </Link>
    </header>
  );
}
