import { configureStore } from '@reduxjs/toolkit';
import cpuReducer from './cpuStates';
import routingReducer from './routingSlice';
import userReducer from './usersSlice';

export default configureStore({
  reducer: {
    routing: routingReducer,
    cpu: cpuReducer,
    user: userReducer,
  },
});
