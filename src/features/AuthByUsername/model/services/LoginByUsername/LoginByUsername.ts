import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { User, userActions } from 'src/entities/User';

interface LoginByUsernameProps {
    username: string;
    password: string;
}

// то, что мы возвращаем, аргумент, конфиг со значениями ответа
export const loginByUsername = createAsyncThunk<
    User,
    LoginByUsernameProps // { rejectValue: string }
>(
    'login/loginByUsername',
    async (authData,  { extra, dispatch, rejectWithValue }) => {
        try {            
            //@ts-ignore
            const response = await extra.api.post<User>('/login', authData);

            if (!response.data) {
                throw new Error();
            }

            localStorage.setItem('User', JSON.stringify(response.data));

            dispatch(userActions.setAuthData(response.data));

            return response.data;
        } catch (error: any) {
            console.log(error);
            //   (error as AxiosError).response?.data?.message не работает из за того что в типе нету message
            return rejectWithValue(error.response?.data?.message);
        }
    }
);
