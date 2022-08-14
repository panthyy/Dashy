import { useEffect } from "react";
import { useDarkMode } from "../hooks/useDarkMode";

export const Header = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  const Logo = () => {
    return (
      <img
        onClick={() => {
          window.open("https://github.com/panthyy");
        }}
        className="w-12 hover:cursor-pointer"
        src="/Dashylogo.png"
      />
    );
  };
  return (
    <header className=" h-16 flex px-5 items-center justify-between">
      <Logo />

      <button onClick={() => toggleDarkMode()}>{darkMode ? "🌞" : "🌑"}</button>
    </header>
  );
};
