import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchRandomMeal } from "../../api/apiRandomRecepi";

export const fetchRandomMealAction = createAsyncThunk(
  "meals/fetchRandomMeal",
  async () => {
    return await fetchRandomMeal();
  }
);

const randomMealSlice = createSlice({
  name: "meals",
  initialState: {
    randomMeal: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRandomMealAction.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(fetchRandomMealAction.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.randomMeal = action.payload;
    });

    builder.addCase(fetchRandomMealAction.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const randomMealReducer = randomMealSlice.reducer;
