import { useNavigate } from "react-router-dom"
import "../styles/Dashboard.css"

const Dashboard = () => {
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem("adminToken")
    navigate("/")
  }

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <h1>🧵 Kids Textile Admin Dashboard</h1>
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </header>

      {/* Stats Section */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>📦 Orders</h3>
          <p>128</p>
          <span>Live Orders</span>
        </div>

        <div className="stat-card">
          <h3>💳 Payments</h3>
          <p>₹2,45,000</p>
          <span>This Month</span>
        </div>

        <div className="stat-card">
          <h3>🚚 Pending</h3>
          <p>17</p>
          <span>To be Shipped</span>
        </div>

        <div className="stat-card">
          <h3>🛍 Products</h3>
          <p>320</p>
          <span>Active Items</span>
        </div>
      </div>

      {/* Actions */}
      <div className="action-section">
        <h2>Admin Actions</h2>

        <div className="action-grid">
          <button
            className="action-card"
            onClick={() => navigate("/track-orders")}
          >
            📦 Track Orders
          </button>

          <button
            className="action-card"
            onClick={() => navigate("/payment-status")}
          >
            💳 Payment Status
          </button>

          <button
            className="action-card"
            onClick={() => navigate("/add-product")}
          >
            ➕ Add Product
          </button>

          <button
            className="action-card"
            onClick={() => navigate("/create-offer")}
          >
            🎁 Create Offer
          </button>

          <button
            className="action-card"
            onClick={() => navigate("/customers")}
          >
            👥 Customers
          </button>

          <button
            className="action-card"
            onClick={() => navigate("/reports")}
          >
            📊 Reports
          </button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
