import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RECIPE_CATEGORY } from "../constant";

export const fetchCategories = createAsyncThunk(
  `${RECIPE_CATEGORY}/fetchCategories`,
  async () => {
    try {
      const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );
      const data = await response.json();
      return data.categories;
    } catch (error) {
      throw new Error("Failed to fetch categories");
    }
  }
);

// Categories slice
const categoriesSlice = createSlice({
  name: RECIPE_CATEGORY,
  initialState: {
    categories: [],
    status: "idle",
    error: null,
  },
  reducers: {
    // Other reducers can be added if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default categoriesSlice.reducer;
