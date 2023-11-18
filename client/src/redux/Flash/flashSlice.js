import { createSlice } from "@reduxjs/toolkit";

const initialFlashState = {
  flashInfo: null,
};

const flashSlice = createSlice({
  name: "flash",
  initialState: initialFlashState,
  reducers: {
    flashAction: (state, action) => {
      state.flashInfo = action.payload;
    },
  },
});

export const { flashAction } = flashSlice.actions;

export default flashSlice.reducer;
