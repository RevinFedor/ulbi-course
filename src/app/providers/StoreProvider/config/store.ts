import { ReducersMapObject, configureStore } from '@reduxjs/toolkit';
import { NavigateOptions, To } from 'react-router-dom';
import { StateSchema } from './StateSchema';

import { movieReducer } from '@/entities/Movies';
import { userReducer } from '@/entities/User';
import { loginReducer } from '@/features/AuthByUsername';
import { uiReducer } from '@/features/UI';
import { addCommentFormReducer } from '@/features/addCommentForm';
import { ratingReducer } from '@/features/articleRating';
import { profileReducer } from '@/features/editableProfileCard';
import { articlesPageReducer } from '@/pages/ArticlePage';
import { $api } from '@/shared/api/api';
import { rtkApi } from '@/shared/api/rtkApi';
import { articleEditReducer } from '@/features/articleEditForm';

export function createReduxStore(
  initialState?: StateSchema,
  navigate?: (to: To, options?: NavigateOptions) => void,
) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    user: userReducer,
    ui: uiReducer,
    [rtkApi.reducerPath]: rtkApi.reducer,
    LoginForm: loginReducer,
    profile: profileReducer,
    movie: movieReducer,
    // articleDetails: articleDetailsReducers,
    addCommentForm: addCommentFormReducer,
    articleEdit: articleEditReducer,
    articlesPage: articlesPageReducer,
    rating: ratingReducer,
  };

  const store = configureStore({
    reducer: rootReducers,
    devTools: import.meta.env.VITE_IS_DEV,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: { api: $api, navigate },
        },
      }).concat(rtkApi.middleware),
  });

  return store;
}

//! Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof createReduxStore.prototype.getState>;
//! Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = ReturnType<typeof createReduxStore.prototype.dispatch>;
