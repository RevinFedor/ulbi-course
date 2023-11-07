import { useAppSelector } from 'src/app/types/hooksStore';
import { StateSchema } from 'src/app/providers/StoreProvider/config/StateSchema';

export const getUserAuthData = (state: StateSchema) => state?.user?.authData;
