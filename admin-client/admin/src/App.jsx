import { Routes, Route, Navigate } from "react-router-dom";

import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";
import ProductList from "./pages/Products/ProductList";
import AddProduct from "./pages/Products/AddProduct";
import BulkUpload from "./pages/Products/BulkUpload";
import OrderList from "./pages/Orders/OrderList";

/* 🔐 ADMIN PROTECTED ROUTE */
const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken");
  return token ? children : <Navigate to="/admin/login" replace />;
};

export default function App() {
  return (
    <Routes>
      {/* LOGIN */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* DASHBOARD */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <Dashboard />
          </AdminRoute>
        }
      />

      {/* PRODUCTS */}
      <Route
        path="/admin/products"
        element={
          <AdminRoute>
            <ProductList />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/products/add"
        element={
          <AdminRoute>
            <AddProduct />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/products/bulk"
        element={
          <AdminRoute>
            <BulkUpload />
          </AdminRoute>
        }
      />

      {/* ORDERS */}
      <Route
        path="/admin/orders"
        element={
          <AdminRoute>
            <OrderList />
          </AdminRoute>
        }
      />

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/admin/login" />} />
    </Routes>
  );
}
