import { FaTrashAlt, FaPlus, FaMinus } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "../styles/Cart.css";
import QuantitySelector from "../components/QuantitySelector";

export default function Cart() {
  const navigate = useNavigate();

  // ✅ Safe default to avoid reduce error
  const { cart = [], updateQty, removeFromCart } = useCart();

  // ✅ Navigate to checkout
  const handleCheckout = () => {
    navigate("/checkout");
  };

  // 🧮 TOTAL CALCULATION (dynamic)
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  // 🛒 EMPTY CART
  if (cart.length === 0) {
    return (
      <div className="cart-container">
        <h1>Your Cart</h1>
        <p className="empty-cart">🛒 Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>

      {cart.map((item) => (
        <div key={`${item._id}-${item.size}`} className="cart-item">
          {/* IMAGE */}
          <img src={item.image} alt={item.name} />

          {/* INFO */}
          <div className="cart-info">
            <h3>{item.name}</h3>
            <p>Size: {item.size}</p>
            <p className="price">₹{item.price}</p>
          </div>

          {/* QUANTITY */}
          <QuantitySelector
            value={item.qty}
            onChange={(newQty) =>
              updateQty(item._id, item.size, newQty)
            }
          />


          {/* ITEM TOTAL */}
          <div className="item-total">
            ₹{item.price * item.qty}
          </div>

          {/* REMOVE */}
          <button
            className="remove-btn"
            onClick={() => removeFromCart(item._id, item.size)}
            title="Remove item"
          >
            <FaTrashAlt />
          </button>
        </div>
      ))}

      {/* SUMMARY */}
      <div className="cart-summary">
        <h2>Total</h2>
        <p>₹{totalAmount}</p>

        <button className="checkout-btn" onClick={handleCheckout}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
