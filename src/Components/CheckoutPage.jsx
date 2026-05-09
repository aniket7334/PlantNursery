import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../config/api";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [upiId, setUpiId] = useState("");
  const [loading, setLoading] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  });
  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    email: "",
    pincode: "",
    city: "",
    state: "",
    addressLine: "",
    landmark: "",
  });

  useEffect(() => {
    const items = [];
    Object.keys(localStorage).forEach((key) => {
      if (
        key.startsWith("plant_") ||
        key.startsWith("seed_") ||
        key.startsWith("accessory_")
      ) {
        try {
          const itemData = JSON.parse(localStorage.getItem(key));
          items.push({
            id: key,
            ...itemData,
            quantity: 1,
            price: key.startsWith("plant_")
              ? 299
              : key.startsWith("seed_")
                ? 99
                : itemData.price,
          });
        } catch (error) {
          console.error("Error:", error);
        }
      }
    });
    setCartItems(items);
  }, []);

  const calculateSubtotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const calculateTotal = () =>
    calculateSubtotal() + 50 + calculateSubtotal() * 0.1;

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    const { fullName, phone, email, pincode, city, state, addressLine } = address;
    if (!fullName || !phone || !email || !pincode || !city || !state || !addressLine) {
      alert("Please fill all required fields!");
      return;
    }
    setStep(2);
  };

  const clearCart = () => {
    Object.keys(localStorage).forEach((key) => {
      if (
        key.startsWith("plant_") ||
        key.startsWith("seed_") ||
        key.startsWith("accessory_")
      ) {
        localStorage.removeItem(key);
      }
    });
    localStorage.setItem("cartCount", 0);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();

    if (!paymentMethod) {
      alert("Please select a payment method!");
      return;
    }
    if (paymentMethod === "upi" && !upiId) {
      alert("Please enter UPI ID!");
      return;
    }
    if (paymentMethod === "card") {
      const { cardNumber, cardName, expiry, cvv } = cardDetails;
      if (!cardNumber || !cardName || !expiry || !cvv) {
        alert("Please fill all card details!");
        return;
      }
    }

    // Build order data
    const orderData = {
      customer: {
        name: address.fullName,
        email: address.email,
        phone: address.phone,
      },
      deliveryAddress: {
        addressLine: address.addressLine,
        landmark: address.landmark,
        city: address.city,
        state: address.state,
        pincode: address.pincode,
      },
      items: cartItems.map((item) => ({
        productId: String(item.id),  // convert to string
        name: item.name || item.common_name || "Unknown",
        image: item.image || "",
        price: item.price,
        quantity: item.quantity,
        category: String(item.id).startsWith("plant_")
          ? "indoor"
          : String(item.id).startsWith("seed_")
            ? "seeds"
            : "accessories",
      })),
      subtotal: calculateSubtotal(),
      shippingCharge: 50,
      tax: parseFloat((calculateSubtotal() * 0.1).toFixed(2)),
      totalAmount: parseFloat(calculateTotal().toFixed(2)),
      paymentMethod,
      paymentStatus: paymentMethod === "cod" ? "pending" : "paid",
      upiId: upiId || "",
    };

    setLoading(true);

    try {
      const response = await fetch(apiUrl("/api/orders"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (data.success) {
        clearCart();
        setStep(3);
      } else {
        alert("Failed to place order: " + data.message);
      }
    } catch (error) {
      console.error("Order error:", error);
      alert("Server error! Please check the backend API URL.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-green-50 dark:bg-gray-900 px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-8 text-center text-4xl font-bold text-green-800 dark:text-green-400">
          Checkout
        </h1>

        {/* Stepper */}
        <div className="mb-10 flex items-center justify-center gap-4">
          {["Address", "Payment", "Success"].map((label, index) => (
            <React.Fragment key={label}>
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full font-bold text-white ${step > index + 1
                      ? "bg-green-500"
                      : step === index + 1
                        ? "bg-green-700 dark:bg-green-600"
                        : "bg-gray-300 dark:bg-gray-600"
                    }`}
                >
                  {step > index + 1 ? "✓" : index + 1}
                </div>
                <span className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  {label}
                </span>
              </div>
              {index < 2 && (
                <div
                  className={`h-1 w-16 rounded ${step > index + 1
                      ? "bg-green-500"
                      : "bg-gray-300 dark:bg-gray-600"
                    }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">

            {/* STEP 1 - Address */}
            {step === 1 && (
              <div className="rounded-xl bg-white dark:bg-gray-800 p-8 shadow-md">
                <h2 className="mb-6 text-2xl font-bold text-green-800 dark:text-green-400">
                  Delivery Address
                </h2>
                <form onSubmit={handleAddressSubmit} className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 md:col-span-1">
                    <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="Enter full name"
                      value={address.fullName}
                      onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-4 py-3 outline-none focus:border-green-500"
                    />
                  </div>

                  <div className="col-span-2 md:col-span-1">
                    <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      placeholder="Enter phone number"
                      value={address.phone}
                      onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-4 py-3 outline-none focus:border-green-500"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      placeholder="Enter email address"
                      value={address.email}
                      onChange={(e) => setAddress({ ...address, email: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-4 py-3 outline-none focus:border-green-500"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Address Line *
                    </label>
                    <textarea
                      rows={3}
                      placeholder="House No, Street, Area"
                      value={address.addressLine}
                      onChange={(e) => setAddress({ ...address, addressLine: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-4 py-3 outline-none focus:border-green-500"
                    />
                  </div>

                  <div className="col-span-2 md:col-span-1">
                    <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Landmark
                    </label>
                    <input
                      type="text"
                      placeholder="Near landmark (optional)"
                      value={address.landmark}
                      onChange={(e) => setAddress({ ...address, landmark: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-4 py-3 outline-none focus:border-green-500"
                    />
                  </div>

                  <div className="col-span-2 md:col-span-1">
                    <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Pincode *
                    </label>
                    <input
                      type="text"
                      placeholder="Enter pincode"
                      value={address.pincode}
                      onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-4 py-3 outline-none focus:border-green-500"
                    />
                  </div>

                  <div className="col-span-2 md:col-span-1">
                    <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      City *
                    </label>
                    <input
                      type="text"
                      placeholder="Enter city"
                      value={address.city}
                      onChange={(e) => setAddress({ ...address, city: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-4 py-3 outline-none focus:border-green-500"
                    />
                  </div>

                  <div className="col-span-2 md:col-span-1">
                    <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      State *
                    </label>
                    <select
                      value={address.state}
                      onChange={(e) => setAddress({ ...address, state: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-4 py-3 outline-none focus:border-green-500"
                    >
                      <option value="">Select State</option>
                      <option>Maharashtra</option>
                      <option>Delhi</option>
                      <option>Karnataka</option>
                      <option>Tamil Nadu</option>
                      <option>Gujarat</option>
                      <option>Rajasthan</option>
                      <option>Uttar Pradesh</option>
                      <option>West Bengal</option>
                      <option>Telangana</option>
                      <option>Kerala</option>
                      <option>Punjab</option>
                      <option>Madhya Pradesh</option>
                      <option>Bihar</option>
                      <option>Haryana</option>
                      <option>Andhra Pradesh</option>
                    </select>
                  </div>

                  <div className="col-span-2">
                    <button
                      type="submit"
                      className="w-full rounded-lg bg-green-700 dark:bg-green-600 px-6 py-3 font-bold text-white transition hover:bg-green-600"
                    >
                      Continue to Payment →
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* STEP 2 - Payment */}
            {step === 2 && (
              <div className="rounded-xl bg-white dark:bg-gray-800 p-8 shadow-md">
                <h2 className="mb-6 text-2xl font-bold text-green-800 dark:text-green-400">
                  Payment Method
                </h2>

                <form onSubmit={handlePaymentSubmit} className="flex flex-col gap-4">

                  {/* COD */}
                  <label className={`flex cursor-pointer items-center gap-4 rounded-xl border-2 p-4 transition ${paymentMethod === "cod" ? "border-green-600 bg-green-50 dark:bg-gray-700" : "border-gray-200 dark:border-gray-600"}`}>
                    <input type="radio" name="payment" value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                      className="accent-green-600 h-5 w-5"
                    />
                    <span className="text-3xl">💵</span>
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-white">Cash on Delivery</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Pay when your order arrives</p>
                    </div>
                  </label>

                  {/* UPI */}
                  <label className={`flex cursor-pointer items-center gap-4 rounded-xl border-2 p-4 transition ${paymentMethod === "upi" ? "border-green-600 bg-green-50 dark:bg-gray-700" : "border-gray-200 dark:border-gray-600"}`}>
                    <input type="radio" name="payment" value="upi"
                      checked={paymentMethod === "upi"}
                      onChange={() => setPaymentMethod("upi")}
                      className="accent-green-600 h-5 w-5"
                    />
                    <span className="text-3xl">📱</span>
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-white">UPI Payment</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Pay via GPay, PhonePe, Paytm</p>
                    </div>
                  </label>

                  {paymentMethod === "upi" && (
                    <div className="ml-4 rounded-lg border border-gray-200 dark:border-gray-600 p-4">
                      <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Enter UPI ID</label>
                      <input
                        type="text"
                        placeholder="yourname@upi"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-4 py-3 outline-none focus:border-green-500"
                      />
                    </div>
                  )}

                  {/* Card */}
                  <label className={`flex cursor-pointer items-center gap-4 rounded-xl border-2 p-4 transition ${paymentMethod === "card" ? "border-green-600 bg-green-50 dark:bg-gray-700" : "border-gray-200 dark:border-gray-600"}`}>
                    <input type="radio" name="payment" value="card"
                      checked={paymentMethod === "card"}
                      onChange={() => setPaymentMethod("card")}
                      className="accent-green-600 h-5 w-5"
                    />
                    <span className="text-3xl">💳</span>
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-white">Credit / Debit Card</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Visa, Mastercard, RuPay</p>
                    </div>
                  </label>

                  {paymentMethod === "card" && (
                    <div className="ml-4 grid grid-cols-2 gap-4 rounded-lg border border-gray-200 dark:border-gray-600 p-4">
                      <div className="col-span-2">
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Card Number</label>
                        <input type="text" placeholder="1234 5678 9012 3456" maxLength={19}
                          value={cardDetails.cardNumber}
                          onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
                          className="w-full rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-4 py-3 outline-none focus:border-green-500"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Name on Card</label>
                        <input type="text" placeholder="Enter cardholder name"
                          value={cardDetails.cardName}
                          onChange={(e) => setCardDetails({ ...cardDetails, cardName: e.target.value })}
                          className="w-full rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-4 py-3 outline-none focus:border-green-500"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Expiry Date</label>
                        <input type="text" placeholder="MM/YY" maxLength={5}
                          value={cardDetails.expiry}
                          onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                          className="w-full rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-4 py-3 outline-none focus:border-green-500"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">CVV</label>
                        <input type="password" placeholder="***" maxLength={3}
                          value={cardDetails.cvv}
                          onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                          className="w-full rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-4 py-3 outline-none focus:border-green-500"
                        />
                      </div>
                    </div>
                  )}

                  {/* Net Banking */}
                  <label className={`flex cursor-pointer items-center gap-4 rounded-xl border-2 p-4 transition ${paymentMethod === "netbanking" ? "border-green-600 bg-green-50 dark:bg-gray-700" : "border-gray-200 dark:border-gray-600"}`}>
                    <input type="radio" name="payment" value="netbanking"
                      checked={paymentMethod === "netbanking"}
                      onChange={() => setPaymentMethod("netbanking")}
                      className="accent-green-600 h-5 w-5"
                    />
                    <span className="text-3xl">🏦</span>
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-white">Net Banking</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">All major banks supported</p>
                    </div>
                  </label>

                  {paymentMethod === "netbanking" && (
                    <div className="ml-4 rounded-lg border border-gray-200 dark:border-gray-600 p-4">
                      <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Select Bank</label>
                      <select className="w-full rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-4 py-3 outline-none focus:border-green-500">
                        <option value="">Choose your bank</option>
                        <option>State Bank of India</option>
                        <option>HDFC Bank</option>
                        <option>ICICI Bank</option>
                        <option>Axis Bank</option>
                        <option>Kotak Mahindra Bank</option>
                        <option>Punjab National Bank</option>
                        <option>Bank of Baroda</option>
                      </select>
                    </div>
                  )}

                  <div className="mt-4 flex gap-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="w-full rounded-lg border-2 border-green-700 dark:border-green-500 px-6 py-3 font-bold text-green-700 dark:text-green-400 transition hover:bg-green-50 dark:hover:bg-gray-700"
                    >
                      ← Back
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full rounded-lg bg-green-700 dark:bg-green-600 px-6 py-3 font-bold text-white transition hover:bg-green-600 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {loading ? "Placing Order..." : `Place Order ₹${calculateTotal().toFixed(2)}`}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* STEP 3 - Success */}
            {step === 3 && (
              <div className="rounded-xl bg-white dark:bg-gray-800 p-12 text-center shadow-md">
                <div className="mb-6 text-8xl">🎉</div>
                <h2 className="mb-4 text-3xl font-bold text-green-700 dark:text-green-400">
                  Order Placed Successfully!
                </h2>
                <p className="mb-2 text-gray-600 dark:text-gray-400">
                  Thank you, <strong>{address.fullName}</strong>!
                </p>
                <p className="mb-6 text-gray-600 dark:text-gray-400">
                  Your order will be delivered to{" "}
                  <strong>{address.city}, {address.state}</strong>
                </p>
                <div className="mb-6 rounded-lg bg-green-50 dark:bg-gray-700 p-4">
                  <p className="text-lg font-bold text-green-800 dark:text-green-400">
                    Order Total: ₹{calculateTotal().toFixed(2)}
                  </p>

                  {paymentMethod === "cod" && (
                    <div className="mt-3 rounded-lg bg-yellow-50 dark:bg-yellow-900 p-3">
                      <p className="font-semibold text-yellow-700 dark:text-yellow-300">
                        💵 Cash on Delivery
                      </p>
                      <p className="text-sm text-yellow-600 dark:text-yellow-400">
                        Please keep ₹{calculateTotal().toFixed(2)} ready at delivery
                      </p>
                    </div>
                  )}
                  {paymentMethod === "upi" && (
                    <div className="mt-3 rounded-lg bg-blue-50 dark:bg-blue-900 p-3">
                      <p className="font-semibold text-blue-700 dark:text-blue-300">
                        📱 UPI Payment - {upiId}
                      </p>
                      <p className="text-sm text-blue-600 dark:text-blue-400">
                        Payment confirmed via UPI
                      </p>
                    </div>
                  )}
                  {paymentMethod === "card" && (
                    <div className="mt-3 rounded-lg bg-purple-50 dark:bg-purple-900 p-3">
                      <p className="font-semibold text-purple-700 dark:text-purple-300">
                        💳 Card Payment confirmed
                      </p>
                    </div>
                  )}
                  {paymentMethod === "netbanking" && (
                    <div className="mt-3 rounded-lg bg-green-100 dark:bg-green-900 p-3">
                      <p className="font-semibold text-green-700 dark:text-green-300">
                        🏦 Net Banking payment confirmed
                      </p>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => navigate("/")}
                  className="rounded-lg bg-green-700 dark:bg-green-600 px-8 py-3 font-bold text-white transition hover:bg-green-600"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </div>

          {/* Right - Order Summary */}
          {step !== 3 && (
            <div className="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-md h-fit">
              <h3 className="mb-4 text-xl font-bold text-green-800 dark:text-green-400">
                Order Summary
              </h3>
              <div className="mb-4 max-h-64 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.id} className="mb-3 flex items-center gap-3 border-b dark:border-gray-600 pb-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-12 w-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-800 dark:text-white">
                        {item.name || item.common_name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        ₹{item.price} x {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t dark:border-gray-600 pt-4 text-sm">
                <div className="mb-2 flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal</span>
                  <span>₹{calculateSubtotal().toFixed(2)}</span>
                </div>
                <div className="mb-2 flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Shipping</span>
                  <span>₹50</span>
                </div>
                <div className="mb-2 flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Tax (10%)</span>
                  <span>₹{(calculateSubtotal() * 0.1).toFixed(2)}</span>
                </div>
                <div className="mt-3 flex justify-between border-t dark:border-gray-600 pt-3 text-lg font-bold text-green-800 dark:text-green-400">
                  <span>Total</span>
                  <span>₹{calculateTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CheckoutPage;
