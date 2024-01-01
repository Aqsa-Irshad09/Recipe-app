import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiGetUserById, apiRegisterUser } from "../../api/apiRegisterUser";

export const registerUser = createAsyncThunk(
  "register_users/registerUser",
  async (userData, thunkAPI) => {
    try {
      const response = await apiRegisterUser(userData);
      return response; // Assuming the response contains the complete user object
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const fetchUser = createAsyncThunk(
  "register_users/fetchUser",
  async (userData, thunkAPI) => {
    try {
      const response = await apiGetUserById();
      console.log("user from user slice", response);
      return response; // Assuming the response contains the user object based on userId
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const registerUserSlice = createSlice({
  name: "register_users",
  initialState: {
    user: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        // localStorage.setItem("user", JSON.stringify(state.user));
        const users = JSON.parse(localStorage.getItem("users")) || [];
        users.push(state.user);
        localStorage.setItem("users", JSON.stringify(users));
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; // Error message from the rejected promise
      })
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message; // Store the error message in state for further debugging
      });
  },
});
export const {} = registerUserSlice.actions;
export default registerUserSlice.reducer;
