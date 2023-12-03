import { StateSchema } from '@/app/providers/StoreProvider';

export const getaRatingData = (state: StateSchema) => state.rating.data;
export const getaRatingForm = (state: StateSchema) => state.rating.form;
export const getaRatingIsEditing = (state: StateSchema) =>
  state.rating.isEditing;
