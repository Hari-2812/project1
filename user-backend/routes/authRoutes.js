import express from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/User.js"

const router = express.Router()

/* USER LOGIN */
router.post("/login", async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email, role: "user" })
  if (!user) return res.status(401).json({ message: "Invalid credentials" })

  const match = await bcrypt.compare(password, user.password)
  if (!match) return res.status(401).json({ message: "Invalid credentials" })

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  )

  res.json({ token })
})

/* ADMIN LOGIN (unchanged) */
router.post("/admin/login", async (req, res) => {
  const { email, password } = req.body

  const admin = await User.findOne({ email, role: "admin" })
  if (!admin) return res.status(401).json({ message: "Invalid credentials" })

  const match = await bcrypt.compare(password, admin.password)
  if (!match) return res.status(401).json({ message: "Invalid credentials" })

  const token = jwt.sign(
    { id: admin._id, role: admin.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  )

  res.json({ token })
})

/* ===========================
   USER REGISTER
=========================== */
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" })
    }

    const exists = await User.findOne({ email })
    if (exists) {
      return res.status(409).json({ message: "User already exists" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user",
    })

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    })
  } catch (err) {
    console.error("REGISTER ERROR:", err)
    res.status(500).json({ message: "Server error" })
  }
})

export default router
