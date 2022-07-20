import { createSlice } from "@reduxjs/toolkit";

export const ramStates = createSlice({
  name: "ram",
  initialState: {
    available: null,
    total: null,
    used: null,
    reloader: null,
  },
  reducers: {
    setAvailable: (state, action) => {
      state.available = action.payload;
      state.reloader = Math.random();
    },
    setTotal: (state, action) => {
      state.total = action.payload;
    },
    setUsed: (state, action) => {
      state.used = action.payload;
    },
  },
});

export const { setAvailable, setTotal, setUsed } = ramStates.actions;

export const available = (state) => state.ram.available;
export const total = (state) => state.ram.total;
export const used = (state) => state.ram.used;
export const reloader = (state) => state.ram.reloader;
export default ramStates.reducer;
