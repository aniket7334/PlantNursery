import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaShoppingBag,
  FaSignOutAlt,
  FaLeaf,
} from "react-icons/fa";

const AdminSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminLoggedIn");
    navigate("/admin/login");
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition ${
      isActive
        ? "bg-green-700 text-white"
        : "text-gray-300 hover:bg-gray-700 hover:text-white"
    }`;

  return (
    <div className="flex h-screen w-64 flex-col bg-gray-900 px-4 py-6 fixed left-0 top-0 z-50">
      {/* Logo */}
      <div className="mb-8 flex items-center gap-3 px-4">
        <FaLeaf className="text-3xl text-green-500" />
        <div>
          <p className="text-xl font-bold text-white">Grow High</p>
          <p className="text-xs text-gray-400">Admin Panel</p>
        </div>
      </div>

      {/* Nav Links */}
      <nav className="flex flex-col gap-2">
        <NavLink to="/admin/dashboard" className={linkClass}>
          <FaHome /> Dashboard
        </NavLink>
        <NavLink to="/admin/orders" className={linkClass}>
          <FaShoppingBag /> Orders
        </NavLink>
      </nav>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="mt-auto flex items-center gap-3 rounded-lg px-4 py-3 text-gray-300 hover:bg-red-700 hover:text-white transition"
      >
        <FaSignOutAlt /> Logout
      </button>
    </div>
  );
};

export default AdminSidebar;