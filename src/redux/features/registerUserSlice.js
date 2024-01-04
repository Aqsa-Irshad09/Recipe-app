import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { checkExistingEmail, registerNewUser } from "../../api/apiRegisterUser";

export const registerUser = createAsyncThunk(
  "register_users/registerUser",
  async (userData, thunkAPI) => {
    try {
      const emailExists = await checkExistingEmail(userData.email);

      if (emailExists) {
        alert(`Email already exists`);
        return thunkAPI.rejectWithValue({ message: "Email already exists" });
      }

      const response = await registerNewUser(userData);
      alert(`User registration successful`);
      return response;
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
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});
export const {} = registerUserSlice.actions;
export default registerUserSlice.reducer;
