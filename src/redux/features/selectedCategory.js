// mealsSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchMealsForCategory = createAsyncThunk(
  "meals/fetchMealsForCategory",
  async (categoryName) => {
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`
      );
      const data = await response.json();
      return data.meals;
    } catch (error) {
      throw new Error("Failed to fetch meals");
    }
  }
);

const selectedCategory = createSlice({
  name: "meals",
  initialState: {
    meals: [],
    status: "idle",
    error: null,
  },
  reducers: {
    // Other reducers if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMealsForCategory.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchMealsForCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.meals = action.payload;
      })
      .addCase(fetchMealsForCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default selectedCategory.reducer;
