import { createSlice } from "@reduxjs/toolkit";
import * as cpustore from "./cpuStates";

function hideOthernodes(id){
  const nodes = document.getElementsByClassName('active-li');
  for (let i = 0; i < nodes.length; i++) {
    if(nodes[i].id !== id)
    nodes[i].id.startsWith('node_') && nodes[i].classList.remove('active-li')
    else nodes[i].id.startsWith('node_') && nodes[i].classList.add('active-li')
    }
}
export const routingSlice = createSlice({
  name: "routing",
  initialState: {
    panel: null,
    managementPanelTab: null,
    monitoringPanelTab: null,
    nodeIp: null,
    selectedBrowser: {},
    currentNode: null,
    currentCluster: null,
  },
  reducers: {
    setPanel: (state, action) => {
      state.panel = action.payload;
    },
    setMonitoringPanelTab: (state, action) => {
      state.monitoringPanelTab = action.payload;
      hideOthernodes(action.payload.id);
    },
    setManagementPanelTab: (state, action) => {
      state.managementPanelTab = action.payload;
    },
    setSelectedBrowser: (state, action) => {
      state.selectedBrowser = action.payload;
    },
    setNodeIP: (state, action) => {
      state.nodeIp = action.payload.ip;
      state.currentNode = action.payload.id;
      cpustore.cpuStates.actions.setspeedInformation([]);
      hideOthernodes(action.payload.id);
    },
    setCluster: (state, action) => {
      state.currentCluster = action.payload
    }
  },
});

export const {
  setPanel,
  setMonitoringPanelTab,
  setManagementPanelTab,
  setNodeIP,
  setSelectedBrowser,
  setCluster,
} = routingSlice.actions;
export const currentPanel = (state) => state.routing.panel;
export const MonitoringCurrentPanel = (state) =>
  state.routing.monitoringPanelTab;
export const ManagementCurrentPanel = (state) =>
  state.routing.managementPanelTab;
export const nodeIp = (state) => state.routing.nodeIp;
export const selectedBrowser = (state) => state.routing.selectedBrowser;
export const currentNode = (state) => state.routing.currentNode;
export const currentCluster = (state) => state.routing.currentCluster;

export default routingSlice.reducer;
