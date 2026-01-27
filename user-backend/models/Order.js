import mongoose from "mongoose"

const orderSchema = new mongoose.Schema(
  {
    userId: mongoose.Schema.Types.ObjectId,
    products: Array,
    totalAmount: Number,
    status: {
      type: String,
      default: "Pending",
    },
  },
  { timestamps: true }
)

export default mongoose.model("Order", orderSchema)
