import { configureStore } from "@reduxjs/toolkit";
import mealReducer from "./features/fetchMealSlice";
import authReducer from "./features/registerUserSlice";
import favoriteMealsReducer from "./features/favoriteMealsSlice";
import { randomMealReducer } from "./features/randomMealSlice";
import categoriesReducer from "./features/categoriesSlice"; // Correct import path
import selectedCategoryReducer from "./features/selectedCategory";
import areasReducer from "./features/recipeByAreaSlice";
import selectedRecipeByAreaReducer from "./features/selectedRecipeByAreaSlice";
const store = configureStore({
  reducer: {
    meals: mealReducer,
    user: authReducer,
    favoriteMeals: favoriteMealsReducer,
    randomMeals: randomMealReducer,
    categories: categoriesReducer,
    selectedCategory: selectedCategoryReducer,
    recipeByArea: areasReducer,
    selectedRecipeByArea: selectedRecipeByAreaReducer,
  },
});

export default store;
