import { StateSchema } from 'src/app/providers/StoreProvider/config/StateSchema';

export const getLoginState = (state: StateSchema) => state?.LoginForm;
