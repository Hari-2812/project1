import { FaTrashAlt, FaPlus, FaMinus } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import "../styles/cart.css";

export default function Cart() {
  const { cart, updateQty, removeFromCart } = useCart();

  // 🧮 Calculate total
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

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

          {/* QTY */}
          <div className="qty-controls">
            <button
              onClick={() =>
                updateQty(item._id, item.size, Math.max(1, item.qty - 1))
              }
            >
              <FaMinus />
            </button>

            <span>{item.qty}</span>

            <button
              onClick={() =>
                updateQty(item._id, item.size, item.qty + 1)
              }
            >
              <FaPlus />
            </button>
          </div>

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
        <button className="checkout-btn">Proceed to Checkout</button>
      </div>
    </div>
  );
}
