import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiFetchPlannedMeals } from "../../api/apiFetchPlannedMeals";
import {
  apiDeletePlannedMeal,
  apiUpdatePlannedMeal,
} from "../../api/plannedMealAction";
export const fetchPlannedMealsAsync = createAsyncThunk(
  "plannedMeals/fetchPlannedMeals",
  async (_, { rejectWithValue }) => {
    try {
      const data = await apiFetchPlannedMeals(); // Fetch data directly
      console.log("fetchedPlannedMeals", data);
      return data; // Return data directly
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch planned meals");
    }
  }
);
// export const updatePlannedMealAsync = createAsyncThunk(
//   "plannedMeals/updatePlannedMealAsync",
//   async ({ id, updatedMeal }) => {
//     try {
//       await apiUpdatePlannedMeal(id, updatedMeal); // Call your API function to update
//       return { id, updatedMeal };
//     } catch (error) {
//       throw new Error("Failed to update planned meal in the database");
//     }
//   }
// );
export const updatePlannedMealInDBAsync = createAsyncThunk(
  "plannedMeals/updatePlannedMealInDB",
  async (updatedItemDetails) => {
    try {
      const response = await apiUpdatePlannedMeal(updatedItemDetails);
      return response.data; // Assuming the API returns the updated data
    } catch (error) {
      throw new Error("Failed to update planned meal in the database");
    }
  }
);

export const deletePlannedMealAsync = createAsyncThunk(
  "plannedMeals/deletePlannedMealAsync",
  async (id) => {
    try {
      await apiDeletePlannedMeal(id); // Call your API function to delete
      return id;
    } catch (error) {
      throw new Error("Failed to delete planned meal from the database");
    }
  }
);

const plannedMealsSlice = createSlice({
  name: "plannedMeals",
  initialState: {
    plannedMeals: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlannedMealsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlannedMealsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.plannedMeals = action.payload;
      })
      .addCase(fetchPlannedMealsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    //   .addCase(updatePlannedMealAsync.fulfilled, (state, action) => {
    //     const { id, updatedMeal } = action.payload;
    //     const index = state.plannedMeals.findIndex((meal) => meal.id === id);
    //     if (index !== -1) {
    //       state.plannedMeals[index] = updatedMeal;
    //     }
    //   })
    builder
      .addCase(updatePlannedMealInDBAsync.fulfilled, (state, action) => {
        const updatedItemDetails = action.payload;

        // Update the Redux state with the data returned from the API
        state.plannedMeals = state.plannedMeals.map((item) =>
          item.id === updatedItemDetails.id ? updatedItemDetails : item
        );

        state.selectedItemForUpdate = null; // Clear the selected item after updating
      })
      .addCase(deletePlannedMealAsync.fulfilled, (state, action) => {
        const idToDelete = action.payload;
        state.plannedMeals = state.plannedMeals.filter(
          (meal) => meal.id !== idToDelete
        );
      });
  },
});

export default plannedMealsSlice.reducer;
