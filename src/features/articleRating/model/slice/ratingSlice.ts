import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Rating } from '@/entities/Rating';
import { RatingSchema } from '../types/articleRatingShema';

const initialState: RatingSchema = {
  isEditing: false,
  form: undefined,
};

export const ratingSlice = createSlice({
  name: 'rating',
  initialState,
  reducers: {
    setReadonly: (state, action: PayloadAction<boolean>) => {
      state.isEditing = action.payload;
    },
    cancelEdit: (state, action) => {
      state.isEditing = false;
      state.form = action.payload;
    },
    updateRating: (state, action: PayloadAction<Rating>) => {
      state.form = {
        ...state.form,
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {},
});

export const { actions: ratingActions } = ratingSlice;

export const { reducer: ratingReducer } = ratingSlice;
