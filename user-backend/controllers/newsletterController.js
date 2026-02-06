import Subscriber from "../models/Subscriber.js";
import { sendEmail } from "../utils/sendEmail.js";

/* 📩 USER SUBSCRIBE */
export const subscribeEmail = async (req, res) => {
  const { email } = req.body;

  try {
    const exists = await Subscriber.findOne({ email });
    if (exists)
      return res.status(400).json({ message: "Already subscribed" });

    await Subscriber.create({ email });

    // Thank you email
    await sendEmail(
      email,
      "Thanks for Subscribing!",
      `
      <h2>Thanks for subscribing 🎉</h2>
      <p>Stay connected to get latest offers and updates.</p>
      `
    );

    res.json({ message: "Subscribed successfully" });
  } catch (err) {
    res.status(500).json({ message: "Subscription failed" });
  }
};

/* 📢 ADMIN SEND OFFER */
export const sendOfferToSubscribers = async (req, res) => {
  const { title, description } = req.body;

  const subscribers = await Subscriber.find();

  for (let sub of subscribers) {
    await sendEmail(
      sub.email,
      title,
      `
      <h2>${title}</h2>
      <p>${description}</p>
      <p>Happy Shopping 🛍️</p>
      `
    );
  }

  res.json({ message: "Offer sent to all subscribers" });
};
