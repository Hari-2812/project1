import Offer from "../models/Offer.js";

/* =========================
   CREATE OFFER (ADMIN)
========================= */
export const createOffer = async (req, res) => {
  try {
    const { title, description, discountPercent } = req.body;

    if (!title || !discountPercent) {
      return res.status(400).json({
        success: false,
        message: "Title and discount are required",
      });
    }

    const offer = await Offer.create({
      title,
      description,
      discountPercent: Number(discountPercent),
    });

    res.status(201).json({
      success: true,
      offer,
    });
  } catch (err) {
    console.error("CREATE OFFER ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Failed to create offer",
    });
  }
};

/* =========================
   GET ALL OFFERS (PUBLIC)
========================= */
export const getOffers = async (req, res) => {
  try {
    const offers = await Offer.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      offers,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to load offers",
    });
  }
};

/* =========================
   TOGGLE OFFER (ADMIN) ✅ REQUIRED
========================= */
export const toggleOffer = async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id);

    if (!offer) {
      return res.status(404).json({
        success: false,
        message: "Offer not found",
      });
    }

    offer.isActive = !offer.isActive;
    await offer.save();

    res.status(200).json({
      success: true,
      offer,
    });
  } catch (err) {
    console.error("TOGGLE OFFER ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Failed to toggle offer",
    });
  }
};
