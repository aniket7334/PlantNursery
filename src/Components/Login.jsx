import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("nurseryLoggedIn") === "true";

    if (isLoggedIn) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const handleRegisterChange = (event) => {
    const { name, value } = event.target;
    setRegisterData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleLoginChange = (event) => {
    const { name, value } = event.target;
    setLoginData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleRegisterSubmit = (event) => {
    event.preventDefault();

    const user = {
      name: registerData.name,
      email: registerData.email,
      password: registerData.password,
    };

    localStorage.setItem("nurseryUser", JSON.stringify(user));
    localStorage.setItem("nurseryLoggedIn", "true");
    alert("Registration successful.");

    setRegisterData({
      name: "",
      email: "",
      password: "",
    });

    navigate("/", { replace: true });
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();

    const savedUser = JSON.parse(localStorage.getItem("nurseryUser"));

    if (!savedUser) {
      alert("No user found. Please register first.");
      setIsRegisterMode(true);
      return;
    }

    if (
      savedUser.email === loginData.email &&
      savedUser.password === loginData.password
    ) {
      localStorage.setItem("nurseryLoggedIn", "true");
      alert(`Welcome back, ${savedUser.name}`);
      setLoginData({
        email: "",
        password: "",
      });
      navigate("/", { replace: true });
    } else {
      alert("Invalid email or password.");
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-green-50 px-6 py-12">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-green-800">
            {isRegisterMode ? "Create Account" : "Welcome Back"}
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            {isRegisterMode
              ? "Register first to book plants and services."
              : "Login to manage your nursery bookings and orders."}
          </p>
        </div>

        {isRegisterMode ? (
          <form onSubmit={handleRegisterSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={registerData.name}
                onChange={handleRegisterChange}
                placeholder="Enter your full name"
                className="w-full rounded-lg border border-gray-300 p-3 focus:border-green-600 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={registerData.email}
                onChange={handleRegisterChange}
                placeholder="Enter your email"
                className="w-full rounded-lg border border-gray-300 p-3 focus:border-green-600 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={registerData.password}
                onChange={handleRegisterChange}
                placeholder="Create a password"
                className="w-full rounded-lg border border-gray-300 p-3 focus:border-green-600 focus:outline-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-green-700 p-3 font-semibold text-white transition hover:bg-green-600"
            >
              Register
            </button>
          </form>
        ) : (
          <form onSubmit={handleLoginSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleLoginChange}
                placeholder="Enter your email"
                className="w-full rounded-lg border border-gray-300 p-3 focus:border-green-600 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleLoginChange}
                placeholder="Enter your password"
                className="w-full rounded-lg border border-gray-300 p-3 focus:border-green-600 focus:outline-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-green-700 p-3 font-semibold text-white transition hover:bg-green-600"
            >
              Login
            </button>
          </form>
        )}

        <div className="mt-6 text-center text-sm text-gray-600">
          {isRegisterMode ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            type="button"
            onClick={() => setIsRegisterMode((previous) => !previous)}
            className="font-semibold text-green-700 hover:text-green-600"
          >
            {isRegisterMode ? "Login here" : "Register here"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Login;
