import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import nurseryHero from "../Images/StockCake-Sunlit plant nursery_1749598341.jpg";
import seedlingsHero from "../Images/StockCake-Seedlings Becoming Plants_1749598461.jpg";
import digitalGardenHero from "../Images/StockCake-Growing Digital Life_1749598904.jpg";

const slides = [
  {
    id: 1,
    image: nurseryHero,
    alt: "Sunlit nursery plants",
    title: "Healthy plants for every space",
    text: "Bring home fresh greenery with carefully nurtured nursery plants.",
  },
  {
    id: 2,
    image: seedlingsHero,
    alt: "Young seedlings growing",
    title: "Strong seedlings, ready to thrive",
    text: "Start your gardening journey with healthy seedlings and trusted care.",
  },
  {
    id: 3,
    image: digitalGardenHero,
    alt: "Modern plant nursery experience",
    title: "Easy nursery booking experience",
    text: "Browse, choose, and book plants or services in just a few steps.",
  },
];

const MyCarousel = () => {
  return (
    <section className="bg-green-950">
      <Carousel fade indicators interval={3500}>
        {slides.map((slide) => (
          <Carousel.Item key={slide.id}>
            <div className="relative h-[280px] sm:h-[380px] lg:h-[520px]">
              <img
                className="h-full w-full object-cover"
                src={slide.image}
                alt={slide.alt}
              />
              <div className="absolute inset-0 bg-black/45" />
              <Carousel.Caption className="bottom-8 left-1/2 w-[90%] max-w-3xl -translate-x-1/2 rounded-2xl bg-black/35 px-4 py-4 md:bottom-12 md:px-8 md:py-6">
                <h3 className="mb-2 text-2xl font-bold text-white md:text-4xl">
                  {slide.title}
                </h3>
                <p className="mx-auto max-w-2xl text-sm text-green-50 md:text-lg">
                  {slide.text}
                </p>
              </Carousel.Caption>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </section>
  );
};

export default MyCarousel;
