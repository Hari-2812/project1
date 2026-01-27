import mongoose from "mongoose"

const productSchema = new mongoose.Schema(
  {
    name: String,
    gender: { type: String, enum: ["Boys", "Girls"] },
    ageGroup: String,
    category: String,
    fabric: String,
    price: Number,
    stock: Number,
    description: String,
    image: String,
  },
  { timestamps: true }
)

export default mongoose.model("Product", productSchema)
