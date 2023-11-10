import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { User, userActions } from '@/entities/User';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Profile } from '../types/profile';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localStorage';


// get запрос на профиль
export const fetchProfileData = createAsyncThunk<
    Profile,
    void,
    ThunkConfig<string>
>(
    'profile/fetchProfileData',
    async (_, { extra, dispatch, rejectWithValue }) => {
        try {
            const response = await extra.api.get<Profile>('/profile');

            if (!response.data) {
                throw new Error();
            }


            return response.data;
        } catch (error: any) {
            console.log(error);
            //   (error as AxiosError).response?.data?.message не работает из за того что в типе нету message
            return rejectWithValue(error.response?.data?.message);
        }
    }
);
