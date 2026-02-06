import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/AdminUsers.css";

const API_BASE = "http://localhost:5000/api";

const AdminUsers = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const adminToken = localStorage.getItem("adminToken");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${API_BASE}/admin/users`, {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        });

        setUsers(res.data.users || []);
      } catch (error) {
        console.error("❌ Failed to load users", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [adminToken]);

  if (loading) {
    return <h2 style={{ padding: 20 }}>Loading customers...</h2>;
  }

  if (users.length === 0) {
    return (
      <div className="admin-users">
        <h1>👥 Customers</h1>
        <p>No customers found.</p>
      </div>
    );
  }

  return (
    <div className="admin-users">
      <h1>👥 Customers</h1>

      <table className="users-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Status</th>
            <th>Joined</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              {/* 👇 CLICKABLE NAME */}
              <td
                className="user-link"
                onClick={() => navigate(`/admin-users/${user._id}`)}
                title="View customer details"
              >
                {user.name}
              </td>

              <td>{user.email}</td>
              <td>{user.phone || "-"}</td>

              <td>
                <span className={`role ${user.role}`}>
                  {user.role}
                </span>
              </td>

              <td>
                {user.isActive ? "✅ Active" : "❌ Blocked"}
              </td>

              <td>
                {new Date(user.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;
