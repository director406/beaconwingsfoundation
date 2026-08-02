import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({ theme: "light", toggleTheme: () => {} });

export function ThemeProvider({ children }) {
  // Defaults to light for every visitor, regardless of OS/browser dark-mode
  // preference. There's currently no dark-mode toggle exposed anywhere in
  // the UI (toggleTheme below is unused by any component), so previously a
  // visitor whose system preferred dark mode would land on a dark site with
  // no way to switch back. Explicit stored preference (if a toggle is added
  // later) is still respected.
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem("iiwc_theme");
    return stored === "dark" ? "dark" : "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("iiwc_theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
