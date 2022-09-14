import { createSlice } from "@reduxjs/toolkit";
import { signIn, signUp } from "../APIs/userAPIs";

const enterSlice = createSlice({
  name: "enter",
  initialState: {
    isLoading: {
      signUp: false,
      signIn: false,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.isLoading.signUp = true;
      })
      .addCase(signUp.fulfilled, (state) => {
        state.isLoading.signUp = false;
      })
      .addCase(signIn.pending, (state) => {
        state.isLoading.signIn = true;
      })
      .addCase(signIn.fulfilled, (state) => {
        state.isLoading.signIn = false;
      });
  },
});

export default enterSlice.reducer;
