import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {Vehicle} from "../models/Vehicle.ts";

interface VehicleState {
    vehicles: Vehicle[];
    alertType: string;
}

const initialState: VehicleState = {
    vehicles: [],
    alertType: 'Vehicle saved successfully!',
};

const vehicleSlice = createSlice({
    name: 'vehicle',
    initialState,
    reducers: {
        setVehicles: (state, action: PayloadAction<Vehicle[]>) => {
            state.vehicles = action.payload;
        },
        addVehicle: (state, action: PayloadAction<Vehicle>) => {
            state.vehicles.push(action.payload);
        },
        updateVehicle: (state, action: PayloadAction<Vehicle>) => {
            const index = state.vehicles.findIndex(vehicle => vehicle.vehicleID === action.payload.vehicleID);
            if (index !== -1) {
                state.vehicles[index] = action.payload;
            }
        },
        deleteVehicle: (state, action: PayloadAction<string>) => {
            // Removing the field by its fieldCode
            state.vehicles = state.vehicles.filter((vehicle) => vehicle.vehicleID !== action.payload);
        },
        setAlertType: (state, action: PayloadAction<string>) => {
            state.alertType = action.payload;
        },
    },
});

export const { setVehicles, addVehicle, updateVehicle, deleteVehicle, setAlertType } = vehicleSlice.actions;
export default vehicleSlice.reducer;
