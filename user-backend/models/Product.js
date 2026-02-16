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
      enum: ["boys", "girls"],   // 🔑 lowercase
      required: true,
    },

    category: {
      type: String,
      enum: ["boys", "girls", "toddlers"], // 🔑 enforce valid categories
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
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
