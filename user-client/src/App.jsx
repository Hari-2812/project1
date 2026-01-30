import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Favorites from "./pages/Favorites";
import Offers from "./pages/Offers";
import OrderSuccess from "./pages/Order";
import Boys from "./pages/BoysProducts"; // ✅ ADDED
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";

import Header from "./components/Header";

/* 🔐 Private Route */
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" replace />;
};

/* 🔹 Wrapper to control Header visibility */
function Layout() {
  const location = useLocation();

  const hideHeaderRoutes = ["/", "/register", "/forgot"];
  const shouldHideHeader = hideHeaderRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideHeader && <Header />}

      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/profile" element={<Profile />} />

        {/* PROTECTED */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile/edit"
          element={
            <PrivateRoute>
              <EditProfile />
            </PrivateRoute>
          }
        />
        
        {/* ✅ BOYS PAGE */}
        <Route
          path="/boys"
          element={
            <PrivateRoute>
              <Boys />
            </PrivateRoute>
          }
        />

        <Route
          path="/product/:id"
          element={
            <PrivateRoute>
              <ProductDetail />
            </PrivateRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />

        <Route
          path="/checkout"
          element={
            <PrivateRoute>
              <Checkout />
            </PrivateRoute>
          }
        />

        <Route
          path="/favorites"
          element={
            <PrivateRoute>
              <Favorites />
            </PrivateRoute>
          }
        />

        <Route
          path="/offers"
          element={
            <PrivateRoute>
              <Offers />
            </PrivateRoute>
          }
        />

        <Route
          path="/order-success"
          element={
            <PrivateRoute>
              <OrderSuccess />
            </PrivateRoute>
          }
        />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
