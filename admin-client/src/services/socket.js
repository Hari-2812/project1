import { io } from "socket.io-client";

/*
  ✅ Admin socket
  ✅ Uses adminToken
  ✅ No auto-connect
  ✅ Safe logout handling
*/
const adminSocket = io("http://localhost:5000", {
  autoConnect: false, // 🔴 IMPORTANT
  transports: ["websocket", "polling"],
  withCredentials: true,
});

/* =========================
   CONNECT SOCKET (AFTER ADMIN LOGIN)
========================= */
export const connectAdminSocket = () => {
  const token = localStorage.getItem("adminToken");

  if (!token) return;

  adminSocket.auth = { token };
  adminSocket.connect();
};

/* =========================
   DISCONNECT SOCKET (ON ADMIN LOGOUT)
========================= */
export const disconnectAdminSocket = () => {
  if (adminSocket.connected) {
    adminSocket.disconnect();
  }
};

/* =========================
   ERROR HANDLING
========================= */
adminSocket.on("connect_error", (err) => {
  console.log("Admin socket error:", err.message);

  if (err.message === "Authentication failed") {
    disconnectAdminSocket();
    localStorage.removeItem("adminToken");
    window.location.href = "/admin/login";
  }
});

export default adminSocket;
