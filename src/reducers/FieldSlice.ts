import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {Field} from "../models/Field.ts";

interface FieldState {
    fields: Field[];
    alertType: string;
}

const initialState: FieldState = {
    fields: [],
    alertType: 'Field saved successfully!',
};

const fieldSlice = createSlice({
    name: 'field',
    initialState,
    reducers: {
        setFields: (state, action: PayloadAction<Field[]>) => {
            state.fields = action.payload;
        },
        addField: (state, action: PayloadAction<Field>) => {
            state.fields.push(action.payload);
        },
        updateField: (state, action: PayloadAction<Field>) => {
            const index = state.fields.findIndex(field => field.fieldCode === action.payload.fieldCode);
            if (index !== -1) {
                state.fields[index] = action.payload;
            }
        },
        deleteField: (state, action: PayloadAction<string>) => {
            // Removing the field by its fieldCode
            state.fields = state.fields.filter((field) => field.fieldCode !== action.payload);
        },
        setAlertType: (state, action: PayloadAction<string>) => {
            state.alertType = action.payload;
        },
    },
});

export const { setFields, addField, updateField, deleteField, setAlertType } = fieldSlice.actions;
export default fieldSlice.reducer;
