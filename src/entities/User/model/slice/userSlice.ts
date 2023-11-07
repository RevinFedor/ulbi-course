import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { User, UserSchema } from '../types/UserSchema';

const initialState: UserSchema = {};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<User>) => {
            state.authData = action.payload;
        },
        initAuthData: (state) => {
            const user = localStorage.getItem('User');
            console.log(user);
            
            if (user) {
                state.authData = JSON.parse(user);
            }
        },
        logout: (state) => {
            state.authData = undefined;
            localStorage.removeItem('User');
        },
    },
});

export const { actions: userActions } = userSlice;

export const { reducer: userReducer } = userSlice;
