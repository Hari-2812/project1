import { useEffect, useState } from "react";
import OfferCard from "../components/OfferCard";
import { getOffers } from "../services/offerService";
import "../styles/Offers.css";

export default function Offers() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ======================
     FETCH OFFERS
  ====================== */
  const fetchOffers = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await getOffers();

      /*
        Backend may return:
        - { success: true, offers: [...] }
        - { offers: [...] }
        - [...]
      */
      const list =
        Array.isArray(res)
          ? res
          : Array.isArray(res?.offers)
          ? res.offers
          : [];

      // ✅ Only active offers for users
      const activeOffers = list.filter((o) => o.isActive);

      setOffers(activeOffers);
    } catch (err) {
      console.error("❌ Offer fetch failed:", err);
      setError("Unable to load offers. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  /* ======================
     STATES
  ====================== */

  if (loading) {
    return (
      <div className="offer-loading">
        🎁 Loading exciting offers...
      </div>
    );
  }

  if (error) {
    return (
      <div className="offer-error">
        <p>{error}</p>
        <button onClick={fetchOffers}>Retry</button>
      </div>
    );
  }

  if (offers.length === 0) {
    return (
      <div className="offer-empty">
        🎁 No offers available right now
      </div>
    );
  }

  /* ======================
     UI
  ====================== */
  return (
    <div className="offers-container">
      <h1 className="offers-title">🔥 Latest Offers</h1>

      <div className="offers-grid">
        {offers.map((offer) => (
          <OfferCard key={offer._id} offer={offer} />
        ))}
      </div>
    </div>
  );
}
