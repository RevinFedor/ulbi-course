import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ThunkConfig } from '@/app/providers/StoreProvider';

import { Movie } from '../types/movie';

const options = {
  method: 'GET',
  url: 'https://moviesdatabase.p.rapidapi.com/titles',
  params: { limit: '50', startYear: '2015' },
  headers: {
    'X-RapidAPI-Key': '80b6fe0e74mshd2f02e221b6d0f0p142a65jsn26fc1ac83537',
    'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com',
  },
};

//! get запрос на профиль
export const fetchMovieData = createAsyncThunk<
  Movie,
  void,
  ThunkConfig<string>
>('movie/fetchMovieData', async (_, { extra, dispatch, rejectWithValue }) => {
  try {
    const response = await axios.request(options);

    if (!response.data) {
      throw new Error();
    }
    console.log(response.data);

    return response.data;
  } catch (error: any) {
    console.log(error);

    return rejectWithValue(error.response?.data?.message);
  }
});
