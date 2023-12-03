import { AxiosInstance } from 'axios';
import { NavigateOptions, To } from 'react-router-dom';
import { UserSchema } from '@/entities/User';
import { LoginSchema } from '@/features/AuthByUsername';
import { MovieSchema } from '@/entities/Movies';
import { ArticleDetailsSchema } from '@/entities/Article';
import { AddCommentFormSchema } from '@/features/addCommentForm';
import { ArticlesPageSchema } from '@/pages/ArticlePage';
import { UISchema } from '@/features/UI';
import { rtkApi } from '@/shared/api/rtkApi';
import { ProfileSchema } from '@/features/editableProfileCard';
import { RatingSchema } from '@/features/articleRating';
import { ArticleEditSchema } from '@/features/articleEditForm';

export interface StateSchema {
  user: UserSchema;
  ui: UISchema;
  [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;

  //! Асинхронные редюсеры
  LoginForm: LoginSchema;
  profile: ProfileSchema;
  movie: MovieSchema;
  articleDetails?: ArticleDetailsSchema;
  articleEdit: ArticleEditSchema;

  addCommentForm: AddCommentFormSchema;
  articlesPage: ArticlesPageSchema;

  rating: RatingSchema;
}

export interface ThunkExtraArg {
  api: AxiosInstance;
  navigate?: (to: To, options?: NavigateOptions) => void;
}
export interface ThunkConfig<T> {
  rejectValue: T;
  extra: ThunkExtraArg;
  state: StateSchema;
}
