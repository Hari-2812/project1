import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  auth: {
    token: localStorage.getItem("adminToken"), // ADMIN TOKEN
  },
  transports: ["websocket", "polling"],
  withCredentials: true,
});

export default socket;
