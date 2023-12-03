import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleDetailsPage.module.scss';
import { ArticleDetails } from '@/entities/Article';
import { Page } from '@/widgets/Page';
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import { ArticleRecommendationsList } from '@/features/articleRecommendationsList';
import { ArticleDetailsComments } from '../ArticleDetailsComments/ArticleDetailsComments';
import { ArticleRating } from '@/features/articleRating';

interface ArticlePageDatailsProps {
  className?: string;
}

const ArticleDetailsPage = ({ className }: ArticlePageDatailsProps) => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return (
      <Page className={classNames(cls.ArticlePageDatails, {}, [className])}>Статья не найдена</Page>
    );
  }

  return (
    <Page className={classNames(cls.ArticlePageDatails, {}, [className])}>
      <ArticleDetailsPageHeader id={id} />
      <ArticleDetails id={id} />
      <ArticleRating articleId={id} />
      <ArticleRecommendationsList />
      <ArticleDetailsComments id={id} />
    </Page>
  );
};
export default memo(ArticleDetailsPage);
