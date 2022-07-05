import { createSlice } from '@reduxjs/toolkit'

export const coreStates = createSlice({
  name: 'core',
  initialState: {
    information: [],
    speedInformation: [],
  },
  reducers: {
    setInformation: (state, action) => {
        state.information = action.payload;
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

export const { setInformation, shiftInformation, shiftspeedInformation, setspeedInformation } = coreStates.actions

export const information = (state) => state.core.information;
export const speedInformation = (state) => state.core.speedInformation;
export default coreStates.reducer;
