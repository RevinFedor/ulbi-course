import { EntityState } from '@reduxjs/toolkit';
import { Article, ArticleView } from '@/entities/Article';
import { SortOrder } from '@/shared/types/sort';
import {
    ArticleSortField,
    ArticleType,
} from '@/entities/Article/model/types/article';

export interface ArticlesPageSchema extends EntityState<Article> {
    isLoading?: boolean;
    error?: string;
    //! pagitation
    page: number;
    limit: number;
    hasMore: boolean;
    //! filters
    view: ArticleView;
    order: SortOrder;
    sort: ArticleSortField;
    search: string;
    type: ArticleType;

    _inited: boolean;
}
