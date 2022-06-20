import { createSlice } from "@reduxjs/toolkit";
import * as cpustore from "./cpuStates";
export const routingSlice = createSlice({
  name: "routing",
  initialState: {
    panel: null,
    managementPanelTab: "Setting",
    monitoringPanelTab: "CPU",
    nodeIp: null,
  },
  reducers: {
    setPanel: (state, action) => {
      state.panel = action.payload;
    },
    setMonitoringPanelTab: (state, action) => {
      state.monitoringPanelTab = action.payload;
    },
    setManagementPanelTab: (state, action) => {
      state.managementPanelTab = action.payload;
    },
    setNodeIP: (state, action) => {
      cpustore.cpuStates.actions.setspeedInformation([]);
      state.nodeIp = action.payload;
    },
  },
});

export const {
  setPanel,
  setMonitoringPanelTab,
  setManagementPanelTab,
  setNodeIP,
} = routingSlice.actions;
export const currentPanel = (state) => state.routing.panel;
export const MonitoringCurrentPanel = (state) =>
  state.routing.monitoringPanelTab;
export const ManagementCurrentPanel = (state) =>
  state.routing.managementPanelTab;
export const nodeIp = (state) => state.routing.nodeIp;

export default routingSlice.reducer;
