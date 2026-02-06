import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/AdminUserDetails.css";

const API_BASE = "http://localhost:5000/api";

const AdminUserDetails = () => {
  const { id } = useParams();
  const adminToken = localStorage.getItem("adminToken");

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`${API_BASE}/admin/users/${id}`, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });

      setData(res.data);
    };

    fetchUser();
  }, [id, adminToken]);

  if (!data) return <p>Loading...</p>;

  const { user, stats } = data;

  return (
    <div className="user-details">
      <h1>👤 {user.name}</h1>

      <div className="info-grid">
        <div><strong>Email:</strong> {user.email}</div>
        <div><strong>Phone:</strong> {user.phone || "N/A"}</div>
        <div><strong>Role:</strong> {user.role}</div>
        <div><strong>Status:</strong> {user.isActive ? "Active" : "Blocked"}</div>
        <div><strong>Joined:</strong> {new Date(user.createdAt).toDateString()}</div>
      </div>

      <h2>📦 Order Summary</h2>
      <div className="stats-grid">
        <div>🛒 Total Orders: {stats.totalOrders}</div>
        <div>❌ Cancelled: {stats.cancelledOrders}</div>
        <div>↩️ Returned: {stats.returnedOrders}</div>
      </div>

      <h2>🏠 Address</h2>
      <p>
        {user.address.street}, {user.address.city},{" "}
        {user.address.state} - {user.address.pincode}
      </p>
    </div>
  );
};

export default AdminUserDetails;
