import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();

const app = express();
const httpServer = createServer(app);

/* ===== SOCKET ===== */
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:5174"],
  },
});

io.on("connection", (socket) => {
  console.log("🟢 Socket connected:", socket.id);
});

export { io };

/* ===== MIDDLEWARE ===== */
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"],
  credentials: true,
}));
app.use(express.json());

/* ===== STATIC UPLOADS ===== */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* ===== ROUTES ===== */
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

/* ===== DB ===== */
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("MongoDB connected");
  httpServer.listen(5000, () =>
    console.log("Server running on http://localhost:5000")
  );
});
