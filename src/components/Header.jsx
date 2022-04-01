import React from "react";
import { useContext } from "react";
import { AppContext } from "../App";
const Header = () => {
  const { isDarkMode, toggleDarkMode } = useContext(AppContext);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 -z-20">
        <picture>
          <source
            media="(min-width: 640px)"
            srcSet={`${
              !isDarkMode
                ? "images/bg-desktop-light.jpg"
                : "images/bg-desktop-dark.jpg"
            }`}
          />
          <img
            className="w-full"
            src={`${
              !isDarkMode
                ? "images/bg-mobile-light.jpg"
                : "images/bg-mobile-dark.jpg"
            }`}
            alt=""
          />
        </picture>
      </div>
      <header className="mt-14 flex items-center justify-between">
        <h2 className="text-white text-4xl font-semibold">TODO</h2>
        <button onClick={toggleDarkMode}>
          <img
            src={`${
              !isDarkMode ? "images/icon-moon.svg" : "images/icon-sun.svg"
            }`}
            alt=""
          />
        </button>
      </header>
    </>
  );
};

export default Header;
