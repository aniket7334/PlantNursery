import React, { useEffect, useState } from "react";
import axios from "axios";

const fallbackPlantImage =
  "https://via.placeholder.com/400x300?text=Plant+Image";

const IndoorPage = () => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchIndoorPlants = async () => {
      try {
        const responses = await Promise.all([
          axios.get("/api/trefle/plants", { params: { page: 1 } }),
          axios.get("/api/trefle/plants", { params: { page: 2 } }),
        ]);

        const mergedPlants = responses.flatMap(
          (response) => response.data?.data || [],
        );

        setPlants(mergedPlants.slice(0, 18));
      } catch (fetchError) {
        console.error("Indoor API error:", fetchError.response?.data || fetchError.message);
        setError(
          `Failed to fetch indoor plants. Status: ${
            fetchError.response?.status || "unknown"
          }`
        );
      } finally {
        setLoading(false);
      }
    };

    fetchIndoorPlants();
  }, []);

  return (
    <section className="min-h-screen bg-green-50 px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-4 text-center text-4xl font-bold text-green-800">
          Indoor Plants
        </h1>
        <p className="mb-10 text-center text-gray-600">
          Explore a larger collection of plants loaded through the Trefle API proxy.
        </p>

        {loading && <p className="text-center text-gray-600">Loading indoor plants...</p>}
        {error && <p className="text-center text-red-600">{error}</p>}

       <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
  {plants.map((plant) => (
    <div key={plant.id} className="overflow-hidden rounded-xl bg-green-50 shadow-md">
      <img
        src={plant.image_url || fallbackPlantImage}
        alt={plant.common_name || "Plant"}
        className="h-64 w-full object-cover"
      />
      <div className="p-5">
        <h2 className="mb-2 text-2xl font-semibold text-green-700">
          {plant.common_name || plant.scientific_name}
        </h2>
        <p className="text-gray-600">
          {plant.scientific_name || "Scientific name not available"}
        </p>
        <p className="text-gray-600">
                  {plant.price ? `₹${plant.price.toFixed(2)}` : "Price not available"}
                </p>
        <button
          onClick={() => {
            const cartCount = parseInt(localStorage.getItem("cartCount") || "0");
            localStorage.setItem("cartCount", cartCount + 1);
            localStorage.setItem(`plant_${plant.id}`, JSON.stringify(plant));
            window.dispatchEvent(new Event("cartUpdated"));
            alert("Added to cart!");
          }}
          className="mt-4 w-full rounded-lg bg-green-700 px-4 py-2 font-semibold text-white transition hover:bg-green-600"
        >
          Add to Cart
        </button>
      </div>
    </div>
  ))}
</div>
      </div>
    </section>
  );
};

export default IndoorPage;
