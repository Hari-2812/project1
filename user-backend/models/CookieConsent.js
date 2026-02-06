import mongoose from "mongoose";

const cookieConsentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false, // guest users allowed
    },
    consent: {
      type: Boolean,
      required: true,
    },
    ipAddress: String,
    userAgent: String,
  },
  { timestamps: true }
);

export default mongoose.model("CookieConsent", cookieConsentSchema);
