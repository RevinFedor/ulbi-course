

export { ArticleDetails } from './ui/ArticleDetails/ArticleDetails';

export { ArticleView } from './model/types/article';
export type { Article } from './model/types/article';
export type { ArticleDetailsSchema } from './model/types/articleDetailsSchema';
export { articleDetailsReducers } from './model/slice/articleDetailsSlice';

export {
    getArticleDetailsData,
    getArticleDetailsIsLoading,
    getArticleDetailsError,
} from './model/selectors/articleDetails';
export { ArticleViewSelector } from './ui/ArticleViewSelector/ArticleViewSelector';


export { ArticleSortSelector } from './ui/ArticleSortSelector/ArticleSortSelector';

export { ArticleType } from './model/types/article';