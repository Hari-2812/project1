import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    title: "Return & Refund Policy",

    overview:
      "At Textura, customer satisfaction is our priority. We follow a transparent and fair return and refund policy to ensure a smooth shopping experience.",

    returnEligibility: [
      "Items must be returned within 7 days of delivery",
      "Product must be unused, unwashed, and in original condition",
      "Original bill or order confirmation is required",
      "Tags and packaging should be intact",
    ],

    nonReturnableItems: [
      "Customized or altered products",
      "Innerwear and clearance sale items",
      "Products damaged due to misuse",
    ],

    refundProcess:
      "Once the returned product is received and inspected, the refund will be initiated within 5–7 business days.",

    refundMode: [
      "Original payment method for online payments",
      "Store credit or bank transfer (if applicable)",
    ],

    exchangePolicy:
      "Exchanges are allowed for size or design issues, subject to stock availability.",

    notes: [
      "Shipping charges are non-refundable unless the product is defective",
      "Customers are requested to record an unboxing video for damaged items",
      "For any assistance, please contact our support team",
    ],
  });
});

export default router;
