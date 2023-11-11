
import { UserSchema } from '@/entities/User';
import { LoginSchema } from '@/features/AuthByUsername';
import { ProfileSchema } from '@/entities/Profile';
import { AxiosInstance } from 'axios';
import { NavigateOptions, To } from 'react-router-dom';
import { MovieSchema } from '@/entities/Movies/model/types/movie';
import { ArticleDetailsSchema } from '@/entities/Article';
import { ArticleDetailsCommentsSchema } from '@/pages/ArticleDetailsPage/model/types/ArticleDetailsCommentsSchema';

export interface StateSchema {
    user: UserSchema;

    // Асинхронные редюсеры
    LoginForm: LoginSchema;
    profile: ProfileSchema;
    movie: MovieSchema;
    articleDetails: ArticleDetailsSchema;
    articleDetailsComments: ArticleDetailsCommentsSchema;
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
