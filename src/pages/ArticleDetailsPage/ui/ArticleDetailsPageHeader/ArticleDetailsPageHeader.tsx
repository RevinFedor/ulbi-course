import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRouteArticleEdit, getRouteArticles } from '@/shared/const/router';
import { Button, ThemeButton } from '@/shared/ui/Button';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleDetailsPageHeader.module.scss';
// eslint-disable-next-line 
import { useGetArticleByIdQuery } from '@/entities/Article/api/articleApi';
import { getUserAuthData } from '@/entities/User';
import { useAppSelector } from '@/shared/lib/hooks/hooksStore';

interface ArticleDetailsPageHeaderProps {
  className?: string;
  id: string;
}

export const ArticleDetailsPageHeader = memo(
  (props: ArticleDetailsPageHeaderProps) => {
    const { className, id } = props;
    const { t } = useTranslation();
    const navigate = useNavigate();

    //!  нужно получать article из rtkquery без передачи параметров в хук
    const { data: article } = useGetArticleByIdQuery(id);
    const user = useAppSelector(getUserAuthData);
    const canEdit = article?.user?.id === user?.id;

    const onBackToList = useCallback(() => {
        navigate(getRouteArticles());

    }, [navigate]);


    const onEditArticle = useCallback(() => {
      if (article) {
            navigate(getRouteArticleEdit(article?.id));
      }
    }, [article, navigate]);
    

    return (
      <div
        className={classNames(cls.ArticleDetailsPageHeader, {}, [className])}
      >
        <Button theme={ThemeButton.OUTLINE} onClick={onBackToList}>
          {t('Назад к списку')}
        </Button>
        {canEdit && (
          <Button
            className={cls.editBtn}
            theme={ThemeButton.OUTLINE}
            onClick={onEditArticle}
          >
            {t('Редактировать')}
          </Button>
        )}
      </div>
    );
  },
);
