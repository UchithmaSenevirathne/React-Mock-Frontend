import { configureStore } from '@reduxjs/toolkit';
import fieldReducer from '../reducers/FieldSlice.ts';
import cropReducer from '../reducers/CropSlice.ts';
import staffReducer from '../reducers/StaffSlice.ts';
import logReducer from '../reducers/LogSlice.ts';

export const store = configureStore({
    reducer: {
        field: fieldReducer,
        crop: cropReducer,
        staff: staffReducer,
        log: logReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
