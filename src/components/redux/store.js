import { configureStore } from '@reduxjs/toolkit';
import cpuReducer from './cpuStates';
import routingReducer from './routingSlice';

export default configureStore({
  reducer: {
    routing: routingReducer,
    cpu: cpuReducer,
  },
});
