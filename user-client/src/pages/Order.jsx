import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "../styles/Order.css";

export default function OrderSuccess() {
  const location = useLocation();
  const navigate = useNavigate();

  const transactionId = location.state?.transactionId;
  const total = location.state?.total;

  /* 🔐 SAFETY: Redirect if accessed directly */
  useEffect(() => {
    if (!transactionId || !total) {
      navigate("/home", { replace: true });
    }
  }, [transactionId, total, navigate]);

  if (!transactionId || !total) return null;

  return (
    <div className="success-container">
      <div className="success-card animate-pop">

        {/* CHECK ICON */}
        <div className="success-check animate-bounce">✓</div>

        <h1>Order Placed Successfully!</h1>
        <p className="success-subtext">
          Your little one’s happiness is on the way 🎁
        </p>

        {/* ORDER INFO */}
        <div className="success-info">
          <p>
            <strong>Transaction ID:</strong>
            <span>{transactionId}</span>
          </p>

          <p>
            <strong>Total Paid:</strong>
            <span>₹{total}</span>
          </p>
        </div>

        {/* CTA */}
        <button
          className="success-btn"
          onClick={() => navigate("/home")}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}
