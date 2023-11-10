import { StateSchema } from 'src/app/providers/StoreProvider';

export const getProfileData = (state: StateSchema) => state.profile.data;
