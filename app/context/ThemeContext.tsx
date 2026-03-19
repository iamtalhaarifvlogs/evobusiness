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

const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("light");

  // ✅ INIT THEME FROM LOCALSTORAGE (client only)
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("theme") as Theme | null;
      if (saved === "light" || saved === "dark") {
        setTheme(saved);
      }
    } catch {}
  }, []);

  // ✅ APPLY THEME GLOBALLY (IMPORTANT FIX)
  useEffect(() => {
    try {
      const root = document.documentElement;

      // Apply attribute on <html>
      root.setAttribute("data-theme", theme);

      // Optional: also update class (useful for Tailwind hybrid setups)
      root.classList.remove("light", "dark");
      root.classList.add(theme);

      // Persist
      window.localStorage.setItem("theme", theme);
    } catch {}
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be inside ThemeProvider");
  return ctx;
};