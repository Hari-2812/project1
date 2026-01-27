import mongoose from "mongoose";

const sizeSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      default: 0,
    },
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    gender: {
      type: String,
      enum: ["Boys", "Girls"],
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    discountPrice: {
      type: Number,
      default: null,
    },

    sizes: [sizeSchema],

    description: {
      type: String,
      default: "",
    },

    productCode: {
      type: String,
      default: "",
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    images: {
      type: [String], // stored as "/uploads/filename.jpg"
      default: [],
    },
  },
  { timestamps: true }
);

/* ✅ THIS IS THE FIX */
const Product = mongoose.model("Product", productSchema);
export default Product;
