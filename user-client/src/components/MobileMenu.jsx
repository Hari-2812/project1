import { Link } from "react-router-dom";
import { FaHome, FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";
import SearchBox from "./SearchBox";
import "../styles/MobileMenu.css";

export default function MobileMenu({ open, onClose }) {
  return (
    <>
      {open && <div className="overlay" onClick={onClose} />}

      <aside className={`mobile-menu ${open ? "open" : ""}`}>
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>

        <SearchBox />

        <nav>
          <Link to="/home" onClick={onClose}>
            <FaHome />
            <span>Home</span>
          </Link>
          <Link to="/favorites" onClick={onClose}>
            <FaHeart />
            <span>Favorites</span>
          </Link>
          <Link to="/cart" onClick={onClose}>
            <FaShoppingCart />
            <span>Cart</span>
          </Link>
          <Link to="/profile" onClick={onClose}>
            <FaUser />
            <span>Profile</span>
          </Link>
        </nav>
      </aside>
    </>
  );
}
