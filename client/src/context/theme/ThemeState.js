import React, { useState } from "react";
import themeContext from "./themeContext";

const ThemeState = (props) => {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };
  return (
    <themeContext.Provider value={{ theme, toggleTheme }}>
      {props.children}
    </themeContext.Provider>
  );
};

export default ThemeState;
