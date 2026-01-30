import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    /* =========================
       BASIC INFO
    ========================= */
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    /* =========================
       PROFILE INFO
    ========================= */
    phone: {
      type: String,
      trim: true,
      default: "",
    },

    avatar: {
      type: String, // image URL
      default: "",
    },

    /* =========================
       ADDRESS
    ========================= */
    address: {
      street: { type: String, default: "" },
      city: { type: String, default: "" },
      state: { type: String, default: "" },
      pincode: { type: String, default: "" },
    },

    /* =========================
       STATUS
    ========================= */
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
