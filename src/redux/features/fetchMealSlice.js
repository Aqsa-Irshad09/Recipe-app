// fetchMealSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchMeals = createAsyncThunk("meals/fetchMeals", async () => {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch meals");
    }
    const data = await response.json();
    return data.meals; // Extract meals data from the response
  } catch (error) {
    throw new Error(error.message);
  }
});

const mealSlice = createSlice({
  name: "meals",
  initialState: {
    mealList: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMeals.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMeals.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.mealList = action.payload;
      })
      .addCase(fetchMeals.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default mealSlice.reducer;
