import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/Checkout.css";

export default function Checkout() {
  const { cart } = useCart();
  const { user } = useUser();
  const navigate = useNavigate();

  /* ---------------- FORM STATE ---------------- */
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [errors, setErrors] = useState({});

  /* ---------------- PREFILL USER ---------------- */
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

  /* ---------------- TOTAL ---------------- */
  const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const delivery = subtotal > 1000 ? 0 : 80;
  const discount = subtotal > 2000 ? 300 : 0;
  const total = subtotal - discount + delivery;

  /* ---------------- VALIDATION ---------------- */
  const validate = () => {
    let newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    if (!/^\d{10}$/.test(form.phone))
      newErrors.phone = "Enter valid 10-digit phone number";
    if (!form.address.trim()) newErrors.address = "Address is required";
    if (!form.city) newErrors.city = "Select city";
    if (!form.state) newErrors.state = "Select state";
    if (!/^\d{6}$/.test(form.pincode))
      newErrors.pincode = "Enter valid 6-digit pincode";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ---------------- PLACE ORDER ---------------- */
  const placeOrder = () => {
    if (!validate()) return;

    const transactionId = "TXN" + Date.now();

    navigate("/order-success", {
      state: { transactionId, total },
    });
  };

  return (
    <div className="checkout-container">
      <h1 className="checkout-title">Checkout</h1>

      <div className="checkout-layout">
        {/* LEFT */}
        <div className="checkout-section">
          <h2 className="section-title">Shipping Details</h2>

          <input
            placeholder="Full Name *"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value.replace(/[^a-zA-Z\s]/g, ""),
              })
            }
            className={errors.name ? "input-error" : "input-ok"}
          />
          {errors.name && <span className="error-text">{errors.name}</span>}

          <input
            type="email"
            placeholder="Email *"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            className={errors.email ? "input-error" : "input-ok"}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}

          <input
            placeholder="Phone Number *"
            maxLength="10"
            value={form.phone}
            onChange={(e) =>
              setForm({
                ...form,
                phone: e.target.value.replace(/\D/g, ""),
              })
            }
            className={errors.phone ? "input-error" : "input-ok"}
          />
          {errors.phone && <span className="error-text">{errors.phone}</span>}

          <textarea
            placeholder="Full Address *"
            value={form.address}
            onChange={(e) =>
              setForm({ ...form, address: e.target.value })
            }
            className={errors.address ? "input-error" : "input-ok"}
          />
          {errors.address && (
            <span className="error-text">{errors.address}</span>
          )}

          <div className="form-group">
            <select
              value={form.city}
              onChange={(e) =>
                setForm({ ...form, city: e.target.value })
              }
              className={errors.city ? "input-error" : "input-ok"}
            >
              <option value="">Select City *</option>
              <option>Chennai</option>
              <option>Bengaluru</option>
              <option>Hyderabad</option>
              <option>Coimbatore</option>
            </select>

            <select
              value={form.state}
              onChange={(e) =>
                setForm({ ...form, state: e.target.value })
              }
              className={errors.state ? "input-error" : "input-ok"}
            >
              <option value="">Select State *</option>
              <option>Tamil Nadu</option>
              <option>Karnataka</option>
              <option>Kerala</option>
              <option>Telangana</option>
            </select>
          </div>

          {(errors.city || errors.state) && (
            <span className="error-text">
              Please select city and state
            </span>
          )}

          <input
            placeholder="Pincode *"
            maxLength="6"
            value={form.pincode}
            onChange={(e) =>
              setForm({
                ...form,
                pincode: e.target.value.replace(/\D/g, ""),
              })
            }
            className={errors.pincode ? "input-error" : "input-ok"}
          />
          {errors.pincode && (
            <span className="error-text">{errors.pincode}</span>
          )}
        </div>

        {/* RIGHT */}
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
