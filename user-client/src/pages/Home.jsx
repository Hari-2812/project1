import HeroBanner from "../components/HeroBanner";
import Marquee from "../components/Marquee";
import NewArrivals from "../components/NewArrivals";

export default function Home() {
  return (
    <div className="home-page">
      <HeroBanner />
      <Marquee /> {/* 👈 Announcement bar */}
      <NewArrivals />
      {/* Add more sections here later */}
    </div>
  );
}
