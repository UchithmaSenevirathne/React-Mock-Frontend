import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {Log} from "../models/Log.ts";

interface LogState {
    logs: Log[];
    alertType: string;
}

const initialState: LogState = {
    logs: [],
    alertType: 'Log saved successfully!',
};

const logSlice = createSlice({
    name: 'log',
    initialState,
    reducers: {
        setLogs: (state, action: PayloadAction<Log[]>) => {
            state.logs = action.payload;
        },
        addLog: (state, action: PayloadAction<Log>) => {
            state.logs.push(action.payload);
        },
        updateLog: (state, action: PayloadAction<Log>) => {
            const index = state.logs.findIndex(log => log.logCode === action.payload.logCode);
            if (index !== -1) {
                state.logs[index] = action.payload;
            }
        },
        deleteLog: (state, action: PayloadAction<string>) => {
            state.logs = state.logs.filter((log) => log.logCode !== action.payload);
        },
        setAlertType: (state, action: PayloadAction<string>) => {
            state.alertType = action.payload;
        },
    },
});

export const { setLogs, addLog, updateLog, deleteLog, setAlertType } = logSlice.actions;
export default logSlice.reducer;
