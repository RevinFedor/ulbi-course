import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';

import { getProfileForm } from '../selectors/profile';
import { validateProfileData } from './validateProfileData';
import { Profile } from '@/entities/Profile';
import { ValidateProfileError } from '../types/editableProfileCardSchema';

//! put запрос на обновления данных профиля
export const updateProfileData = createAsyncThunk<
  Profile,
  string | undefined,
  ThunkConfig<ValidateProfileError[]>
>('profile/updateProfileData', async (_, thunkApi) => {
  const { extra, rejectWithValue, getState } = thunkApi;

  const formData = getProfileForm(getState());

  const errors = validateProfileData(formData);

  if (errors.length) {
    return rejectWithValue(errors);
  }

  try {
    const response = await extra.api.put<Profile>(
      `/profile/${formData?.id}`,
      formData,
    );

    return response.data;
  } catch (e) {
    console.log(e);
    return rejectWithValue([ValidateProfileError.SERVER_ERROR]);
  }
});
