// admin-client/admin/src/services/adminAuthService.js

const API = "http://localhost:5000/api/admin";

/* ADMIN LOGIN */
export const adminLogin = async (data) => {
  const res = await fetch(`${API}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
};
