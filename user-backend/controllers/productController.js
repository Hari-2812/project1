import Product from "../models/Product.js"
import { io } from "../server.js"   // ✅ ADD

export const addProduct = async (req, res) => {
  const product = await Product.create({
    ...req.body,
    image: req.file?.filename,
  })

  io.emit("product-added", product) // ✅ ADD (REAL-TIME)

  res.status(201).json(product)
}

export const getProducts = async (req, res) => {
  const products = await Product.find()
  res.json(products)
}

export const deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id)
  res.json({ message: "Product deleted" })
}
