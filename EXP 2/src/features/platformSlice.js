import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPlatform: "Twitter",

  platforms: [
    "Twitter",
    "LinkedIn",
    "Instagram",
    "Facebook",
  ],
};

const platformSlice = createSlice({
  name: "platform",

  initialState,

  reducers: {

    changePlatform: (state, action) => {
      state.currentPlatform = action.payload;
    },

  },
});

export const {
  changePlatform,
} = platformSlice.actions;

export default platformSlice.reducer;