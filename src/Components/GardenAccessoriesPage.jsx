import React from "react";
import { gardenAccessories } from "../data/catalogData";

    

const GardenAccessoriesPage = () => {
    const [cartCount, setCartCount] = React.useState(0);

    const addToCart = (item) => {
        const count = parseInt(localStorage.getItem("cartCount") || "0");
        localStorage.setItem("cartCount", count + 1);
        localStorage.setItem(`accessory_${item.id}`, JSON.stringify(item));
        window.dispatchEvent(new Event("cartUpdated"));
        alert(`${item.name} added to cart!`);
    };

    return (
        <section className="min-h-screen bg-green-50 px-6 py-12">
            <div className="mx-auto max-w-6xl">
                <h1 className="mb-4 text-center text-4xl font-bold text-green-800">
                    Garden Accessories
                </h1>
                <p className="mb-10 text-center text-gray-600">
                    Essential tools and equipment for your gardening needs.
                </p>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {gardenAccessories.map((item) => (
                        <div
                            key={item.id}
                            className="overflow-hidden rounded-xl bg-white shadow-md hover:shadow-lg transition"
                        >
                            <img
                                src={item.image}
                                alt={item.name}
                                className="h-48 w-full object-cover"
                            />
                            <div className="p-5">
                                <h2 className="mb-2 text-xl font-semibold text-green-700">
                                    {item.name}
                                </h2>
                                <p className="mb-3 text-sm text-gray-600">
                                    {item.description}
                                </p>
                                <p className="mb-4 text-2xl font-bold text-green-800">
                                    ₹{item.price}
                                </p>
                                <button
                                    onClick={() => addToCart(item)}
                                    className="w-full rounded-lg bg-green-700 px-4 py-2 font-semibold text-white transition hover:bg-green-600"
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

export default GardenAccessoriesPage;