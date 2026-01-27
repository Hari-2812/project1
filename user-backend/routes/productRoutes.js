import express from "express"
import Product from "../models/Product.js"
import { authMiddleware } from "../middleware/authMiddleware.js"
import { adminMiddleware } from "../middleware/adminMiddleware.js"
import { getProducts } from "../controllers/productController.js"

const router = express.Router()

// USER – GET PRODUCT
router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (!product) return res.status(404).json({ message: "Not found" })
  res.json(product)
})


router.get("/", getProducts)

// ADMIN – CREATE PRODUCT
router.post("/", authMiddleware, adminMiddleware, async (req, res) => {
  const product = await Product.create(req.body)
  res.status(201).json(product)
})

// ADMIN – UPDATE PRODUCT
router.put("/:id", authMiddleware, adminMiddleware, async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  )
  res.json(product)
})

// ADMIN – DELETE PRODUCT
router.delete("/:id", authMiddleware, adminMiddleware, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id)
  res.json({ message: "Deleted" })
})

export default router
