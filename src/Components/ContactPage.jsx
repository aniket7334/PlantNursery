import React, { useState } from "react";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaWhatsapp,
  FaFacebook,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = formData;
    if (!name || !email || !message) {
      alert("Please fill all required fields!");
      return;
    }
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  const contactInfo = [
    {
      icon: <FaPhone className="text-2xl text-green-600" />,
      title: "Phone",
      details: ["+91 98765 43210", "+91 91194 06091"],
      bg: "bg-green-50 dark:bg-gray-700",
    },
    {
      icon: <FaEnvelope className="text-2xl text-green-600" />,
      title: "Email",
      details: ["support@growhigh.com", "info@growhigh.com"],
      bg: "bg-green-50 dark:bg-gray-700",
    },
    {
      icon: <FaMapMarkerAlt className="text-2xl text-green-600" />,
      title: "Address",
      details: ["Green Valley Nursery,", "Nandanvan, Nagpur, Maharashtra"],
      bg: "bg-green-50 dark:bg-gray-700",
    },
    {
      icon: <FaClock className="text-2xl text-green-600" />,
      title: "Working Hours",
      details: ["Mon - Sat: 8:00 AM - 7:00 PM", "Sunday: 10:00 AM - 5:00 PM"],
      bg: "bg-green-50 dark:bg-gray-700",
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-900">

      {/* Hero Banner */}
      <section
        className="relative h-72 flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-green-900 bg-opacity-65" />
        <div className="relative text-center text-white px-6">
          <h1 className="text-5xl font-bold mb-3">Contact Us</h1>
          <p className="text-xl text-green-100">
            We'd love to hear from you. Reach out anytime!
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="px-6 py-16 bg-green-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((info) => (
            <div
              key={info.title}
              className={`${info.bg} rounded-xl p-6 shadow-md hover:shadow-lg transition text-center`}
            >
              <div className="flex justify-center mb-3">{info.icon}</div>
              <h3 className="text-lg font-bold text-green-800 dark:text-green-400 mb-2">
                {info.title}
              </h3>
              {info.details.map((detail, i) => (
                <p key={i} className="text-sm text-gray-600 dark:text-gray-400">
                  {detail}
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Form + Map Section */}
      <section className="px-6 py-16 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">

          {/* Contact Form */}
          <div className="bg-green-50 dark:bg-gray-800 rounded-2xl shadow-md p-8">
            <h2 className="text-3xl font-bold text-green-800 dark:text-green-400 mb-2">
              Send Us a Message
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8">
              Fill the form and our team will get back to you within 24 hours.
            </p>

            {submitted && (
              <div className="mb-6 rounded-lg bg-green-100 dark:bg-green-900 p-4 text-center text-green-700 dark:text-green-300 font-semibold">
                ✅ Message sent successfully! We'll get back to you soon.
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-4 py-3 outline-none focus:border-green-500 transition"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-4 py-3 outline-none focus:border-green-500 transition"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email Address *
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-4 py-3 outline-none focus:border-green-500 transition"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Subject
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-4 py-3 outline-none focus:border-green-500 transition"
                >
                  <option value="">Select a subject</option>
                  <option>Plant Enquiry</option>
                  <option>Order Support</option>
                  <option>Delivery Issue</option>
                  <option>Booking Help</option>
                  <option>Plant Care Advice</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Message *
                </label>
                <textarea
                  rows={5}
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-4 py-3 outline-none focus:border-green-500 transition resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-green-700 dark:bg-green-600 px-6 py-3 font-bold text-white transition hover:bg-green-600 dark:hover:bg-green-500"
              >
                Send Message 📩
              </button>
            </form>
          </div>

          {/* Map + Social */}
          <div className="flex flex-col gap-8">

            {/* Google Map */}
            <div className="rounded-2xl overflow-hidden shadow-md h-80">
              <iframe
                title="Nursery Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3781.472131235024!2d73.7836!3d18.6298!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDM3JzQ3LjMiTiA3M8KwNDYnNTYuMiJF!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              />
            </div>

            {/* WhatsApp */}
            <div className="rounded-2xl bg-green-50 dark:bg-gray-800 shadow-md p-6">
              <h3 className="text-xl font-bold text-green-800 dark:text-green-400 mb-3">
                Chat with Us
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                Have a quick question? Chat with us directly on WhatsApp for faster support.
              </p>
              <a
                href="https://wa.me/919119406091"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full rounded-lg bg-green-500 hover:bg-green-400 px-6 py-3 font-bold text-white transition"
              >
                <FaWhatsapp className="text-2xl" />
                Chat on WhatsApp
              </a>
            </div>

            {/* Social Media */}
            <div className="rounded-2xl bg-green-50 dark:bg-gray-800 shadow-md p-6">
              <h3 className="text-xl font-bold text-green-800 dark:text-green-400 mb-4">
                Follow Us
              </h3>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-500 transition"
                >
                  <FaFacebook /> Facebook
                </a>
                <a
                  href="#"
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-pink-500 px-4 py-3 font-semibold text-white hover:bg-pink-400 transition"
                >
                  <FaInstagram /> Instagram
                </a>
                <a
                  href="#"
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-sky-500 px-4 py-3 font-semibold text-white hover:bg-sky-400 transition"
                >
                  <FaTwitter /> Twitter
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Banner */}
      <section className="px-6 py-12 bg-green-700 dark:bg-green-900 text-center">
        <h2 className="text-3xl font-bold text-white mb-3">
          Visit Our Nursery Today!
        </h2>
        <p className="text-green-100 text-lg mb-6">
          Come and explore our wide collection of plants in person.
        </p>
        <a
          href="https://maps.google.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-full bg-white px-8 py-3 font-bold text-green-800 hover:bg-green-100 transition"
        >
          Get Directions 📍
        </a>
      </section>

    </div>
  );
};

export default ContactPage;