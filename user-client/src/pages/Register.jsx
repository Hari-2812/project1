import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import "../styles/Register.css";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  /* ======================
     PASSWORD STRENGTH LOGIC
  ====================== */
  const strength = (p) =>
    [/.{8,}/, /[A-Z]/, /\d/, /\W/].filter((r) => r.test(p)).length;

  const strengthValue = strength(form.password);

  const strengthLabel =
    strengthValue <= 1
      ? "Weak"
      : strengthValue === 2
      ? "Medium"
      : "Strong";

  /* ======================
     SUBMIT
  ====================== */
  const submit = async () => {
    if (!form.name || !form.email || !form.password) {
      setError("All fields are required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError("Enter a valid email");
      return;
    }

    if (strengthValue < 3) {
      setError("Password is too weak");
      return;
    }

    setError("");

    const res = await registerUser(form);

    if (res.message === "User registered successfully") {
      navigate("/");
    } else {
      setError(res.message || "Registration failed");
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Create Account</h2>
        <p className="subtitle">Join us in less than a minute</p>

        {error && <p className="login-error">{error}</p>}

        {/* NAME */}
        <input
          placeholder="Full Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        {/* EMAIL */}
        <input
          placeholder="Email address"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        {/* STRENGTH BAR */}
        <div className="strength">
          <div
            className={`bar strength-${strengthValue}`}
          ></div>
        </div>

        {/* STRENGTH LABEL */}
        {form.password && (
          <p
            className={`strength-text ${
              strengthValue <= 1
                ? "weak"
                : strengthValue === 2
                ? "medium"
                : "strong"
            }`}
          >
            Password strength: {strengthLabel}
          </p>
        )}

        <button className="primary-btn" onClick={submit}>
          Register
        </button>

        <p className="switch">
          Already have an account?
          <span onClick={() => navigate("/")}> Login</span>
        </p>
      </div>
    </div>
  );
}
