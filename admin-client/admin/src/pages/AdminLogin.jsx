import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../services/adminAuthService";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    try {
      const res = await adminLogin({ email, password });

      if (res.token) {
        localStorage.setItem("adminToken", res.token);
        navigate("/admin");
      } else {
        setError(res.message || "Invalid admin credentials");
      }
    } catch {
      setError("Server error");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Admin Login</h2>

        {error && <p className="login-error">{error}</p>}

        <form onSubmit={submit}>
          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="primary-btn">Login</button>
        </form>
      </div>
    </div>
  );
}
