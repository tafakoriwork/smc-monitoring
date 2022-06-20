import { createSlice } from '@reduxjs/toolkit'

export const cpuStates = createSlice({
  name: 'cpu',
  initialState: {
    information: [],
    speedInformation: [],
  },
  reducers: {
    setInformation: (state, action) => {
        state.information = action.payload
    },
    shiftInformation: (state) => {
      const temp = state.information;
      temp.splice(0, 1)
        state.information = temp
    },
    setspeedInformation: (state, action) => {
        state.speedInformation = action.payload
    },
    shiftspeedInformation: (state) => {
      const temp = state.speedInformation;
      temp.splice(0, 1)
        state.speedInformation = temp
    },
  },
})

export const { setInformation, shiftInformation, shiftspeedInformation, setspeedInformation } = cpuStates.actions

export const information = (state) => state.cpu.information;
export const speedInformation = (state) => state.cpu.speedInformation;
export default cpuStates.reducer;
