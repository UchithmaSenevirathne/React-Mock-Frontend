import { configureStore } from '@reduxjs/toolkit';
import fieldReducer from '../reducers/FieldSlice.ts';
import cropReducer from '../reducers/CropSlice.ts'
import staffReducer from '../reducers/StaffSlice.ts'

export const store = configureStore({
    reducer: {
        field: fieldReducer,
        crop: cropReducer,
        staff: staffReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
