import express from "express";
const router = express.Router();

/* TEMP MOCK DATA (replace with DB later) */
const offers = [
  {
    _id: "1",
    title: "Summer Sale",
    description: "Flat 30% OFF on kids wear",
    discount: 30,
    isActive: true,
  },
  {
    _id: "2",
    title: "New User Offer",
    description: "₹200 OFF on first order",
    discount: 200,
    isActive: true,
  },
];

router.get("/", (req, res) => {
  res.json(offers);
});

export default router;
