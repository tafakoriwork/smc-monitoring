import { createSlice } from '@reduxjs/toolkit'

export const routingSlice = createSlice({
  name: 'routing',
  initialState: {
    panel: "Monitoring",
    panelTab: null,
  },
  reducers: {
    setPanel: (state, action) => {
        state.panel = action.payload
        state.panelTab = null
    },

    setPanelTab: (state, action) => {
        state.panelTab = action.payload
    },
  },
})

export const { setPanel, setPanelTab } = routingSlice.actions

export const currentPanel = (state) => state.routing.panel
export const currentPanelTab = (state) => state.routing.panelTab

export default routingSlice.reducer
