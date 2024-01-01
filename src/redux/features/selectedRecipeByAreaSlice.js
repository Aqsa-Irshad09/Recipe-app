import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchRecipesByArea = createAsyncThunk(
  "recipes/fetchRecipesByArea",
  async (area) => {
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
      );
      const data = await response.json();
      return data.meals;
    } catch (error) {
      throw new Error("Failed to fetch recipes");
    }
  }
);

const selectedRecipeByAreaSlice = createSlice({
  name: "recipes",
  initialState: {
    recipes: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipesByArea.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRecipesByArea.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.recipes = action.payload;
      })
      .addCase(fetchRecipesByArea.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default selectedRecipeByAreaSlice.reducer;
