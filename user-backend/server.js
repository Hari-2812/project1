import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";
import jwt from "jsonwebtoken";
import passport from "passport";

import "./config/passport.js";

/* ===== ROUTES ===== */
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import offerRoutes from "./routes/offerRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import shippingRoutes from "./routes/shippingRoutes.js";
import aboutRoutes from "./routes/aboutRoutes.js";
import returnRouters from "./routes/returnRoutes.js";
import faqRoutes from "./routes/faqRoutes.js";
import newsletterRoutes from "./routes/newsletterRoutes.js";


dotenv.config();

/* =========================
   APP & SERVER
========================= */
const app = express();
const httpServer = createServer(app);

/* =========================
   SOCKET.IO (JWT SECURED)
========================= */
const io = new Server(httpServer, {
  cors: {
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      process.env.CLIENT_URL,
    ].filter(Boolean),
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});

/* 🔐 SOCKET AUTH MIDDLEWARE */
io.use((socket, next) => {
  try {
    const token = socket.handshake.auth?.token;

    if (!token) {
      throw new Error("No token provided");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = decoded;

    next();
  } catch (error) {
    console.log("AUTH MIDDLEWARE ERROR:", error.message);
    next(new Error("Authentication failed"));
  }
});

/* 🔌 SOCKET CONNECTION */
io.on("connection", (socket) => {
  console.log("🟢 Socket connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("🔴 Socket disconnected:", socket.id);
  });
});

export { io };

/* =========================
   MIDDLEWARE
========================= */
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      process.env.CLIENT_URL,
    ].filter(Boolean),
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

/* =========================
   PASSPORT INIT (IMPORTANT)
========================= */
app.use(passport.initialize());

/* =========================
   STATIC FILES
========================= */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* =========================
   ROUTES
========================= */
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
app.use("/api/offers", offerRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/shipping", shippingRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/returns", returnRouters);
app.use("/api/faq", faqRoutes);

app.use("/api/newsletter", newsletterRoutes);


/* =========================
   HEALTH CHECK
========================= */
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is running 🚀",
  });
});

/* =========================
   404 HANDLER
========================= */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

/* =========================
   GLOBAL ERROR HANDLER
========================= */
app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR:", err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong",
  });
});

/* =========================
   DATABASE + SERVER
========================= */
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    httpServer.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });
