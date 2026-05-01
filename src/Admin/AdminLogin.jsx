import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLeaf } from "react-icons/fa";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("adminToken", data.token);
        localStorage.setItem("adminLoggedIn", "true");
        navigate("/admin/dashboard");
      } else {
        setError(data.message || "Invalid credentials!");
      }
    } catch (err) {
      setError("Server error! Make sure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <FaLeaf className="text-5xl text-green-500 mx-auto mb-3" />
          <h1 className="text-3xl font-bold text-white">Admin Login</h1>
          <p className="text-gray-400 mt-1">Grow High Nursery Panel</p>
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-red-900 px-4 py-3 text-red-300 text-sm">
            ❌ {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-300">
              Email Address
            </label>
            <input
              type="email"
              placeholder="admin@growhigh.com"
              value={credentials.email}
              onChange={(e) =>
                setCredentials({ ...credentials, email: e.target.value })
              }
              className="w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-3 text-white outline-none focus:border-green-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              className="w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-3 text-white outline-none focus:border-green-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-green-700 px-6 py-3 font-bold text-white transition hover:bg-green-600 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
          >
            {loading ? "Logging in..." : "Login to Admin Panel"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;