import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {Crop} from "../models/Crop.ts";

interface CropState {
    crops: Crop[];
    alertType: string;
}

const initialState: CropState = {
    crops: [],
    alertType: 'Field saved successfully!',
};

const cropSlice = createSlice({
    name: 'crop',
    initialState,
    reducers: {
        setCrops: (state, action: PayloadAction<Crop[]>) => {
            state.crops = action.payload;
        },
        addCrop: (state, action: PayloadAction<Crop>) => {
            state.crops.push(action.payload);
        },
        updateCrop: (state, action: PayloadAction<Crop>) => {
            const index = state.crops.findIndex(crop => crop.cropCode === action.payload.cropCode);
            if (index !== -1) {
                state.crops[index] = action.payload;
            }
        },
        deleteCrop: (state, action: PayloadAction<string>) => {
            // Removing the field by its fieldCode
            state.crops = state.crops.filter((crop) => crop.cropCode !== action.payload);
        },
        setAlertType: (state, action: PayloadAction<string>) => {
            state.alertType = action.payload;
        },
    },
});

export const { setCrops, addCrop, updateCrop, deleteCrop, setAlertType } = cropSlice.actions;
export default cropSlice.reducer;
