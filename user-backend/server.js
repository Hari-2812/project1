import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes.js'

/* Load env FIRST */
dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

/* Test env */
console.log('Mongo URI exists:', !!process.env.MONGO_URI)

/* MongoDB connection */
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('✅ MongoDB connected successfully')
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message)
    process.exit(1)
  }
}

connectDB()

app.use('/api/auth', authRoutes)

const PORT = 5000
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
})
