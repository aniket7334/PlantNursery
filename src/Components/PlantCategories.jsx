import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const fallbackCategories = [
  {
    id: "indoor-fallback",
    name: "Indoor Plants",
    description: "Beautiful indoor plants for homes and offices.",
    image:
      "https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=800&q=80",
    link: "/indoor",
  },
  {
    id: "outdoor-fallback",
    name: "Outdoor Plants",
    description: "Garden-ready plants for outdoor spaces and landscapes.",
    image:
      "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=800&q=80",
    link: "/outdoor",
  },
  {
    id: "seeds",
    name: "Seeds",
    description: "Fresh vegetable, herb, and flower seeds for home gardens.",
    image:
      "https://images.unsplash.com/photo-1459156212016-c812468e2115?auto=format&fit=crop&w=800&q=80",
    link: "/seeds",
  },
  {
    id: "service",
    name: "Maintenance Service",
    description: "Book watering, trimming, repotting, and plant care support.",
    image:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=800&q=80",
    link: "/booking",
  },
];

const PlantCategories = () => {
  const [categories, setCategories] = useState(fallbackCategories);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/trefle/plants", {
          params: {
            page: 1,
          },
        });

        const plants = response.data?.data || [];

        const indoorPlant = plants[0];
        const outdoorPlant = plants[1];

        const liveCategories = [
          indoorPlant
            ? {
                id: `indoor-${indoorPlant.id}`,
                name: "Indoor Plants",
                description:
                  indoorPlant.common_name ||
                  indoorPlant.scientific_name ||
                  "Browse indoor plants",
                image: fallbackCategories[0].image,
                link: "/indoor",
              }
            : fallbackCategories[0],
          outdoorPlant
            ? {
                id: `outdoor-${outdoorPlant.id}`,
                name: "Outdoor Plants",
                description:
                  outdoorPlant.common_name ||
                  outdoorPlant.scientific_name ||
                  "Browse outdoor plants",
                image: fallbackCategories[1].image,
                link: "/outdoor",
              }
            : fallbackCategories[1],
          fallbackCategories[2],
          fallbackCategories[3],
        ];

        setCategories(liveCategories);
      } catch (fetchError) {
        console.error(
          "Plant category API error:",
          fetchError.response?.status,
          fetchError.response?.data || fetchError.message
        );
        setError("Live plant API failed. Showing backup categories instead.");
        setCategories(fallbackCategories);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-600">Loading categories...</p>;
  }

  return (
    <div>
      {error && <p className="mb-4 text-center text-sm text-red-600">{error}</p>}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="overflow-hidden rounded-2xl bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <img
              src={category.image}
              alt={category.name}
              className="h-56 w-full object-cover"
            />
            <div className="p-5">
              <h3 className="mb-2 text-xl font-semibold text-green-800">
                {category.name}
              </h3>
              <p className="mb-4 text-sm leading-6 text-gray-600">
                {category.description}
              </p>
              <Link
                to={category.link}
                className="inline-block rounded-lg bg-green-700 px-4 py-2 text-white transition hover:bg-green-600"
              >
                Explore
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlantCategories;
