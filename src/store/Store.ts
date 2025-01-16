import { configureStore } from '@reduxjs/toolkit';
import fieldReducer from '../reducers/FieldSlice.ts';
import cropReducer from '../reducers/CropSlice.ts';
import staffReducer from '../reducers/StaffSlice.ts';
import logReducer from '../reducers/LogSlice.ts';
import equipmentReducer from '../reducers/EquipmentSlice.ts';
import vehicleReducer from '../reducers/VehicleSlice.ts';

export const store = configureStore({
    reducer: {
        field: fieldReducer,
        crop: cropReducer,
        staff: staffReducer,
        log: logReducer,
        equipment: equipmentReducer,
        vehicle: vehicleReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
