import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../Theme/ThemeContext";

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="fixed bottom-5 right-5 z-50 rounded-full bg-blue-500 hover:bg-blue-600 dark:bg-yellow-500 dark:hover:bg-yellow-600 px-4 py-3 text-white shadow-lg transition-all duration-300 hover:scale-110"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <Sun size={20} className="text-yellow-100" />
      ) : (
        <Moon size={20} className="text-white" />
      )}
    </button>
  );
};

export default ThemeToggle;