import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User} from "../models/User.ts";

interface UserState {
    user: User[];
    alertType: string;
}

const initialState: UserState = {
    user: [],
    alertType: 'User Registered successfully!',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        registerUser: (state, action: PayloadAction<User>) => {
            state.user.push(action.payload); // Add new user to the state
        },
    },
});

export const { registerUser } = userSlice.actions;
export default userSlice.reducer;
