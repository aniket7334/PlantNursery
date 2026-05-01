import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaSearch, FaTimes, FaUser, FaShoppingCart } from "react-icons/fa";
import logo from "../Images/logo.jpg";
import { useTheme } from "../Theme/ThemeContext";

const navLinkClass = ({ isActive }) =>
  isActive
    ? "no-underline text-green-200 font-semibold"
    : "no-underline text-white transition hover:text-green-200";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);

   const { isDark } = useTheme();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("nurseryLoggedIn") === "true";
    const savedUser = JSON.parse(localStorage.getItem("nurseryUser"));

    if (isLoggedIn && savedUser) {
      setLoggedInUser(savedUser);
    }
  }, []);

  useEffect(() => {
    const updateCart = () => {
      const count = parseInt(localStorage.getItem("cartCount") || "0");
      setCartCount(count);
    };

    updateCart();
    window.addEventListener("cartUpdated", updateCart);
    return () => window.removeEventListener("cartUpdated", updateCart);
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    const trimmed = searchText.trim();
    if (!trimmed) return;
    navigate(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("nurseryLoggedIn");
    setLoggedInUser(null);
    setIsMenuOpen(false);
    alert("Logged out successfully");
    navigate("/login");
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    
    <header className="sticky top-0 z-50 shadow-md">
      {/* Top white bar */}
      <div className="border-b border-green-100 dark:border-gray-700 bg-white dark:bg-gray-900">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-6">
          <Link to="/" className="flex items-center gap-3 no-underline">
            <img
              src={logo}
              alt="Grow High Nursery"
              className="h-14 w-14 rounded-full border-2 border-green-700 object-cover"
            />
            <div>
              <p className="text-2xl font-bold text-green-800 dark:text-green-400">Grow High</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Nursery Booking Site</p>
            </div>
          </Link>

          {/* Search bar */}
          <form
            onSubmit={handleSearch}
            className="hidden flex-1 items-center overflow-hidden rounded-full border border-green-200 dark:border-gray-600 bg-green-50 dark:bg-gray-800 md:flex md:max-w-xl"
          >
            <input
              type="text"
              placeholder="Search plants, seeds, and services..."
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              className="w-full bg-transparent px-4 py-3 text-gray-700 dark:text-gray-200 outline-none placeholder:dark:text-gray-400"
            />
            <button
              type="submit"
              className="bg-green-700 dark:bg-green-600 px-5 py-3 text-white transition hover:bg-green-600"
            >
              <FaSearch />
            </button>
          </form>

          {/* Desktop right side */}
          <div className="hidden items-center gap-4 md:flex">
            {loggedInUser ? (
              <>
                <span className="text-sm font-medium text-green-800 dark:text-green-400">
                  Hello, {loggedInUser.name}
                </span>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-full border border-green-700 dark:border-green-500 px-4 py-2 text-green-800 dark:text-green-400 transition hover:bg-green-100 dark:hover:bg-gray-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <NavLink to="/login" className="no-underline">
                <span className="flex items-center gap-2 text-green-800 dark:text-green-400 hover:text-green-600">
                  <FaUser />
                  Login
                </span>
              </NavLink>
            )}

            <NavLink
              to="/booking"
              className="no-underline rounded-full bg-green-700 dark:bg-green-600 px-5 py-2.5 text-white transition hover:bg-green-600"
            >
              Book Garden Accessories
            </NavLink>

            <Link to="/cart" className="relative text-green-800 dark:text-green-400 hover:text-green-600 text-2xl">
              <FaShoppingCart />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setIsMenuOpen((previous) => !previous)}
            className="text-2xl text-green-800 dark:text-green-400 md:hidden"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Desktop nav bar */}
      <nav className="hidden bg-green-800 dark:bg-gray-800 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-8 px-6 py-4">
          <NavLink to="/" className={navLinkClass}>Home</NavLink>
          <NavLink to="/indoor" className={navLinkClass}>Indoor Plants</NavLink>
          <NavLink to="/outdoor" className={navLinkClass}>Outdoor Plants</NavLink>
          <NavLink to="/seeds" className={navLinkClass}>Seeds</NavLink>
          <NavLink to="/accessories" className={navLinkClass}>Garden Accessories</NavLink>
          <NavLink to="/about" className={navLinkClass}>About</NavLink>
          <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
          {/* <Link to="/cart" onClick={closeMenu} className="flex items-center gap-2 text-green-100 hover:text-green-200">
            <FaShoppingCart />
            Cart {cartCount > 0 && `(${cartCount})`}
          </Link> */}
        </div>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="bg-green-800 dark:bg-gray-900 px-4 py-4 text-white md:hidden">
          <form
            onSubmit={handleSearch}
            className="mb-4 flex items-center overflow-hidden rounded-full bg-white dark:bg-gray-700"
          >
            <input
              type="text"
              placeholder="Search plants..."
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              className="w-full px-4 py-3 text-gray-700 dark:text-gray-200 dark:bg-gray-700 outline-none"
            />
            <button type="submit" className="bg-green-700 px-4 py-3 text-white">
              <FaSearch />
            </button>
          </form>

          <div className="flex flex-col gap-4">
            <NavLink to="/" onClick={closeMenu} className={navLinkClass}>Home</NavLink>
            <NavLink to="/indoor" onClick={closeMenu} className={navLinkClass}>Indoor Plants</NavLink>
            <NavLink to="/outdoor" onClick={closeMenu} className={navLinkClass}>Outdoor Plants</NavLink>
            <NavLink to="/seeds" onClick={closeMenu} className={navLinkClass}>Seeds</NavLink>
            <NavLink to="/about" onClick={closeMenu} className={navLinkClass}>About</NavLink>
            <NavLink to="/contact" onClick={closeMenu} className={navLinkClass}>Contact</NavLink>

            {loggedInUser ? (
              <>
                <span className="text-sm font-medium text-green-100">
                  Hello, {loggedInUser.name}
                </span>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-lg bg-white dark:bg-gray-700 px-4 py-3 text-center font-semibold text-green-800 dark:text-green-400"
                >
                  Logout
                </button>
              </>
            ) : (
              <NavLink to="/login" onClick={closeMenu} className={navLinkClass}>
                Login
              </NavLink>
            )}

            <NavLink
              to="/booking"
              onClick={closeMenu}
              className="no-underline rounded-lg bg-white dark:bg-gray-700 px-4 py-3 text-center font-semibold text-green-800 dark:text-green-400"
            >
              Book Garden Accessories
            </NavLink>
          </div>
        </div>
      )}
    </header>
  
  );
};

export default Navbar;
