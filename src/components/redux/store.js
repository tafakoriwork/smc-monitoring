import { configureStore } from '@reduxjs/toolkit';
import coreReducer from './coreStates';
import cpuReducer from './cpuStates';
import hddReducer from './hddstates';
import nicReducer from './nicStates';
import routingReducer from './routingSlice';
import serviceReducer from './serviceSlice';
import userReducer from './usersSlice';
import osdReducer from './osdStates';
import ramReducer from './ramStates';
import poolReducer from './poolStates';
import lunReducer from './lunStates';
export default configureStore({
  reducer: {
    routing: routingReducer,
    cpu: cpuReducer,
    core: coreReducer,
    user: userReducer,
    hdd: hddReducer,
    nic: nicReducer,
    service: serviceReducer,
    osd: osdReducer,
    ram: ramReducer,
    pool: poolReducer,
    lun: lunReducer,
  },
});
