"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type ThemeMode = "light" | "dark" | "system";

const THEME_KEY = "peony.theme";

interface ThemeContextValue {
  theme: ThemeMode;
  setTheme: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "system",
  setTheme: () => {},
});

function systemPrefersDark() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function apply(mode: ThemeMode) {
  const dark = mode === "dark" || (mode === "system" && systemPrefersDark());
  document.documentElement.classList.toggle("dark", dark);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>("system");

  useEffect(() => {
    const id = window.setTimeout(() => {
      let stored: ThemeMode = "system";
      try {
        const raw = window.localStorage.getItem(THEME_KEY);
        if (raw === "light" || raw === "dark" || raw === "system") stored = raw;
      } catch {
        // ignore
      }
      setThemeState(stored);
      apply(stored);
    }, 0);
    return () => window.clearTimeout(id);
  }, []);

  const setTheme = (mode: ThemeMode) => {
    setThemeState(mode);
    try {
      window.localStorage.setItem(THEME_KEY, mode);
    } catch {
      // ignore
    }
    apply(mode);
  };

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if (theme === "system") apply("system");
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
