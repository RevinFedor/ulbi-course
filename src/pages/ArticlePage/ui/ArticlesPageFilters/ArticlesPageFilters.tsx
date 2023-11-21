import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticlesPageFilters.module.scss';
import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';
import { articlesPageActions } from '../../model/slices/articlesPageSlice';
import {
    ArticleSortSelector,
    ArticleView,
    ArticleViewSelector,
} from '@/entities/Article';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks/hooksStore';
import {
    getArticlesPageOrder,
    getArticlesPageSearch,
    getArticlesPageSort,
    getArticlesPageType,
    getArticlesPageView,
} from '../../model/selectors/articlesPageSelectors';
import { Select } from '@/shared/ui/Select/Select';
import { Card } from '@/shared/ui/Card/Card';
import { Input } from '@/shared/ui/Input/Input';
import {
    ArticleSortField,
    ArticleType,
} from '@/entities/Article/model/types/article';
import { SortOrder } from '@/shared/types/sort';
import { fetchArticlesList } from '../../model/services/fetchArticlesList';
import { useDebounce } from '@/shared/lib/hooks/useDebounce';
import { useSearchParams } from 'react-router-dom';
import { TabItem, Tabs } from '@/shared/ui/Tabs/Tabs';
import { ArticleTypeTabs } from '@/entities/Article/ui/ArticleTypeTabs/ArticleTypeTabs';

interface ArticlesPageFiltersProps {
    className?: string;
}

export const ArticlesPageFilters = ({
    className,
}: ArticlesPageFiltersProps) => {
    const dispatch = useAppDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const view = useAppSelector(getArticlesPageView);
    const sort = useAppSelector(getArticlesPageSort);
    const order = useAppSelector(getArticlesPageOrder);
    const search = useAppSelector(getArticlesPageSearch);
    const type = useAppSelector(getArticlesPageType);

    //! при изменение полей фильтрации, подгружаются новые запросы на сервер
    //! сбрасываем колличество страниц
    const fetchData = useCallback(() => {
        //! устанавливаем в параметры значения query. Но он остает на один параметр
        console.log(search);

        setSearchParams({ sort, order, search, type });
        dispatch(fetchArticlesList({ replace: true }));
    }, [dispatch, sort, order, search, type]);

    const debouncedFetchData = useDebounce(fetchData, 500);

    const onChangeView = useCallback(
        (view: ArticleView) => {
            dispatch(articlesPageActions.setView(view));
            dispatch(articlesPageActions.setPage(1));
        },
        [dispatch]
    );
    const onChangeSort = useCallback(
        (newSort: ArticleSortField) => {
            dispatch(articlesPageActions.setSort(newSort));
            dispatch(articlesPageActions.setPage(1));
            fetchData();
        },
        [dispatch, fetchData]
    );
    const onChangeOrder = useCallback(
        (newOrder: SortOrder) => {
            dispatch(articlesPageActions.setOrder(newOrder));
            dispatch(articlesPageActions.setPage(1));
            fetchData();
        },
        [dispatch, fetchData]
    );
    const onChangeSearch = useCallback(
        (newSearch: string) => {
            dispatch(articlesPageActions.setSearch(newSearch));
            dispatch(articlesPageActions.setPage(1));
            debouncedFetchData();
        },
        [dispatch, debouncedFetchData]
    );
    const onChangeType = useCallback(
        (newType: ArticleType) => {
            dispatch(articlesPageActions.setType(newType));
            dispatch(articlesPageActions.setPage(1));
            fetchData();
        },
        [dispatch, debouncedFetchData]
    );

    return (
        <div className={classNames(cls.ArticlesPageFilters, {}, [className])}>
            <div className={cls.sortWrapper}>
                <ArticleSortSelector
                    onChangeOrder={onChangeOrder}
                    onChangeSort={onChangeSort}
                    order={order}
                    sort={sort}
                />
                <ArticleViewSelector view={view} onViewClick={onChangeView} />
            </div>
            <Card className={cls.search}>
                <Input
                    onChange={onChangeSearch}
                    value={search}
                    placeholder="Поиск"
                />
            </Card>
            <ArticleTypeTabs
                value={type}
                onChangeType={onChangeType}
                className={cls.tabs}
            />
        </div>
    );
};
