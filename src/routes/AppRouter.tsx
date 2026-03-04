import { Routes, Route } from "react-router";
import Home from "../pages/Home";
import Layout from "../layout/Layout";

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
