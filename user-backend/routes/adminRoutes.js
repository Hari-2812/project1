import express from "express"
import { authMiddleware } from "../middleware/authMiddleware.js"
import { adminMiddleware } from "../middleware/adminMiddleware.js"
import upload from "../middleware/multer.js"
import { addProduct, deleteProduct } from "../controllers/productController.js"

const router = express.Router()

router.post(
  "/products",
  authMiddleware,
  adminMiddleware,
  upload.single("image"),
  addProduct
)

router.delete(
  "/products/:id",
  authMiddleware,
  adminMiddleware,
  deleteProduct
)

export default router
