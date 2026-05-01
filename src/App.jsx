import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Navbar from "./Components/Navbar";
import ThemeToggle from "./Components/ThemeToggle";
import HomePage from "./Components/HomePage";
import IndoorPage from "./Components/IndoorPage";
import OutdoorPage from "./Components/OutdoorPage";
import SeedsPage from "./Components/SeedsPage";
import AboutPage from "./Components/AboutPage";
import ContactPage from "./Components/ContactPage";
import BookingPage from "./Components/BookingPage";
import Login from "./Components/Login";
import CartPage from "./Components/CartPage";
import GardenAccessoriesPage from "./Components/GardenAccessoriesPage";
import CheckoutPage from "./Components/CheckoutPage";
import SearchResults from "./Components/SearchResults";
import AdminLogin from "./Admin/AdminLogin";
import AdminDashboard from "./Admin/AdminDashboard";
import AdminOrders from "./Admin/AdminOrders";

// ✅ Protected route for normal users
const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("nurseryLoggedIn") === "true";
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// ✅ Protected route for admin only
const ProtectedAdminRoute = ({ children }) => {
  const isAdminLoggedIn = localStorage.getItem("adminLoggedIn") === "true";
  if (!isAdminLoggedIn) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

const AppContent = () => {
  const location = useLocation();
  const isLoggedIn = localStorage.getItem("nurseryLoggedIn") === "true";

  // ✅ Hide Navbar and ThemeToggle for admin routes
  const isAdminRoute = location.pathname.startsWith("/admin");
  const showAppChrome =
    isLoggedIn && location.pathname !== "/login" && !isAdminRoute;

  return (
    <div className="min-h-screen bg-green-50 dark:bg-gray-900 text-slate-800 dark:text-white transition-colors duration-300">
      {showAppChrome && <Navbar />}
      {showAppChrome && <ThemeToggle />}

      <Routes>
        {/* ✅ User Routes */}
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
              <AboutPage />
              <ContactPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/indoor"
          element={
            <ProtectedRoute>
              <IndoorPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/outdoor"
          element={
            <ProtectedRoute>
              <OutdoorPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/seeds"
          element={
            <ProtectedRoute>
              <SeedsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <AboutPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contact"
          element={
            <ProtectedRoute>
              <ContactPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/booking"
          element={
            <ProtectedRoute>
              <BookingPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/search"
          element={
            <ProtectedRoute>
              <SearchResults />
            </ProtectedRoute>
          }
        />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/accessories" element={<GardenAccessoriesPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />

        {/* ✅ Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedAdminRoute>
              <AdminDashboard />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <ProtectedAdminRoute>
              <AdminOrders />
            </ProtectedAdminRoute>
          }
        />

        {/* ✅ Fallback */}
        <Route
          path="*"
          element={<Navigate to={isLoggedIn ? "/" : "/login"} replace />}
        />
      </Routes>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;