import { createSlice } from "@reduxjs/toolkit";

const poolSlices = createSlice({
  name: "pool",
  initialState: {
    details: {
      pool_name: null,
      crush_rule: null,
      application: null,
    },
    total: {
      size: null,
      type: null,
    },
    used: {
      size: null,
      type: null,
    },
    available: {
      size: null,
      type: null,
      percentage: null,
    },
    pool_size: null,
    pool_min_size: null,
    Maximum: {
      size: null,
      type: null,
    },
    reloader: null,
  },
  reducers: {
    setData: (state, action) => {
      state.total.type = null;
      state.total.size = null;
      state.used.type = null;
      state.used.size = null;
      state.available.size = null;
      state.available.type = null;
      state.available.percentage = null;
      state.details.pool_name = null;
      state.details.crush_rule = null;
      state.details.application = null;
      state.Maximum.size = null;
      state.Maximum.type = null;
      state.pool_size = null;
      state.pool_min_size = null;

      state.total.type = action.payload.total.type;
      state.total.size = action.payload.total.size;
      state.used.type = action.payload.used.type;
      state.used.size = action.payload.used.size;
      state.available.size = action.payload.available.size;
      state.available.type = action.payload.available.type;
      state.available.percentage = action.payload.available.percentage;
      state.details.pool_name = action.payload.details.pool_name;
      state.details.crush_rule = action.payload.details.crush_rule;
      state.details.application = action.payload.details.application;
      state.Maximum.size = action.payload.maximum.size;
      state.Maximum.type = action.payload.maximum.type;
      state.pool_size = action.payload.pool_min;
      state.pool_min_size = action.payload.pool_min_size;
      state.reloader = Math.random()
    },
  },
});

export const { setData } = poolSlices.actions;

export const _Details = (state) => state.pool.details;
export const _Total = (state) => state.pool.total;
export const _Used = (state) => state.pool.used;
export const _Available = (state) => state.pool.available;
export const _pool_min = (state) => state.pool.pool_size;
export const _Poolminsize = (state) => state.pool.pool_min_size;
export const _Maximum = (state) => state.pool.Maximum;
export const _Reloader = (state) => state.pool.reloader;

export default poolSlices.reducer;
