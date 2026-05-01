import React from "react";
import MyCarousel from "./MyCarousel";
import PlantCategories from "./PlantCategories";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <main>
      <MyCarousel />

      <section className="bg-white py-12 px-6 text-center">
        <h1 className="text-4xl font-bold text-green-800 mb-4">
          Welcome to Our Nursery Booking Site
        </h1>
        <p className="max-w-2xl mx-auto text-gray-600 text-lg mb-6">
          Discover healthy plants, quality seeds, and garden essentials for your
          home and outdoor spaces. Book your favorite plants and nursery services
          with ease.
        </p>
        
      </section>

      <section className="py-10 px-6 bg-green-50">
        <h2 className="text-3xl font-bold text-center text-green-800 mb-8">
          Explore Plant Categories
        </h2>
        <PlantCategories />
      </section>
    </main>
  );
};

export default HomePage;
