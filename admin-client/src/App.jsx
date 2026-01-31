import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

/* ================= PAGES ================= */
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AddProduct from "./pages/AddProduct";

import AdminOrders from "./pages/AdminOrders";
import AdminTrackOrder from "./pages/AdminTrackOrder";

/* 🆕 OFFERS */
import AdminOffers from "./pages/AdminOffers";
import AddOffer from "./pages/AddOffer";

/* =========================
   PROTECTED ROUTE
========================= */
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken");
  return token ? children : <Navigate to="/" replace />;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* =====================
            PUBLIC
        ====================== */}
        <Route path="/" element={<Login />} />

        {/* =====================
            ADMIN DASHBOARD
        ====================== */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* =====================
            PRODUCTS
        ====================== */}
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

        <Route
          path="/orders/:id/track"
          element={
            <PrivateRoute>
              <AdminTrackOrder />
            </PrivateRoute>
          }
        />

        {/* =====================
            OFFERS (🆕)
        ====================== */}
        <Route
          path="/admin-offers"
          element={
            <PrivateRoute>
              <AdminOffers />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin-offers/add"
          element={
            <PrivateRoute>
              <AddOffer />
            </PrivateRoute>
          }
        />

        {/* =====================
            FALLBACK
        ====================== */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
