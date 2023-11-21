import { ReducersMapObject, configureStore } from '@reduxjs/toolkit';
import { StateSchema } from './StateSchema';

import { userReducer } from '@/entities/User';
import { loginReducer } from '@/features/AuthByUsername/model/slice/loginSlice';
import { profileReducer } from '@/entities/Profile';
import { $api } from '@/shared/api/api';
import { NavigateOptions, To } from 'react-router-dom';
import { movieReducer } from '@/entities/Movies';
import { articleDetailsReducers } from '@/entities/Article';
import { articleDetailsCommentsReducer } from '@/pages/ArticleDetailsPage/model/slices/articleDetailsCommentsSlice';
import { addCommentFormReducer } from '@/features/addCommentForm/model/slices/addCommentFormSlice';
import { articlesPageReducer } from '@/pages/ArticlePage/model/slices/articlesPageSlice';
import { uiReducer } from '@/features/UI';

export function createReduxStore(
    initialState?: StateSchema,
    navigate?: (to: To, options?: NavigateOptions) => void
) {
    const rootReducers: ReducersMapObject<StateSchema> = {
        user: userReducer,
        ui: uiReducer,
        LoginForm: loginReducer,
        profile: profileReducer,
        movie: movieReducer,
        articleDetails: articleDetailsReducers,
        articleDetailsComments: articleDetailsCommentsReducer,
        addCommentForm: addCommentFormReducer,
        articlesPage: articlesPageReducer,
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

//! Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof createReduxStore.prototype.getState>;
//! Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = ReturnType<
    typeof createReduxStore.prototype.dispatch
>;
