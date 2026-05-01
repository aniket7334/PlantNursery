import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BookingForm from "../Components/BookingForm";

const BookingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("nurseryLoggedIn") === "true";

    if (!isLoggedIn) {
      alert("Please login first to access the booking page.");
      navigate("/login");
    }
  }, [navigate]);

  const isLoggedIn = localStorage.getItem("nurseryLoggedIn") === "true";

  if (!isLoggedIn) {
    return null;
  }

  return (
    <section className="min-h-screen bg-white px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-green-800 mb-4">
            Book Your Plants Maintenance Services
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Fill out the form below to book  nursery services.
            We will contact you shortly to confirm your maintenance details.
          </p>
        </div>

        <BookingForm />
      </div>
    </section>
  );
};

export default BookingPage;
