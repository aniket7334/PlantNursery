import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    const items = [];
    const allKeys = Object.keys(localStorage);

    allKeys.forEach((key) => {
      if (key.startsWith("plant_") || key.startsWith("seed_")) {
        try {
          const itemData = JSON.parse(localStorage.getItem(key));
          items.push({
            id: key,
            ...itemData,
            quantity: 1,
            price: key.startsWith("plant_") ? 299 : 99,
          });
        } catch (error) {
          console.error("Error parsing item:", key, error);
        }
      }
    });

    setCartItems(items);
    // Update cart count based on actual items
    localStorage.setItem("cartCount", items.length);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    // Remove from localStorage
    localStorage.removeItem(id);

    // Remove from state
    const updatedItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedItems);

    // Update cart count to match actual items
    localStorage.setItem("cartCount", updatedItems.length);

    // Dispatch event to update navbar
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleProceed = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    alert(`Proceeding to checkout with total: ₹${calculateTotal()}`);
    navigate("/checkout");
  };

  return (
    <section className="min-h-screen bg-green-50 px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-10 text-center text-4xl font-bold text-green-800">
          Shopping Cart ({cartItems.length})
        </h1>

        {cartItems.length === 0 ? (
          <div className="rounded-lg bg-white p-12 text-center shadow-md">
            <p className="text-xl text-gray-600">Your cart is empty</p>
            <button
              onClick={() => navigate("/")}
              className="mt-6 rounded-lg bg-green-700 px-6 py-3 font-semibold text-white hover:bg-green-600"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="mb-6 flex gap-6 rounded-lg bg-white p-6 shadow-md"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-32 w-32 rounded-lg object-cover"
                  />

                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold text-green-700">
                      {item.name || item.common_name}
                    </h2>
                    <p className="text-gray-600">
                      {item.description || item.scientific_name}
                    </p>
                    <p className="mt-3 text-xl font-bold text-green-800">
                      ₹{item.price}
                    </p>
                  </div>

                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-600 hover:text-red-800 transition"
                      title="Remove"
                    >
                      <FaTrash size={20} />
                    </button>

                    <div className="flex items-center gap-3 rounded-lg border border-gray-300 bg-gray-100">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="px-3 py-2 font-bold text-green-700 hover:bg-gray-200"
                      >
                        -
                      </button>
                      <span className="px-4 font-semibold">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="px-3 py-2 font-bold text-green-700 hover:bg-gray-200"
                      >
                        +
                      </button>
                    </div>

                    <p className="text-lg font-bold text-green-800">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-lg bg-white p-6 shadow-md h-fit">
              <h3 className="mb-6 text-2xl font-bold text-green-800">
                Order Summary
              </h3>

              <div className="mb-4 border-b border-gray-200 pb-4">
                <div className="mb-3 flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-semibold">₹{calculateTotal().toFixed(2)}</span>
                </div>
                <div className="mb-3 flex justify-between">
                  <span className="text-gray-600">Shipping:</span>
                  <span className="font-semibold">₹50</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax:</span>
                  <span className="font-semibold">
                    ₹{(calculateTotal() * 0.1).toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="mb-6 flex justify-between border-t border-gray-200 pt-4 text-xl font-bold">
                <span>Total:</span>
                <span className="text-green-800">
                  ₹{(calculateTotal() + 50 + calculateTotal() * 0.1).toFixed(2)}
                </span>
              </div>

              <button
                onClick={handleProceed}
                className="w-full rounded-lg bg-green-700 px-6 py-3 font-bold text-white transition hover:bg-green-600"
              >
                Proceed to Checkout
              </button>

              <button
                onClick={() => navigate("/")}
                className="mt-3 w-full rounded-lg border-2 border-green-700 px-6 py-3 font-bold text-green-700 transition hover:bg-green-50"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CartPage;