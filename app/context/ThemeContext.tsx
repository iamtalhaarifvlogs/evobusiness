"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type Theme = "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

// ✅ Create context with proper typing
const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

export const ThemeProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [theme, setTheme] = useState<Theme>("light");

  // ✅ Load saved theme (SSR safe)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme") as Theme | null;
      if (saved) {
        setTheme(saved);
      }
    }
  }, []);

  // ✅ Apply theme to DOM (SSR safe)
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.body.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  // ✅ Toggle function
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// ✅ Custom hook with safety check
export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
};