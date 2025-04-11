import { useState, useCallback } from "react";

const THEMES = {
  LIGHT: "light",
  DARK: "dark",
};

const ICONS = {
  [THEMES.LIGHT]: {
    src: "/images/icon/icon-moon.svg",
    className: "dark:hidden",
  },
  [THEMES.DARK]: {
    src: "/images/icon/icon-sun.svg",
    className: "hidden dark:block",
  },
};

const ThemeToggler = () => {
  const [theme, setTheme] = useState(THEMES.LIGHT);

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) =>
      prevTheme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK
    );
  }, []);

  return (
    <button
      aria-label="theme toggler"
      onClick={toggleTheme}
      className="bg-gray-2 dark:bg-dark-bg absolute right-17 mr-1.5 flex cursor-pointer items-center justify-center rounded-full text-black dark:text-white lg:static"
    >
      {Object.entries(ICONS).map(([themeKey, { src, className }]) => (
        <img
          key={themeKey}
          src={src}
          alt={`${themeKey} theme icon`}
          width={themeKey === THEMES.LIGHT ? 21 : 22}
          height={themeKey === THEMES.LIGHT ? 21 : 22}
          className={className}
        />
      ))}
    </button>
  );
};

export default ThemeToggler;
