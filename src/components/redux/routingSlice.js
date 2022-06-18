import { createSlice } from '@reduxjs/toolkit'

export const routingSlice = createSlice({
  name: 'routing',
  initialState: {
    panel: null,
    managementPanelTab: "Setting",
    monitoringPanelTab: "CPU",
  },
  reducers: {
    setPanel: (state, action) => {
        state.panel = action.payload
    },
    setMonitoringPanelTab: (state, action) => {
        state.monitoringPanelTab = action.payload
    },
    setManagementPanelTab: (state, action) => {
        state.managementPanelTab = action.payload
    },
  },
})

export const { setPanel, setMonitoringPanelTab, setManagementPanelTab } = routingSlice.actions

export const currentPanel = (state) => state.routing.panel
export const MonitoringCurrentPanel = (state) => state.routing.monitoringPanelTab
export const ManagementCurrentPanel = (state) => state.routing.managementPanelTab

export default routingSlice.reducer
