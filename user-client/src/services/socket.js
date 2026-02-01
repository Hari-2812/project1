import { io } from "socket.io-client";

/*
  ✅ DO NOT auto-connect
  ✅ Use correct token key
  ✅ Prevent auto-login after logout
*/
const socket = io("http://localhost:5000", {
  autoConnect: false, // 🔴 VERY IMPORTANT
  transports: ["websocket", "polling"],
  withCredentials: true,
});

/* =========================
   CONNECT SOCKET (AFTER LOGIN)
========================= */
export const connectSocket = () => {
  const token = localStorage.getItem("userToken");

  if (!token) return;

  socket.auth = { token };
  socket.connect();
};

/* =========================
   DISCONNECT SOCKET (ON LOGOUT)
========================= */
export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
  }
};

/* =========================
   ERROR HANDLING
========================= */
socket.on("connect_error", (err) => {
  console.log("Socket connection error:", err.message);

  if (err.message === "Authentication failed") {
    disconnectSocket();
    localStorage.clear();
    window.location.href = "/";
  }
});

export default socket;
