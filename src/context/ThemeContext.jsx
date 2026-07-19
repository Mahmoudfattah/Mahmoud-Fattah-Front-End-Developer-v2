// src/context/ThemeContext.jsx
import { createContext, useContext, useState, useCallback } from "react";

const ThemeContext = createContext(null);

/**
 * Single source of truth for the dark/light theme.
 *
 * Previously Navbar.jsx and Navbar2.jsx each kept their own `isDark`
 * state, synced once on mount by reading document.documentElement's
 * class list. Toggling in one never updated the other until a full
 * reload — both navbars now read/write through this context instead.
 */
export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    if (typeof document === "undefined") return true;
    return document.documentElement.classList.contains("dark");
  });

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("dark", next);
      try {
        localStorage.setItem("theme", next ? "dark" : "light");
      } catch (e) {
        // localStorage can be unavailable (private mode) — theme still
        // works for the session, it just won't persist.
      }
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside a <ThemeProvider>");
  return ctx;
}