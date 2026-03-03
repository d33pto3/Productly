import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import { useState } from "react";

const Layout = () => {
  const [searchText, setSearchText] = useState("");
  return (
    <main>
      <Navbar value={searchText} onSearch={setSearchText} />
      <Outlet context={{ searchText }} />
    </main>
  );
};

export default Layout;
