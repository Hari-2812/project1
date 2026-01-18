import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import offerRoutes from "./routes/offerRoutes.js";
import adminAuthRoutes from "./routes/adminAuthRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

/* ROUTES */
app.use("/api/auth", authRoutes); // user auth
app.use("/api/admin", adminAuthRoutes); // ✅ admin auth
app.use("/api/offers", offerRoutes); // offers

console.log("🔥 Admin auth routes mounted at /api/admin");
console.log("Mongo URI exists:", !!process.env.MONGO_URI);

/* MongoDB */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
