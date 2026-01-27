import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import dotenv from "dotenv"
import User from "../models/User.js"

dotenv.config()

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("MongoDB connected")

    const email = "admin@gmail.com"
    const password = "admin123"

    const exists = await User.findOne({ email })
    if (exists) {
      console.log("⚠️ Admin already exists")
      process.exit(0)
    }

    const hash = await bcrypt.hash(password, 10)

    await User.create({
      name: "Super Admin",
      email,
      password: hash,
      role: "admin"
    })

    console.log("✅ Admin created successfully")
    process.exit(0)
  } catch (err) {
    console.error("❌ Error creating admin:", err.message)
    process.exit(1)
  }
}

createAdmin()
