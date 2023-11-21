import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticlePage.module.scss';
import { useTranslation } from 'react-i18next';
import { FC, memo, useCallback, useEffect, useState } from 'react';
import { ArticleList } from '@/entities/Article/ui/ArticleList/ArticleList';
import { ArticleView } from '@/entities/Article/model/types/article';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks/hooksStore';
import {
    getArticlesPageError,
    getArticlesPageHasInited,
    getArticlesPageIsLoading,
    getArticlesPageView,
} from '../../model/selectors/articlesPageSelectors';
import { fetchArticlesList } from '../../model/services/fetchArticlesList';
import {
    articlesPageActions,
    getArticles,
} from '../../model/slices/articlesPageSlice';
import { ArticleViewSelector } from '@/entities/Article';
import { Page } from '@/widgets/Page/Page';
import { Button, ThemeButton } from '@/shared/ui/Button/Button';
import { Card } from '@/shared/ui/Card/Card';
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage';
import { Text } from '@/shared/ui/Text/Text';
import { initArticlesPage } from '../../model/services/initArticlesPage';
import { ArticlesPageFilters } from '../ArticlesPageFilters/ArticlesPageFilters';
import { useSearchParams } from 'react-router-dom';

interface ArticlePageProps {
    className: string;
}

type ArticlePagePropsTist = Partial<ArticlePageProps> & {
    helloKitty?: undefined;
};

const ArticlePage: FC<ArticlePagePropsTist> = ({ className }) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    let [searchParams, setSearchParams] = useSearchParams();

    const articles = useAppSelector(getArticles.selectAll);
    const isLoading = useAppSelector(getArticlesPageIsLoading);
    const error = useAppSelector(getArticlesPageError);
    const view = useAppSelector(getArticlesPageView);

    const onLoadNextPart = useCallback(() => {
        dispatch(fetchNextArticlesPage());
    }, [dispatch]);

    //! передаем параметры из url 
    useEffect(() => {
        dispatch(initArticlesPage(searchParams));
    }, [dispatch]);

    return (
        <Page
            className={classNames(cls.ArticlePage, {}, [className])}
            onScrollEnd={onLoadNextPart}
        >
            <ArticlesPageFilters />
            <ArticleList
            className={cls.list}
                isLoading={isLoading}
                view={view}
                articles={articles}
            />
        </Page>
    );
};

export default memo(ArticlePage);
