import HeroBanner from "../components/HeroBanner";
import Marquee from "../components/Marquee";
import NewArrivals from "../components/NewArrivals";
import Categories from "../components/Categories";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="home-page">
      <HeroBanner />
      <Marquee />
      <NewArrivals />
      <Categories />
      <Footer showNewsletter={true} />
    </div>
  );
}
