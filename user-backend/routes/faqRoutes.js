import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    title: "Frequently Asked Questions",

    faqs: [
      {
        question: "What products are available at Textura?",
        answer:
          "Textura offers a wide range of textiles including cotton, silk, linen fabrics, ready-made garments, and traditional wear for men, women, and kids.",
      },
      {
        question: "Do you offer online ordering?",
        answer:
          "Yes, customers can browse products online and place orders through our website for home delivery.",
      },
      {
        question: "What are the delivery timelines?",
        answer:
          "Delivery usually takes 1–2 days within the city, 3–5 days within the state, and 5–7 days for other locations.",
      },
      {
        question: "Is Cash on Delivery (COD) available?",
        answer:
          "Yes, Cash on Delivery is available for selected locations and orders.",
      },
      {
        question: "What is your return policy?",
        answer:
          "Products can be returned within 7 days of delivery if they are unused and in original condition.",
      },
      {
        question: "Do you have a physical showroom?",
        answer:
          "Yes, Textura has a physical showroom where customers can experience the fabric quality in person.",
      },
      {
        question: "How can I contact customer support?",
        answer:
          "You can reach us through the Contact page, email, or phone number mentioned on our website.",
      },
    ],
  });
});

export default router;
