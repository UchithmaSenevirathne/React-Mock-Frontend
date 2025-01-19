import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {AssignField} from "../models/AssignField.ts";

interface AssignState {
    assigns: AssignField[];
    alertType: string;
}

const initialState: AssignState = {
    assigns: [],
    alertType: 'Field Assigned successfully!',
};

const assignFieldSlice = createSlice({
    name: 'assigns',
    initialState,
    reducers: {
        setAssigns: (state, action: PayloadAction<AssignField[]>) => {
            state.assigns = action.payload;
        },
        addAssign: (state, action: PayloadAction<AssignField>) => {
            state.assigns.push(action.payload);
        },
        updateAssign: (state, action: PayloadAction<AssignField>) => {
            const index = state.assigns.findIndex(assign => assign.assignCode === action.payload.assignCode);
            if (index !== -1) {
                state.assigns[index] = action.payload;
            }
        },
        deleteAssign: (state, action: PayloadAction<string>) => {
            // Removing the field by its fieldCode
            state.assigns = state.assigns.filter((assign) => assign.assignCode !== action.payload);
        },
        setAlertType: (state, action: PayloadAction<string>) => {
            state.alertType = action.payload;
        },
    },
});

export const { setAssigns, addAssign, updateAssign, deleteAssign, setAlertType } = assignFieldSlice.actions;
export default assignFieldSlice.reducer;
