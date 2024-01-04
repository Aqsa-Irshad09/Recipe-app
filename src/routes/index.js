import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import { URL } from "../constant";
import AboutUs from "../pages/AboutUs";
import { PublicRoute } from "../routes/publicRoutes";
import { PrivateRoute } from "../routes/privateRoutes";
import DetailPage from "../pages/DetailPage";
import Recipes from "../pages/Recipes";
import CategoryDetail from "../pages/CategoriesDetail";
import AreaDetail from "../pages/AreaDetail";
import PlannedRecipe from "../pages/PlannedRecipe";

const MainRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={URL.HOME} element={<Home />} />
        <Route path="/meal/:id" element={<DetailPage />} />
        <Route path={URL.RECIPE} element={<Recipes />} />
        <Route path="/category/:categoryName" element={<CategoryDetail />} />
        <Route path="/area/:areaName" element={<AreaDetail />} />

        {/* Public routes */}
        <Route element={<PublicRoute />}>
          <Route path={URL.SIGNUP} element={<SignUp />} />
          <Route path={URL.SIGNIN} element={<SignIn />} />
        </Route>

        {/* Private routes */}
        <Route element={<PrivateRoute />}>
          <Route path={URL.PLANNED_RECIPE} element={<PlannedRecipe />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default MainRouter;
