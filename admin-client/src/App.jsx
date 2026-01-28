import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import AddProduct from "./pages/AddProduct"
import AdminOrders from "./pages/AdminOrders"
// import AdminOrderDetails from "./pages/AdminOrderDetails"
import AdminTrackOrder from "./pages/AdminTrackOrder"

/* =========================
   PROTECTED ROUTE
========================= */
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken")
  return token ? children : <Navigate to="/" replace />
}

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* =====================
            PUBLIC
        ====================== */}
        <Route path="/" element={<Login />} />

        {/* =====================
            ADMIN (PROTECTED)
        ====================== */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/add-product"
          element={
            <PrivateRoute>
              <AddProduct />
            </PrivateRoute>
          }
        />

        {/* =====================
            ORDERS
        ====================== */}
        <Route
          path="/admin-orders"
          element={
            <PrivateRoute>
              <AdminOrders />
            </PrivateRoute>
          }
        />

        {/* ORDER DETAILS
        <Route
          path="/orders/:id"
          element={
            <PrivateRoute>
              <AdminOrderDetails />
            </PrivateRoute>
          }
        /> */}

        {/* TRACK / UPDATE ORDER */}
        <Route
          path="/orders/:id/track"
          element={
            <PrivateRoute>
              <AdminTrackOrder />
            </PrivateRoute>
          }
        />

        {/* =====================
            FALLBACK
        ====================== */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
