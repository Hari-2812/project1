import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import "../styles/HeroBanner.css";

export default function HeroBanner() {
  const slides = [
    {
      id: 1,
      title: "Summer Collection",
      subtitle: "Colorful & Comfortable",
      description: "Explore our vibrant summer wear for kids",
      image:
        "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=1200&h=600&fit=crop",
      cta: "Shop Now",
    },
    {
      id: 2,
      title: "Back to School",
      subtitle: "Fresh & Stylish",
      description: "Get ready for the new school year",
      image:
        "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1200&h=600&fit=crop",
      cta: "Explore",
    },
    {
      id: 3,
      title: "Winter Warmth",
      subtitle: "Cozy & Cute",
      description: "Keep your little ones warm this winter",
      image:
        "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=1200&h=600&fit=crop",
      cta: "Discover",
    },
  ];

  return (
    <div className="hero-banner">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop={true}
        speed={800}
        className="hero-swiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="slide"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="slide-overlay"></div>
              <div className="slide-content">
                <h3 className="slide-subtitle">{slide.subtitle}</h3>
                <h1 className="slide-title">{slide.title}</h1>
                <p className="slide-description">{slide.description}</p>
                <button className="slide-cta">{slide.cta}</button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
