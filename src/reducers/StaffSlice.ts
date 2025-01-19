import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {Staff} from "../models/Staff.ts";

interface StaffState {
    staffs: Staff[];
    alertType: string;
}

const initialState: StaffState = {
    staffs: [],
    alertType: 'Staff saved successfully!',
};

const staffSlice = createSlice({
    name: 'staff',
    initialState,
    reducers: {
        setStaffs: (state, action: PayloadAction<Staff[]>) => {
            state.staffs = action.payload;
        },
        addStaff: (state, action: PayloadAction<Staff>) => {
            state.staffs.push(action.payload);
        },
        updateStaff: (state, action: PayloadAction<Staff>) => {
            const index = state.staffs.findIndex(staff => staff.staffId === action.payload.staffId);
            if (index !== -1) {
                state.staffs[index] = action.payload;
            }
        },
        deleteStaff: (state, action: PayloadAction<string>) => {
            state.staffs = state.staffs.filter((staff) => staff.staffId !== action.payload);
        },
        setAlertType: (state, action: PayloadAction<string>) => {
            state.alertType = action.payload;
        },
    },
});

export const { setStaffs, addStaff, updateStaff, deleteStaff, setAlertType } = staffSlice.actions;
export default staffSlice.reducer;
