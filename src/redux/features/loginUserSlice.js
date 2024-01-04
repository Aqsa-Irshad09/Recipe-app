import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiLoginUser } from "../../api/apiLoginUser";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, thunkAPI) => {
    try {
      const response = await apiLoginUser(userData);

      if (response) {
        alert("User logged in successfully");

        return response;
      } else {
        alert("Failed to login user");
        throw new Error("Failed to login user");
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const loginUserSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    status: "idle",
    error: null,
  },
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
        state.error = action.payload;
      });
  },
});

export default loginUserSlice.reducer;
