import { createSlice } from '@reduxjs/toolkit'

export const lunStates = createSlice({
  name: 'lun',
  initialState: {
    available: {
        size: null,
        type: null,
    },
    used: {
        size: null,
        type: null,
    },
    reloader: null,
  },
  reducers: {
    setAvailable: (state, action) => {
        state.available = action.payload;
        state.reloader = Math.random();
    },
    setUsed: (state, action) => {
        state.used = action.payload;
    },
  },
})

export const { setAvailable, setUsed } = lunStates.actions

export const _available = (state) => state.lun.available;
export const _used = (state) => state.lun.used;
export const reloader = (state) => state.lun.reloader;
export default lunStates.reducer;
