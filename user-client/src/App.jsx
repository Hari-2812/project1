import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Offers from "./pages/Offers";
import Favorites from "./pages/Favorites";
import OrderSuccess from "./pages/Order";
import BoysProducts from "./pages/BoysProducts"; // ✅ ADD THIS

import Header from "./components/Header";

/* 🔐 PRIVATE ROUTE */
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" replace />;
};

export default function App() {
  return (
    <BrowserRouter>
      {/* 🔝 HEADER ALWAYS VISIBLE */}
      <Header />

      <Routes>
        {/* 🌐 PUBLIC ROUTES */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<ForgotPassword />} />

        {/* 🔒 PROTECTED ROUTES */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        {/* 🧒 BOYS PRODUCT LISTING */}
        <Route
          path="/boys"
          element={
            <PrivateRoute>
              <BoysProducts />
            </PrivateRoute>
          }
        />

        {/* 📦 PRODUCT DETAILS */}
        <Route
          path="/product/:id"
          element={
            <PrivateRoute>
              <ProductDetail />
            </PrivateRoute>
          }
        />

        {/* 🛒 CART */}
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />

        {/* 💳 CHECKOUT */}
        <Route
          path="/checkout"
          element={
            <PrivateRoute>
              <Checkout />
            </PrivateRoute>
          }
        />

        {/* ❤️ FAVORITES */}
        <Route
          path="/favorites"
          element={
            <PrivateRoute>
              <Favorites />
            </PrivateRoute>
          }
        />

        {/* 🎉 ORDER SUCCESS */}
        <Route
          path="/order-success"
          element={
            <PrivateRoute>
              <OrderSuccess />
            </PrivateRoute>
          }
        />

        {/* 🔥 OFFERS */}
        <Route
          path="/offers"
          element={
            <PrivateRoute>
              <Offers />
            </PrivateRoute>
          }
        />

        {/* ❌ FALLBACK */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
