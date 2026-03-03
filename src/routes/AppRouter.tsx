import { Routes, Route } from "react-router";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Layout from "../layout/Layout";

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
