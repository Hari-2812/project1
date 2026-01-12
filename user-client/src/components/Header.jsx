import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/Header.css";

export default function Header() {
  const { cart } = useCart();

  const totalQty = Array.isArray(cart)
    ? cart.reduce((sum, item) => sum + item.qty, 0)
    : 0;

  return (
    <header className="header">
      <h2 className="logo">
        Kids<span>Store</span>
      </h2>

      <Link to="/cart" className="cart-icon">
        <FaShoppingCart />
        {totalQty > 0 && (
          <span className="cart-badge">{totalQty}</span>
        )}
      </Link>
    </header>
  );
}
