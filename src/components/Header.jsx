import React, { use, useEffect, useState } from "react";

const Header = () => {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.theme === "dark";
  });
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <>
      <section className="container">
        <div className="flex justify-between items-center py-4 px-1">
          <div className="">
            <span className="material-symbols-rounded text-lg font-semibold">
              360
            </span>
          </div>
          <nav className="uppercase">
            <ul className="flex items-center text-sm font-semibold space-x-4 justify-center ring-1 ring-inset dark:bg-[#242424] dark:ring-[#2a2a2a] ring-[#e8e8e8] bg-[#f9f9f9] transition-all py-2 px-4 rounded-xl">
              <li className="link">home</li>
              <li className="link">
                <span
                  className="material-symbols-rounded text-lg font-semibold"
                  onClick={() => setIsDark(!isDark)}
                >
                  {isDark ? "backlight_high" : "bedtime"}
                </span>
              </li>
            </ul>
          </nav>
        </div>
      </section>
    </>
  );
};

export default Header;
