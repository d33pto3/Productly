import { useState } from "react";
import { HeartIcon } from "../icons/Heart";
import { MoonIcon } from "../icons/Moon";
import SearchBar from "./SearchBar";
import Title from "./Title";
import { SunMediumIcon } from "../icons/Sun";
import { useFavorites } from "../context/useFavorites";

interface NavbarProps {
  value: string;
  onSearch: (value: string) => void;
}

const Navbar = ({ onSearch, value }: NavbarProps) => {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      return "dark";
    }
    return "light";
  });
  const { favoriteCount } = useFavorites();

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle("dark");

    const newTheme = isDark ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  return (
    <div className="px-[10%] py-5 flex justify-between items-center bg-white dark:bg-gray-800">
      <Title title="Productly" />
      <div className="flex gap-4 items-center">
        <SearchBar value={value} onSearch={onSearch} />
        {theme === "light" ? (
          <MoonIcon
            className="bg-gray-200 hover:bg-gray-300 rounded-xl p-2.5 cursor-pointer"
            size={20}
            onClick={toggleTheme}
          />
        ) : (
          <SunMediumIcon
            className="bg-gray-700 hover:bg-gray-600 text-white rounded-xl p-2.5 cursor-pointer"
            size={20}
            onClick={toggleTheme}
          />
        )}
        <div className="bg-red-200 flex gap-1 p-2 rounded-xl items-center">
          <HeartIcon className="text-red-500" size={20} />
          <p className="text-red-900">{favoriteCount}</p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
