"use client";
import { createContext, useState } from "react";
import Colors from "@/constants/colors";

type ThemeContextType = {
  currentColorScheme: "dark" | "light";
  theme: typeof Colors.dark | typeof Colors.light;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentColorScheme, setCurrentColorScheme] = useState<
    "dark" | "light"
  >("dark");

  const toggleTheme = () => {
    setCurrentColorScheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider
      value={{
        currentColorScheme,
        theme: currentColorScheme === "dark" ? Colors.dark : Colors.light,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
