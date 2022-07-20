import { createSlice } from '@reduxjs/toolkit'

export const hddStates = createSlice({
  name: 'hdd',
  initialState: {
    totalSize: [],
    freeSize: [],
    usedSize: [],
    mounted: null,
    rloader: null,
    fs: null,
  },
  reducers: {
    setTotalSize: (state, action) => {
        state.totalSize = action.payload;
        state.reloader = Math.random()
        console.log(action.payload);
    },
    setFreeSize: (state, action) => {
        state.freeSize = action.payload;
    },
    setUsedSize: (state, action) => {
        state.usedSize = action.payload;
    },
    shiftAll: (state) => {
        const totalTemp = state.totalSize;
        const freeTemp = state.freeSize;
        const usedTemp = state.usedSize;
        totalTemp.splice(0, 1);
        freeTemp.splice(0, 1);
        usedTemp.splice(0, 1);
        state.totalSize = totalTemp;
        state.freeSize = freeTemp;
        state.usedSize = usedTemp;
    },
    setMounted: (state, action) => {
      state.mounted = action.payload;
  },
    setFS: (state, action) => {
      state.fs = action.payload;
  },
  },
})

export const { setTotalSize, setFreeSize, setUsedSize, shiftAll, setMounted, setFS } = hddStates.actions

export const totalSize = (state) => state.hdd.totalSize;
export const freeSize = (state) => state.hdd.freeSize;
export const usedSize = (state) => state.hdd.usedSize;
export const Mounted = (state) => state.hdd.mounted;
export const reloader = (state) => state.hdd.reloader;
export const _fs = (state) => state.hdd.fs;
export default hddStates.reducer;
