import { useTranslation } from 'react-i18next';
import { FC, memo, useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticlePage.module.scss';
import { useAppDispatch } from '@/shared/lib/hooks/hooksStore';

import { Page } from '@/widgets/Page';
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage';
import { initArticlesPage } from '../../model/services/initArticlesPage';
import { ArticlesPageFilters } from '../ArticlesPageFilters/ArticlesPageFilters';
import { ArticleInfiniteList } from '../ArticleInfiniteList/ArticleInfiniteList';

interface ArticlePageProps {
  className?: string;
}

const ArticlePage: FC<ArticlePageProps> = ({ className }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  //! это массив
  const [searchParams] = useSearchParams();

  const onLoadNextPart = useCallback(() => {
    dispatch(fetchNextArticlesPage());
  }, [dispatch]);

  //! передаем параметры из url для фильтров
  useEffect(() => {
    dispatch(initArticlesPage(searchParams));
  }, [dispatch, searchParams]);

  return (
    <Page className={classNames(cls.ArticlePage, {}, [className])} onScrollEnd={onLoadNextPart}>
      <ArticlesPageFilters />
      <ArticleInfiniteList className={cls.list} />
    </Page>
  );
};

export default memo(ArticlePage);
