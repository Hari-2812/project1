import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/TrackOrder.css";

const AdminTrackOrder = () => {
  const { id } = useParams();

  // ✅ Correct API base
  const API_BASE = "http://localhost:5000/api";

  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  /* =========================
     FETCH ORDER DETAILS
  ========================= */
  const fetchOrderDetails = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${API_BASE}/orders/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );

      setOrder(res.data);
      setStatus(res.data.orderStatus || "Placed");
    } catch (error) {
      console.error(
        "❌ Error loading order:",
        error.response?.data || error.message
      );
      alert("Failed to load order details");
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     UPDATE ORDER STATUS
  ========================= */
  const updateStatus = async () => {
    if (!status) return;

    try {
      setUpdating(true);

      await axios.put(
        `${API_BASE}/orders/${id}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );

      alert("✅ Order status updated");
      fetchOrderDetails();
    } catch (error) {
      console.error(
        "❌ Failed to update status:",
        error.response?.data || error.message
      );
      alert("Failed to update order status");
    } finally {
      setUpdating(false);
    }
  };

  /* =========================
     LOAD ON MOUNT
  ========================= */
  useEffect(() => {
    if (id) fetchOrderDetails();
  }, [id]);

  if (loading) return <p className="loading-text">Loading Order...</p>;
  if (!order) return <p className="loading-text">Order not found.</p>;

  return (
    <div className="track-order">
      <h2>🚚 Track & Update Order</h2>

      <div className="status-box">
        <p><strong>Order ID:</strong> {order._id}</p>
        <p><strong>Total Amount:</strong> ₹{order.totalAmount}</p>
        <p>
          <strong>Current Status:</strong>{" "}
          <span
            className={`status-${(order.orderStatus || "placed").toLowerCase()}`}
          >
            {order.orderStatus}
          </span>
        </p>
      </div>

      {/* ================= STATUS UPDATE ================= */}
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        disabled={updating}
      >
        <option value="Placed">Placed</option>
        <option value="Confirmed">Confirmed</option>
        <option value="Shipped">Shipped</option>
        <option value="Delivered">Delivered</option>
        <option value="Cancelled">Cancelled</option>
      </select>

      <button onClick={updateStatus} disabled={updating}>
        {updating ? "Updating..." : "Update Status"}
      </button>

      {/* ================= ITEMS ================= */}
      <div className="status-box">
        <h4>Items</h4>
        {order.items?.length > 0 ? (
          order.items.map((item, index) => (
            <p key={index}>
              {item.name} — {item.quantity} × ₹{item.price}
            </p>
          ))
        ) : (
          <p>No items found</p>
        )}
      </div>
    </div>
  );
};

export default AdminTrackOrder;
