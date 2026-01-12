import { useCart } from "../context/CartContext";
import "../styles/Checkout.css";

export default function Checkout() {
  const { cart } = useCart();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const discount = subtotal > 2000 ? 300 : 0;
  const delivery = subtotal > 1000 ? 0 : 80;
  const total = subtotal - discount + delivery;

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>

      <div className="checkout-grid">
        {/* ================= LEFT : ADDRESS ================= */}
        <div className="checkout-card">
          <h2>Shipping Address</h2>

          <input placeholder="Full Name" />
          <input placeholder="Phone Number" />
          <input placeholder="Email Address" />
          <textarea placeholder="Full Address" rows="3" />

          <div className="checkout-row">
            <input placeholder="City" />
            <input placeholder="Pincode" />
          </div>
        </div>

        {/* ================= RIGHT : SUMMARY ================= */}
        <div className="checkout-card summary">
          <h2>Order Summary</h2>

          {cart.map((item, i) => (
            <div key={i} className="summary-item">
              <span>
                {item.name} ({item.size}) × {item.qty}
              </span>
              <span>₹{item.price * item.qty}</span>
            </div>
          ))}

          <hr />

          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>

          <div className="summary-row">
            <span>Discount</span>
            <span>- ₹{discount}</span>
          </div>

          <div className="summary-row">
            <span>Delivery</span>
            <span>{delivery === 0 ? "FREE" : `₹${delivery}`}</span>
          </div>

          <hr />

          <div className="summary-total">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <button className="place-order-btn">
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
