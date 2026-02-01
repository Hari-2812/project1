import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  auth: {
    token: localStorage.getItem("token"), // USER TOKEN
  },
  transports: ["websocket", "polling"],
  withCredentials: true,
});

export default socket;
