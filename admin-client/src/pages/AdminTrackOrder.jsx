import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/TrackOrder.css";

const AdminTrackOrder = () => {
  const { id } = useParams(); // MongoDB Order _id
  const API_BASE = "http://localhost:5000";

  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  /* =========================
     FETCH ORDER DETAILS
  ========================= */
  const fetchOrderDetails = async () => {
    try {
      const res = await axios.get(
        `${API_BASE}/api/admin/orders/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );

      // backend returns order object directly
      setOrder(res.data);
      setStatus(res.data.orderStatus);
    } catch (error) {
      console.error("❌ Error loading order:", error);
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     UPDATE ORDER STATUS
  ========================= */
  const updateStatus = async () => {
    try {
      await axios.put(
        `${API_BASE}/api/admin/orders/${id}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );

      alert("✅ Order status updated");
      fetchOrderDetails(); // refresh data
    } catch (error) {
      console.error("❌ Failed to update status:", error);
      alert("Failed to update order status");
    }
  };

  /* =========================
     LOAD ON MOUNT
  ========================= */
  useEffect(() => {
    if (!id) return;
    fetchOrderDetails();
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
          <span className={`status-${order.orderStatus.toLowerCase()}`}>
            {order.orderStatus}
          </span>
        </p>
      </div>

      {/* ================= STATUS UPDATE ================= */}
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="Placed">Placed</option>
        <option value="Confirmed">Confirmed</option>
        <option value="Shipped">Shipped</option>
        <option value="Delivered">Delivered</option>
        <option value="Cancelled">Cancelled</option>
      </select>

      <button onClick={updateStatus}>Update Status</button>

      {/* ================= ITEMS ================= */}
      <div className="status-box">
        <h4>Items</h4>
        {order.items.map((item, index) => (
          <p key={index}>
            {item.name} — {item.quantity} × ₹{item.price}
          </p>
        ))}
      </div>
    </div>
  );
};

export default AdminTrackOrder;
