// mealPlannerSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  monday: { breakfast: null, lunch: null, dinner: null },
  // ... other days of the week similarly initialized
};

const mealPlannerSlice = createSlice({
  name: "mealPlanner",
  initialState,
  reducers: {
    assignMeal(state, action) {
      const { day, mealType, recipe } = action.payload;
      state[day][mealType] = recipe;
    },
    // other reducers for clearing meals, etc.
  },
});

export const { assignMeal } = mealPlannerSlice.actions;
export default mealPlannerSlice.reducer;
