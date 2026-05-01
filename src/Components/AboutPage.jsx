import React from "react";
import { FaLeaf, FaSeedling, FaHandsHelping, FaTruck, FaAward, FaUsers } from "react-icons/fa";

const AboutPage = () => {
  const stats = [
    { number: "5000+", label: "Happy Customers" },
    { number: "200+", label: "Plant Varieties" },
    { number: "10+", label: "Years Experience" },
    { number: "50+", label: "Expert Staff" },
  ];

  const values = [
    {
      icon: <FaLeaf className="text-3xl text-green-600" />,
      title: "Quality Plants",
      description: "Every plant is carefully grown and inspected before reaching your home.",
    },
    {
      icon: <FaSeedling className="text-3xl text-green-600" />,
      title: "Eco Friendly",
      description: "We use sustainable practices to protect our environment for future generations.",
    },
    {
      icon: <FaHandsHelping className="text-3xl text-green-600" />,
      title: "Expert Support",
      description: "Our plant experts are always ready to guide you on plant care and gardening.",
    },
    {
      icon: <FaTruck className="text-3xl text-green-600" />,
      title: "Fast Delivery",
      description: "We deliver fresh plants safely to your doorstep with careful packaging.",
    },
    {
      icon: <FaAward className="text-3xl text-green-600" />,
      title: "Award Winning",
      description: "Recognized as the best nursery in the region for quality and service.",
    },
    {
      icon: <FaUsers className="text-3xl text-green-600" />,
      title: "Community",
      description: "We build a community of plant lovers who share tips and grow together.",
    },
  ];

  const team = [
    {
      name: "Aniket Bante",
      role: "Founder & Head Botanist",
      image: "../assets/my image.jpg",
      bio: "15+ years of experience in horticulture and plant science.",
    },
    {
      name: "Harshal Halmare",
      role: "Garden Designer",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      bio: "Specializes in creating beautiful indoor and outdoor garden spaces.",
    },
    {
      name: "Amit Kulkarni",
      role: "Plant Care Expert",
      image: "https://randomuser.me/api/portraits/men/56.jpg",
      bio: "Expert in soil science and organic plant nutrition.",
    },
    {
      name: "Sneha Joshi",
      role: "Customer Relations",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      bio: "Dedicated to ensuring every customer has a great experience.",
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-900">

      {/* Hero Section */}
      <section
        className="relative h-96 flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-green-900 bg-opacity-60" />
        <div className="relative text-center text-white px-6">
          <h1 className="text-5xl font-bold mb-4">About Grow High Nursery</h1>
          <p className="text-xl text-green-100 max-w-2xl mx-auto">
            Bringing nature closer to every home since 2014
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="px-6 py-16 bg-green-50 dark:bg-gray-800">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-green-800 dark:text-green-400 mb-6">
              Our Story
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-8 mb-4">
              Grow High Nursery started in 2014 with a simple mission — to make
              gardening accessible and enjoyable for everyone. What began as a
              small plant shop has grown into one of the most trusted nurseries
              in Maharashtra.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-8 mb-4">
              We believe that every home deserves a touch of green. From rare
              indoor plants to seasonal seeds, we offer over 200 varieties
              carefully selected by our expert botanists.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-8">
              Our team is passionate about plants and people. We not only sell
              plants but also guide our customers on how to care for them and
              create beautiful green spaces.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=800&q=80"
              alt="Our Nursery"
              className="w-full h-80 object-cover"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-6 py-16 bg-green-700 dark:bg-green-900">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-5xl font-bold text-white mb-2">{stat.number}</p>
              <p className="text-green-200 text-lg">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values Section */}
      <section className="px-6 py-16 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-green-800 dark:text-green-400 text-center mb-4">
            Why Choose Us
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12">
            We are committed to providing the best plant experience
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-green-50 dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition"
              >
                <div className="mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-green-700 dark:text-green-400 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="px-6 py-16 bg-green-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-green-800 dark:text-green-400 text-center mb-4">
            Meet Our Team
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12">
            The passionate people behind Grow High Nursery
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <div
                key={member.name}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition text-center"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-56 object-cover"
                />
                <div className="p-5">
                  <h3 className="text-lg font-bold text-green-700 dark:text-green-400 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm text-green-600 dark:text-green-500 font-medium mb-2">
                    {member.role}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="px-6 py-16 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-green-800 dark:text-green-400 mb-6">
            Our Mission
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 leading-9">
            "To inspire and empower every person to grow their own green space —
            whether it's a single pot on a balcony or a full garden — and to
            make the world a greener, healthier, and happier place."
          </p>
          <div className="mt-10">
            <FaLeaf className="text-6xl text-green-500 mx-auto" />
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutPage;