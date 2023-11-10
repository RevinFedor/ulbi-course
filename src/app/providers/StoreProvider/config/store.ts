import { ReducersMapObject, configureStore } from '@reduxjs/toolkit';
import { StateSchema } from './StateSchema';
import { counterReducer } from '@/entities/Counter';
import { userReducer } from '@/entities/User';
import { loginReducer } from '@/features/AuthByUsername/model/slice/loginSlice';
import { profileReducer } from '@/entities/Profile';
import { $api } from '@/shared/api/api';
import { NavigateOptions, To } from 'react-router-dom';
import { movieReducer } from '@/entities/Movies';

export function createReduxStore(
    initialState?: StateSchema,
    navigate?: (to: To, options?: NavigateOptions) => void
) {
    const rootReducers: ReducersMapObject<StateSchema> = {
        counter: counterReducer,
        user: userReducer,
        LoginForm: loginReducer,
        profile: profileReducer,
        movie: movieReducer,
    };

    const store = configureStore({
        reducer: rootReducers,
        devTools: import.meta.env.VITE_IS_DEV,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                thunk: {
                    extraArgument: { api: $api, navigate },
                },
            }),
    });

    return store;
}

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof createReduxStore.prototype.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = ReturnType<
    typeof createReduxStore.prototype.dispatch
>;