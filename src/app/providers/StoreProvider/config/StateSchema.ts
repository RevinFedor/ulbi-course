import { UserSchema } from '@/entities/User';
import { LoginSchema } from '@/features/AuthByUsername';
import { ProfileSchema } from '@/entities/Profile';
import { AxiosInstance } from 'axios';
import { NavigateOptions, To } from 'react-router-dom';
import { MovieSchema } from '@/entities/Movies/model/types/movie';
import { ArticleDetailsSchema } from '@/entities/Article';
import { ArticleDetailsCommentsSchema } from '@/pages/ArticleDetailsPage/model/types/ArticleDetailsCommentsSchema';
import { AddCommentFormSchema } from '@/features/addCommentForm';
import { ArticlesPageSchema } from '@/pages/ArticlePage';
import { UISchema } from '@/features/UI';

export interface StateSchema {
    user: UserSchema;
    ui: UISchema;

    //! Асинхронные редюсеры
    LoginForm: LoginSchema;
    profile: ProfileSchema;
    movie: MovieSchema;
    articleDetails: ArticleDetailsSchema;
    articleDetailsComments: ArticleDetailsCommentsSchema;
    addCommentForm: AddCommentFormSchema;
    articlesPage: ArticlesPageSchema;
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
