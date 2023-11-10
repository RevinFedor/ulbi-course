import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Movie, MovieSchema } from '../types/movie';
import { fetchMovieData } from './fetchMovieData/fetchMovieData';

const initialState: MovieSchema = {
    isLoading: false,
    error: undefined,
    data: undefined,
};

export const movieSlice = createSlice({
    name: 'movie',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovieData.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(
                fetchMovieData.fulfilled,
                (state, action: PayloadAction<Movie>) => {
                    state.isLoading = false;
                    state.data = action.payload;
                }
            )
            .addCase(fetchMovieData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: movieActions } = movieSlice;

export const { reducer: movieReducer } = movieSlice;
