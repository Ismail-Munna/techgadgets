'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type Theme = "dark" | "light";

type ThemeContextValue = {
  isLoaded: boolean;
  theme: Theme;
  toggleTheme: () => void;
};

const STORAGE_KEY = "techgadgets-theme";
const ThemeContext = createContext<ThemeContextValue | null>(null);

function applyTheme(theme: Theme) {
  const root = document.documentElement;

  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem(STORAGE_KEY);
    const nextTheme: Theme = savedTheme === "dark" ? "dark" : "light";
    const frameId = window.requestAnimationFrame(() => {
      setTheme(nextTheme);
      setIsLoaded(true);
    });

    applyTheme(nextTheme);

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    applyTheme(theme);
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [isLoaded, theme]);

  const value = {
    isLoaded,
    theme,
    toggleTheme: () => {
      setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
    },
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}
