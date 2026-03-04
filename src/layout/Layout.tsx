import { Outlet } from "react-router";
import Navbar from "../components/features/navigation/Navbar";
import { useState } from "react";

const Layout = () => {
  const [searchText, setSearchText] = useState("");
  return (
    <main className="min-h-screen bg-white dark:bg-gray-800 transition-colors duration-300">
      <Navbar value={searchText} onSearch={setSearchText} />
      <Outlet context={{ searchText }} />
    </main>
  );
};

export default Layout;
