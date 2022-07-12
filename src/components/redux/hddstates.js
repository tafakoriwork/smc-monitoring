import { createSlice } from '@reduxjs/toolkit'

export const hddStates = createSlice({
  name: 'hdd',
  initialState: {
    totalSize: [],
    freeSize: [],
    usedSize: [],
    mounted: null,
  },
  reducers: {
    setTotalSize: (state, action) => {
        state.totalSize = action.payload;
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
  },
})

export const { setTotalSize, setFreeSize, setUsedSize, shiftAll, setMounted } = hddStates.actions

export const totalSize = (state) => state.hdd.totalSize;
export const freeSize = (state) => state.hdd.freeSize;
export const usedSize = (state) => state.hdd.usedSize;
export const Mounted = (state) => state.hdd.mounted;
export default hddStates.reducer;
