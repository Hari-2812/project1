import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    title: "About Us",
    description:
      "Textura is a premium textile showroom offering a wide range of quality fabrics, ready-made garments, and traditional wear. We focus on delivering elegant designs, superior fabric quality, and affordable pricing to meet the needs of modern and traditional customers.",

    highlights: [
      "Wide variety of textiles including cotton, silk, linen, and blended fabrics",
      "Latest fashion collections for men, women, and kids",
      "Trusted quality with fair and transparent pricing",
      "Personalized in-store and online customer support",
      "Traditional craftsmanship combined with modern trends"
    ],

    mission:
      "Our mission is to provide high-quality textiles that enhance style and comfort while maintaining affordability. We aim to build long-term relationships with customers through trust, quality service, and consistent innovation.",

    vision:
      "To become a trusted and recognized textile showroom by delivering exceptional fabric collections, embracing customer-first values, and expanding our reach through digital platforms.",

    whyChooseUs: [
      "Premium fabric quality assurance",
      "Experienced textile sourcing and design expertise",
      "Affordable pricing for all customer segments",
      "Customer satisfaction and after-sales support",
      "Easy online browsing and showroom visit experience"
    ]
  });
});

export default router;
