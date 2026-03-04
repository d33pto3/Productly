import { useState } from "react";
import { motion, type Variants } from "motion/react";
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

const navbarVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.15,
      ease: "easeOut",
    },
  },
};

const itemsVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { ease: "easeOut", duration: 0.4 } },
};

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
    <motion.nav
      variants={navbarVariants}
      initial="hidden"
      animate="visible"
      aria-label="Main Navigation"
      className="px-[10%] py-5 sm:flex justify-between items-center bg-white dark:bg-gray-800 gap-8"
    >
      <Title title="Productly" />
      <motion.div
        variants={navbarVariants}
        className="font-space flex gap-2 mt-4 sm:mt-0 md:gap-4 items-center"
      >
        <motion.div variants={itemsVariants}>
          <SearchBar value={value} onSearch={onSearch} />
        </motion.div>
        <motion.div
          variants={itemsVariants}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            className="focus:outline-none"
          >
            {theme === "light" ? (
              <MoonIcon
                className="bg-gray-200 hover:bg-gray-300 rounded-xl p-2.5 sm:p-3 cursor-pointer"
                size={20}
              />
            ) : (
              <SunMediumIcon
                className="bg-gray-700 hover:bg-gray-600 text-white rounded-xl p-2.5 sm:p-3 cursor-pointer"
                size={20}
              />
            )}
          </button>
        </motion.div>
        <motion.div
          variants={itemsVariants}
          aria-label={`${favoriteCount} items in favorites`}
          className="bg-red-200 flex gap-1 p-2 sm:p-2.5 rounded-xl items-center min-w-14 cursor-default"
        >
          <HeartIcon className="text-red-500" size={20} />
          <p className="text-red-900" aria-hidden="true">{favoriteCount}</p>
        </motion.div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
