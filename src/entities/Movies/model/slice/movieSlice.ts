import type { PayloadAction } from '@reduxjs/toolkit';
import { Movie, MovieSchema } from '../types/movie';
import { fetchMovieData } from '../services/fetchMovieData';
import { buildSlice } from '@/shared/lib/store/buildSlice';

const initialState: MovieSchema = {
  isLoading: false,
  error: undefined,
  data: undefined,
  counter: 0,
};

export const movieSlice = buildSlice({
  name: 'movie',
  initialState,
  reducers: {
    addCounter: (state, { payload }: PayloadAction<number>) => {
      state.counter += payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieData.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchMovieData.fulfilled, (state, action: PayloadAction<Movie>) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchMovieData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  actions: movieActions,
  reducer: movieReducer,
  useActions: useMovieActions,
} = movieSlice;
