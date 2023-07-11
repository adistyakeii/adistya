import React, { createContext, useEffect, useState } from "react";

export type ThemeType = "light" | "dark" | "system";

interface ContextType {
  theme: ThemeType;
  changeTheme: (isLightMode: ThemeType) => void;
}

const ThemeContext = createContext<ContextType>({
  theme: "light",
  changeTheme: () => null,
});

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const htmlElement = document.documentElement;
  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const [theme, setTheme] = useState<ThemeType>(
    (localStorage.getItem("theme") as ThemeType) ?? "light"
  );
  const changeTheme = (val: ThemeType) => {
    setTheme(val);
    localStorage.setItem("theme", val);
  };

  useEffect(() => {
    switch (theme) {
      case "light":
        htmlElement.className = "light";
        localStorage.setItem("theme", "light");
        break;
      case "dark":
        htmlElement.className = "dark";
        localStorage.setItem("theme", "dark");
        break;
      case "system":
        localStorage.setItem("theme", "system");
        htmlElement.className = darkQuery.matches ? "dark" : "light";
        break;
    }
  }, [darkQuery, htmlElement, theme]);

  darkQuery.addEventListener("change", function (e) {
    if (localStorage.getItem("theme") === "system") {
      htmlElement.className = e.matches ? "dark" : "light";
    }
  });

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeContext, ThemeProvider };
