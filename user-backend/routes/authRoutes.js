import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import admin from '../firebaseAdmin.js'

const router = express.Router()

// Register
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body
  const hashed = await bcrypt.hash(password, 10)
  await User.create({ name, email, password: hashed })
  res.json({ message: 'User created' })
})

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!user) return res.json({ message: 'User not found' })

  const ok = await bcrypt.compare(password, user.password)
  if (!ok) return res.json({ message: 'Invalid password' })

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
  res.json({ token })
})

// Google login
router.post('/google-login', async (req, res) => {
  try {
    const { token } = req.body
    const decoded = await admin.auth().verifyIdToken(token)

    let user = await User.findOne({ email: decoded.email })
    if (!user) {
      user = await User.create({
        name: decoded.name,
        email: decoded.email
      })
    }

    const jwtToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    )

    res.json({ token: jwtToken })
  } catch (err) {
    res.status(401).json({ message: 'Google login failed' })
  }
})

export default router   // ✅ THIS LINE IS REQUIRED
