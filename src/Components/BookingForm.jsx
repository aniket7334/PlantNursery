import React, { useState } from "react";

const BookingForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    category: "Indoor Plants",
    bookingDate: "",
    quantity: 1,
    address: "",
    notes: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Booking submitted successfully!");
    console.log("Booking Data:", formData);

    setFormData({
      fullName: "",
      email: "",
      phone: "",
      category: "Indoor Plants",
      bookingDate: "",
      quantity: 1,
      address: "",
      notes: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-green-50 shadow-lg rounded-2xl p-8 grid gap-6 md:grid-cols-2"
    >
      <div>
        <label className="block text-gray-700 font-medium mb-2">
          Full Name
        </label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Enter your full name"
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none"
          required
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-2">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none"
          required
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-2">
          Phone Number
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Enter your phone number"
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none"
          required
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-2">
          Select Maintenance Category
        </label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none"
        >
          <option value="">Select</option>
          <option>Garden Accessories</option>
          <option>Nursery Maintenance Service</option>
        </select>
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-2">
          Service Date
        </label>
        <input
          type="date"
          name="bookingDate"
          value={formData.bookingDate}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none"
          required
        />
      </div>

      {/* <div>
        <label className="block text-gray-700 font-medium mb-2">
          Quantity
        </label>
        <input
          type="number"
          name="quantity"
          min="1"
          value={formData.quantity}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none"
          required
        />
      </div> */}

      <div className="md:col-span-2">
        <label className="block text-gray-700 font-medium mb-2">
          Address
        </label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          rows="3"
          placeholder="Enter your address"
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none"
          required
        ></textarea>
      </div>

      <div className="md:col-span-2">
        <label className="block text-gray-700 font-medium mb-2">
          Additional Notes
        </label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows="4"
          placeholder="Any extra details or special requests"
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none"
        ></textarea>
      </div>

      <div className="md:col-span-2 text-center">
        <button
          type="submit"
          className="bg-green-700 text-white px-8 py-3 rounded-lg hover:bg-green-600 transition"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default BookingForm;
