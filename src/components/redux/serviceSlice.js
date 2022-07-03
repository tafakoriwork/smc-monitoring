import { createSlice } from "@reduxjs/toolkit";

export const serviceSlice = createSlice({
  name: "service",
  initialState: {
    actives: [],
    inactives: [],
    runnings: [],
    deads: [],
    exiteds: [],
    loadeds: [],
    notFounds: [],
  },
  reducers: {
    setInactives: (state, action) => {
      state.inactives = action.payload;
      console.log(state.inactives);
    },
    setActives: (state, action) => {
      state.actives = action.payload;
    },
    setRunning: (state, action) => {
      state.runnings = action.payload;
    },
    setDead: (state, action) => {
      state.deads = action.payload;
    },
    setNotFound: (state, action) => {
      state.notFounds = action.payload;
    },
    setExited: (state, action) => {
      state.exiteds = action.payload;
    },
    setLoaded: (state, action) => {
      state.loadeds = action.payload;
    },
  },
});

export const {
  setInactives,
  setActives,
  setRunning,
  setDead,
  setNotFound,
  setExited,
  setLoaded,
} = serviceSlice.actions;
export const _inactives = (state) => state.service.inactives;
export const _actives = (state) => state.service.actives;
export const _deads = (state) => state.service.deads;
export const _exiteds = (state) => state.service.exiteds;
export const _loadeds = (state) => state.service.loadeds;
export const _notfounds = (state) => state.service.notFounds;
export const _runnings = (state) => state.service.runnings;

export default serviceSlice.reducer;
