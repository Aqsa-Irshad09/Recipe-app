import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addPlannedMeal } from "../../api/apiPlannedMeals";

export const addPlannedMealsAsync = createAsyncThunk(
  "plannedMeals/addPlannedMeals",
  async (plannedMeal, thunkAPI) => {
    try {
      const addedMeal = await addPlannedMeal(plannedMeal);

      if (addedMeal) {
        alert("Recipe added successfully");
        return addedMeal;
      } else {
        throw new Error("Failed to add planned meal");
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const plannedMealSlice = createSlice({
  name: "plannedMeals",
  initialState: {
    selectedRecipes: [],
    error: null,
  },

  reducers: {
    setSelectedRecipe: (state, action) => {
      if (!Array.isArray(state.selectedRecipes)) {
        state.selectedRecipes = []; // Ensure it's an array if it's not
      }
      state.selectedRecipes = [
        ...state.selectedRecipes,
        {
          recipe: action.payload.recipe,
          day: action.payload.day,
          date: action.payload.date,
          type: action.payload.type,
        },
      ];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addPlannedMealsAsync.fulfilled, (state, action) => {
      state.selectedRecipes = action.payload;
      state.error = null;
    });
    builder.addCase(addPlannedMealsAsync.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export const { setSelectedRecipe } = plannedMealSlice.actions;
export default plannedMealSlice.reducer;
