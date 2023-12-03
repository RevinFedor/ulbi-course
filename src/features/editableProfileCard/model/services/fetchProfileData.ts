import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Profile } from '@/entities/Profile';

//! get запрос на получения одного профиля
export const fetchProfileData = createAsyncThunk<
  Profile,
  string,
  ThunkConfig<string>
>(
  'profile/fetchProfileData',
  async (profileId, { extra, dispatch, rejectWithValue }) => {
    try {
      const response = await extra.api.get<Profile>(`/profile/${profileId}`);

      if (!response.data) {
        throw new Error();
      }

      return response.data;
    } catch (error: any) {
      console.log(error);
      //!   (error as AxiosError).response?.data?.message не работает из за того что в типе нету message
      return rejectWithValue(error.response?.data?.message);
    }
  },
);
