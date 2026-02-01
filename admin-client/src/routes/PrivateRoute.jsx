import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  try {
    const decoded = jwtDecode(token);

    if (decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem("adminToken");
      return <Navigate to="/" replace />;
    }
  } catch (error) {
    localStorage.removeItem("adminToken");
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
