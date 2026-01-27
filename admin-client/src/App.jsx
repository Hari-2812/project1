import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import AddProduct from "./pages/AddProduct"
// later you can create these pages
// import TrackOrders from "./pages/TrackOrders"
// import PaymentStatus from "./pages/PaymentStatus"
// import CreateOffer from "./pages/CreateOffer"

/* Protect admin routes */
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken")
  return token ? children : <Navigate to="/" replace />
}

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public route */}
        <Route path="/" element={<Login />} />

        {/* Protected admin routes */}
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

        {/*
        <Route
          path="/track-orders"
          element={
            <PrivateRoute>
              <TrackOrders />
            </PrivateRoute>
          }
        />

        <Route
          path="/payment-status"
          element={
            <PrivateRoute>
              <PaymentStatus />
            </PrivateRoute>
          }
        />

        <Route
          path="/create-offer"
          element={
            <PrivateRoute>
              <CreateOffer />
            </PrivateRoute>
          }
        />
        */}

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
