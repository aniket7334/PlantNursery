import React from "react";
import { seeds } from "../data/catalogData";
  
const SeedsPage = () => {
  return (
    <section className="min-h-screen bg-green-50 dark:bg-gray-900 px-6 py-12">
      <div className="max-w-6xl mx-auto">
       <h1 className="text-4xl font-bold text-green-800 dark:text-green-400 text-center mb-4">
          Seeds Collection
        </h1>
       <p className="text-center text-gray-600 dark:text-gray-400 mb-10">
          Start your growing journey with fresh, healthy, and reliable seeds.
        </p>

       <div className="grid gap-8 md:grid-cols-3">
  {seeds.map((seed) => (
    <div key={seed.id} className="bg-white dark:bg-gray-300 rounded-xl shadow-md overflow-hidden">
      <img
        src={seed.image}
        alt={seed.name}
        className="w-full h-64 object-cover"
      />
      <div className="p-5">
        <h2 className="text-2xl font-semibold text-green-700 dark:text-green-400 mb-2">
          {seed.name}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">{seed.description}</p>
         <p className="text-2xl font-bold text-green-800 dark:text-green-400 mb-4"> ₹{seed.price.toFixed(2)}</p>
        <button
          onClick={() => {
            const cartCount = parseInt(localStorage.getItem("cartCount") || "0");
            localStorage.setItem("cartCount", cartCount + 1);
            localStorage.setItem(`seed_${seed.id}`, JSON.stringify(seed));
            window.dispatchEvent(new Event("cartUpdated"));
            alert("Added to cart!");
          }}
          className="w-full rounded-lg bg-green-700 dark:bg-green-600 px-4 py-2 font-semibold text-white transition hover:bg-green-600 dark:hover:bg-green-500"
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

export default SeedsPage;
