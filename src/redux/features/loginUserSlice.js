import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiLoginUser } from "../../api/apiLoginUser";

const initialState = {
  user: null,
  status: "idle",
  error: null,
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, thunkAPI) => {
    try {
      const response = await apiLoginUser(userData);

      if (response) {
        localStorage.setItem("isLoggedIn", "true"); // Set logged-in status in localStorage
        return response;
      } else {
        throw new Error("Failed to login user");
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const loginSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; // Error message from the rejected promise
      });
  },
});

export default loginSlice.reducer;
