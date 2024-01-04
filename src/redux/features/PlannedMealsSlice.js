import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addPlannedMeal } from "../../api/addPlannedMeal";

export const addPlannedMealsAsync = createAsyncThunk(
  "plannedMeals/addPlannedMeals",
  async (plannedMeal, thunkAPI) => {
    try {
      const addedMeal = await addPlannedMeal(plannedMeal);

      if (addedMeal) {
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
      state.selectedRecipes.push({
        recipe: action.payload.recipe,
        day: action.payload.day,
        date: action.payload.date,
        type: action.payload.type,
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addPlannedMealsAsync.fulfilled, (state, action) => {
      state.selectedRecipes = action.payload;
      state.error = null;
    });
    builder.addCase(addPlannedMealsAsync.rejected, (state, action) => {
      state.error = action.error.message; // Set the error message in the state
    });
  },
});

export const { setSelectedRecipe } = plannedMealSlice.actions;
export default plannedMealSlice.reducer;
