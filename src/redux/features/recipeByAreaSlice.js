import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAreas = createAsyncThunk("areas/fetchAreas", async () => {
  try {
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
    );
    const data = await response.json();
    return data.meals; // Assuming the API response contains areas array
  } catch (error) {
    throw new Error("Failed to fetch areas");
  }
});

const areasSlice = createSlice({
  name: "areas",
  initialState: {
    areas: [],
    status: "idle",
    error: null,
  },
  reducers: {
    // Other reducers can be added if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAreas.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAreas.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.areas = action.payload;
      })
      .addCase(fetchAreas.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default areasSlice.reducer;

// Export the async action creator for use in components
