import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  category: { type: String, enum: ["boys","girls"], index: true },
  price: Number,
  stock: Number,
  sizes: [String],
  image: String,
  isActive: { type: Boolean, default: true }
});

export default mongoose.model("Product", productSchema);
