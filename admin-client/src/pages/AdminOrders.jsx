import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/AdminOrders.css";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const API_BASE = "http://localhost:5000/api";
  const adminToken = localStorage.getItem("adminToken");

  /* =========================
     FETCH ALL ORDERS
  ========================= */
  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API_BASE}/orders`, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });

      setOrders(res.data || []);
    } catch (error) {
      console.error("❌ Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <p className="loading-text">Loading Orders...</p>;

  return (
    <div className="admin-orders">
      <div className="admin-orders-header">
        <h2>📦 Orders</h2>
      </div>

      {orders.length === 0 ? (
        <div className="no-orders">No orders found.</div>
      ) : (
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((o) => (
                <tr key={o._id}>
                  <td>{o._id}</td>

                  <td>
                    {o.items.map((item, idx) => (
                      <div key={idx}>
                        {item.name} × {item.quantity}
                      </div>
                    ))}
                  </td>

                  <td>₹{o.totalAmount}</td>

                  <td
                    className={`order-status status-${o.orderStatus.toLowerCase()}`}
                  >
                    {o.orderStatus}
                  </td>

                  <td>
                    {new Date(o.createdAt).toLocaleString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </td>

                  <td>
                    <button
                      className="order-btn btn-view"
                      onClick={() =>
                        navigate(`/orders/${o._id}/track`)
                      }
                    >
                      Track Order
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
