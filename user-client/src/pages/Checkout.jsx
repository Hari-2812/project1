import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/Checkout.css";

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const { user } = useUser();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [error, setError] = useState("");

  /* ======================
     PREFILL USER
  ====================== */
  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      }));
    }
  }, [user]);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const delivery = subtotal > 1000 ? 0 : 80;
  const discount = subtotal > 2000 ? 300 : 0;
  const total = subtotal - discount + delivery;

  /* ======================
     VALIDATION
  ====================== */
  const validate = () => {
    if (
      !form.name ||
      !form.email ||
      !form.phone ||
      !form.address ||
      !form.city ||
      !form.state ||
      !form.pincode
    ) {
      setError("Please fill all required fields");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError("Enter a valid email address");
      return false;
    }

    if (form.phone.length !== 10 || form.pincode.length !== 6) {
      setError("Enter valid phone number and pincode");
      return false;
    }

    if (cart.length === 0) {
      setError("Your cart is empty");
      return false;
    }

    setError("");
    return true;
  };

  /* ======================
     PLACE ORDER (FIXED)
  ====================== */
 const placeOrder = async () => {
  if (!validate()) return;

  const token = localStorage.getItem("token");
  if (!token) {
    setError("Please login again");
    return;
  }

  // 🔥 FILTER ONLY VALID PRODUCTS
  const orderItems = cart
    .filter(item => item._id && item._id.length === 24)
    .map(item => ({
      productId: item._id, // ✅ VALID ObjectId
      name: item.name,
      quantity: item.qty,
      price: item.price,
    }));

  if (orderItems.length === 0) {
    setError("Invalid products in cart");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        items: orderItems,
        totalAmount: total,
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message);
    }

    const order = await res.json();
    clearCart();

    navigate("/order-success", {
      state: {
        transactionId: order._id,
        total,
      },
    });
  } catch (err) {
    console.error("Order error:", err);
    setError(err.message || "Order failed");
  }
};


  return (
    <div className="checkout-container">
      <h1 className="checkout-title">Checkout</h1>

      <div className="checkout-layout">
        <div className="checkout-section">
          <h2 className="section-title">Shipping Details</h2>

          <input
            placeholder="Full Name"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value.replace(/[^a-zA-Z\s]/g, ""),
              })
            }
          />

          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            placeholder="Phone"
            maxLength="10"
            value={form.phone}
            onChange={(e) =>
              setForm({
                ...form,
                phone: e.target.value.replace(/\D/g, ""),
              })
            }
          />

          <textarea
            placeholder="Address"
            value={form.address}
            onChange={(e) =>
              setForm({ ...form, address: e.target.value })
            }
          />

          <div className="form-group">
            <select
              value={form.city}
              onChange={(e) =>
                setForm({ ...form, city: e.target.value })
              }
            >
              <option value="">Select City</option>
              <option>Chennai</option>
              <option>Bengaluru</option>
              <option>Hyderabad</option>
            </select>

            <select
              value={form.state}
              onChange={(e) =>
                setForm({ ...form, state: e.target.value })
              }
            >
              <option value="">Select State</option>
              <option>Tamil Nadu</option>
              <option>Karnataka</option>
              <option>Telangana</option>
            </select>
          </div>

          <input
            placeholder="Pincode"
            maxLength="6"
            value={form.pincode}
            onChange={(e) =>
              setForm({
                ...form,
                pincode: e.target.value.replace(/\D/g, ""),
              })
            }
          />

          {error && <div className="form-error">{error}</div>}
        </div>

        <div className="checkout-section summary-section">
          <h2 className="section-title">Order Summary</h2>

          <div className="summary-breakdown">
            <div className="row">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="row discount">
              <span>Discount</span>
              <span>-₹{discount}</span>
            </div>
            <div className="row">
              <span>Delivery</span>
              <span>{delivery === 0 ? "FREE" : `₹${delivery}`}</span>
            </div>
          </div>

          <div className="summary-total">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <button className="place-order-btn" onClick={placeOrder}>
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
