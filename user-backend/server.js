import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import { createServer } from "http"
import { Server } from "socket.io"
import path from "path"
import { fileURLToPath } from "url"

import authRoutes from "./routes/authRoutes.js"
import adminRoutes from "./routes/adminRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"

dotenv.config()

const app = express()

/* ======================
   BASIC MIDDLEWARE
====================== */
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
)
app.use(express.json())

/* ======================
   STATIC FILES (IMAGES)
====================== */
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use("/uploads", express.static(path.join(__dirname, "uploads")))

/* ======================
   ROUTES
====================== */
app.use("/api/auth", authRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/products", productRoutes)
app.use("/api/orders", orderRoutes)

app.get("/test", (req, res) => {
  res.send("Backend OK")
})

/* ======================
   SOCKET.IO SETUP
====================== */
const httpServer = createServer(app)

const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST"],
  },
})

io.on("connection", (socket) => {
  console.log("🟢 User connected:", socket.id)

  socket.on("disconnect", () => {
    console.log("🔴 User disconnected:", socket.id)
  })
})

/* 🔥 EXPORT SOCKET INSTANCE */
export { io }

/* ======================
   DB + SERVER START
====================== */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected")
    httpServer.listen(5000, () => {
      console.log("Server running on port 5000")
    })
  })
  .catch((err) => {
    console.error("Mongo connection error:", err)
  })
