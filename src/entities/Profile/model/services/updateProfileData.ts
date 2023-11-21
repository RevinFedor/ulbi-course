import { createAsyncThunk } from '@reduxjs/toolkit';
import { StateSchema, ThunkConfig } from '@/app/providers/StoreProvider';

import { Profile } from '../..';
import { getProfileForm } from '../selectors/getProfileForm/getProfileForm';
import { validateProfileData } from './validateProfileData';
import { ValidateProfileError } from '../types/profile';

//! put запрос на обновления данных профиля
export const updateProfileData = createAsyncThunk<
    Profile,
    string | undefined,
    ThunkConfig<ValidateProfileError[]>
>('profile/updateProfileData', async (ProfileId, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi;

    const formData = getProfileForm(getState());

    const errors = validateProfileData(formData);

    if (errors.length) {
        return rejectWithValue(errors);
    }

    try {
        const response = await extra.api.put<Profile>(
            `/profile/${ProfileId}`,
            formData
        );

        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue([ValidateProfileError.SERVER_ERROR]);
    }
});
