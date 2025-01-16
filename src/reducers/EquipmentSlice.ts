import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {Equipment} from "../models/Equipment.ts";

interface EquipmentState {
    equipments: Equipment[];
    alertType: string;
}

const initialState: EquipmentState = {
    equipments: [],
    alertType: 'Log saved successfully!',
};

const equipmentSlice = createSlice({
    name: 'equipment',
    initialState,
    reducers: {
        setEquipments: (state, action: PayloadAction<Equipment[]>) => {
            state.equipments = action.payload;
        },
        addEquipment: (state, action: PayloadAction<Equipment>) => {
            state.equipments.push(action.payload);
        },
        updateEquipment: (state, action: PayloadAction<Equipment>) => {
            const index = state.equipments.findIndex(equipment => equipment.equipmentID === action.payload.equipmentID);
            if (index !== -1) {
                state.equipments[index] = action.payload;
            }
        },
        deleteEquipment: (state, action: PayloadAction<string>) => {
            // Removing the field by its fieldCode
            state.equipments = state.equipments.filter((equipment) => equipment.equipmentID !== action.payload);
        },
        setAlertType: (state, action: PayloadAction<string>) => {
            state.alertType = action.payload;
        },
    },
});

export const { setEquipments, addEquipment, updateEquipment, deleteEquipment, setAlertType } = equipmentSlice.actions;
export default equipmentSlice.reducer;
