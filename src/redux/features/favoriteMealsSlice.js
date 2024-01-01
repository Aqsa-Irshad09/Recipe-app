// favoriteMealsSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addToFavoritesAPI,
  removeFromFavoritesAPI,
} from "../../api/apiFavoriteRecepi";

// Async thunk to add a meal to favorites
export const addToFavorites = createAsyncThunk(
  "favoriteMeals/add",
  async (mealId) => {
    const response = await addToFavoritesAPI(mealId);
    return response; // Assuming the API returns updated favorite meals
  }
);

// Async thunk to remove a meal from favorites
export const removeFromFavorites = createAsyncThunk(
  "favoriteMeals/remove",
  async (mealId) => {
    const response = await removeFromFavoritesAPI(mealId);
    return response; // Assuming the API returns updated favorite meals
  }
);

const favoriteMealsSlice = createSlice({
  name: "favoriteMeals",
  initialState: {
    favoriteMeals: [], // Initialize as an empty array
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToFavorites.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToFavorites.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addToFavorites.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Update favorite meals with the response data
        state.favoriteMeals = action.payload;
      })
      .addCase(removeFromFavorites.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeFromFavorites.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to remove from favorites";
      })
      .addCase(removeFromFavorites.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Update favorite meals with the response data
        state.favoriteMeals = action.payload;
      });
  },
});

export default favoriteMealsSlice.reducer;
