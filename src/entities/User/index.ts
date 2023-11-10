export type { UserSchema, User } from './model/types/UserSchema';

export { getUserAuthData } from './model/selectors/getUserAuthData';
export { getUserInited } from './model/selectors/getUserInited';

export { userReducer, userActions } from './model/slice/userSlice';
