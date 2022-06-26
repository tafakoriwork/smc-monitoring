import { createSlice } from "@reduxjs/toolkit";

export const nicStates = createSlice({
  name: "nic",
  initialState: {
    metric: [],
    totalReceivedBandwidth: [],
    totalSentBandwidth: [],
    currentReceivedBandwidth: [],
    currentSentBandwidth: [],
  },
  reducers: {
    setCurrentReceivedBandwidth: (state, action) => {
      state.currentReceivedBandwidth = action.payload;
    },
    setTotalReceivedBandwidth: (state, action) => {
      state.totalReceivedBandwidth = action.payload;
    },
    setTotalSentBandwidth: (state, action) => {
      state.totalSentBandwidth = action.payload;
    },
    setCurrentSentBandwidth: (state, action) => {
      state.currentSentBandwidth = action.payload;
    },
    setMetric: (state, action) => {
        state.metric = action.payload;
    },
    shiftAll: (state) => {
      const TRB = state.totalReceivedBandwidth;
      const TSB = state.totalSentBandwidth;
      const CSB = state.currentSentBandwidth;
      const CRB = state.currentReceivedBandwidth;
      const METRIC = state.metric;
      TRB.splice(0, 1);
      TSB.splice(0, 1);
      CSB.splice(0, 1);
      CRB.splice(0, 1);
      METRIC.splice(0, 1);
      state.totalReceivedBandwidth = TRB;
      state.totalSentBandwidth = TSB;
      state.currentReceivedBandwidth = CRB;
      state.currentSentBandwidth = CSB;
      state.metric = METRIC;
    },
  },
});

export const {
    setCurrentReceivedBandwidth,
    setTotalReceivedBandwidth,
    setTotalSentBandwidth,
    shiftAll,
    setMetric,
    setCurrentSentBandwidth
} = nicStates.actions;

export const Metric = (state) => state.nic.metric;
export const TotalReceivedBandwidth = (state) => state.nic.totalReceivedBandwidth;
export const TotalSentBandwidth = (state) => state.nic.totalSentBandwidth;
export const CurrentReceivedBandwidth = (state) => state.nic.currentReceivedBandwidth;
export const CurrentSentBandwidth = (state) => state.nic.currentSentBandwidth;
export default nicStates.reducer;
