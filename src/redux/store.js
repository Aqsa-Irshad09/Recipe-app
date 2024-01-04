import { configureStore } from "@reduxjs/toolkit";
import mealReducer from "./features/fetchMealSlice";
import authReducer from "./features/registerUserSlice";

import { randomMealReducer } from "./features/randomMealSlice";
import categoriesReducer from "./features/categoriesSlice"; // Correct import path
import selectedCategoryReducer from "./features/selectedCategory";
import areasReducer from "./features/recipeByAreaSlice";
import selectedRecipeByAreaReducer from "./features/selectedRecipeByAreaSlice";
import loginUserReducer from "./features/loginUserSlice";
import plannedMealReducer from "./features/plannedMealSlice";
import fetchingPlannedMealReducer from "./features/fetchPlannedMealsSlice";
const store = configureStore({
  reducer: {
    meals: mealReducer,
    auth: loginUserReducer,
    user: authReducer,
    randomMeals: randomMealReducer,
    categories: categoriesReducer,
    selectedCategory: selectedCategoryReducer,
    recipeByArea: areasReducer,
    selectedRecipeByArea: selectedRecipeByAreaReducer,
    plannedMeals: plannedMealReducer,
    fetchingPlannedMeal: fetchingPlannedMealReducer,
  },
});

export default store;
