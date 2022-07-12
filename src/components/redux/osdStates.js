import { createSlice } from "@reduxjs/toolkit";

const osdSlices = createSlice({
  name: "osd",
  initialState: {
    details: {
      id: null,
      class: null,
      status: null,
      Hosts_Number: null,
    },
    total: {
      size: null,
      type: null,
    },
    used: {
      size: null,
      type: null,
      percentage: null,
    },
    available: {
      size: null,
      type: null,
    },
    weight: null,
    reweight: null,
  },
  reducers: {
    setTotal: function (state, action) {
      state.total = action.payload;
    },
    setUsed: function (state, action) {
      state.used = action.payload;
    },
    setAvailable: function (state, action) {
      state.available = action.payload
    },
    setWeight: function (state, action) {
      state.weight = action.payload
    },
    setReweight: function (state, action) {
      state.reweight = action.payload
    },
    setDetils: function (state, action) {
      state.details.id = action.payload.id;
      state.details.class = action.payload.class;
      state.details.status = action.payload.status;
      state.details.Hosts_Number = action.payload.Hosts_Number;
    },
  },
});

export const {
  setTotal,
  setUsed,
  setAvailable,
  setWeight,
  setReweight,
  setDetils,
} = osdSlices.actions;

export const _Details = state => state.osd.details;
export const _Total = state => state.osd.total;
export const _Used = state => state.osd.used;
export const _Available = state => state.osd.available;
export const _Weight = state => state.osd.weight;
export const _Reweight = state => state.osd.reweight;

export default osdSlices.reducer;