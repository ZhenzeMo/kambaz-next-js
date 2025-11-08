import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AddPayload {
  a: number;
  b: number;
}

const initialState = {
  sum: 0,
};

const addSlice = createSlice({
  name: "add",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<AddPayload>) => {
      state.sum = action.payload.a + action.payload.b;
    },
  },
});

export const { add } = addSlice.actions;
export default addSlice.reducer;

