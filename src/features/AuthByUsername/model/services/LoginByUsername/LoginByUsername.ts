import { createAsyncThunk } from '@reduxjs/toolkit';
import { User, userActions } from '@/entities/User';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localStorage';

interface LoginByUsernameProps {
    username: string;
    password: string;
}

//! то, что мы возвращаем, аргумент, конфиг со значениями ответа
export const loginByUsername = createAsyncThunk<
    User,
    LoginByUsernameProps,
    ThunkConfig<string>
>(
    'login/loginByUsername',
    async (authData, { extra, dispatch, rejectWithValue }) => {
        try {
            const response = await extra.api.post<User>('/login', authData);

            if (!response.data) {
                throw new Error();
            }

            localStorage.setItem(
                USER_LOCALSTORAGE_KEY,
                JSON.stringify(response.data)
            );

            dispatch(userActions.setAuthData(response.data));

            return response.data;
        } catch (error: any) {
            console.log(error);
            //   (error as AxiosError).response?.data?.message не работает из за того что в типе нету message
            return rejectWithValue(error.response?.data?.message);
        }
    }
);
