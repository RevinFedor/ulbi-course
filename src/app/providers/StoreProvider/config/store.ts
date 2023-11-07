import { ReducersMapObject, configureStore } from '@reduxjs/toolkit';
import { StateSchema } from './StateSchema';
import { counterReducer } from 'src/entities/Counter';
import { userReducer } from 'src/entities/User';
import { loginReducer } from 'src/features/AuthByUsername/model/slice/loginSlice';
import { profileReducer } from 'src/entities/Profile';
import { $api } from 'src/shared/api/api';
import { NavigateOptions, To } from 'react-router-dom';

export function createReduxStore(
    initialState?: StateSchema,
    navigate?: (to: To, options?: NavigateOptions) => void
) {
    const rootReducers: ReducersMapObject<StateSchema> = {
        counter: counterReducer,
        user: userReducer,
        LoginForm: loginReducer,
        Profile: profileReducer,
    };

    const store = configureStore({
        reducer: rootReducers,
        devTools: import.meta.env.VITE_IS_DEV,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                thunk: {
                    extraArgument: { api: $api },
                },
            }),
    });

    return store;
}

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof createReduxStore>['getState'];
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
