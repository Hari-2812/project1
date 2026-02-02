import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    title: "Shipping Information",

    overview:
      "Textura ensures safe and timely delivery of all textile products. Each order is carefully packed to maintain fabric quality and delivered through reliable logistics partners.",

    deliveryTime: [
      "Within city: 1–2 business days",
      "Within state: 3–5 business days",
      "Other states: 5–7 business days",
    ],

    shippingCharges: [
      "Free shipping on orders above ₹999",
      "Standard delivery charge ₹99 for orders below ₹999",
      "Bulk or wholesale orders may have separate charges",
    ],

    packaging:
      "All products are neatly folded, moisture-protected, and securely packed to avoid damage during transit.",

    tracking:
      "Once your order is shipped, a tracking link will be shared via SMS or email so you can monitor your delivery status in real time.",

    deliveryPartners: [
      "Professional courier services",
      "Trusted logistics partners",
      "Local delivery agents for nearby orders",
    ],

    notes: [
      "Delivery timelines may vary during festivals or high-demand periods",
      "Please ensure correct shipping address while placing the order",
      "Damaged or incorrect items should be reported within 48 hours of delivery",
    ],
  });
});

export default router;
