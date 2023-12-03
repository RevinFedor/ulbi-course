import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import { Text } from '@/shared/ui/Text';
import { getUserAuthData } from '@/entities/User';

import { getRouteArticleDetails } from '@/shared/const/router';
import { useArticleEditForm } from '../../model/selectors/articleEditSelectors';
import {
  useAddArticleByIdMutation,
  useDeleteArticleByIdMutation,
  useGetArticleByIdQuery,
  useUpdateArticleByIdMutation,
} from '@/entities/Article';
import { useArticleEditActions } from '../../model/slice/articleEditSlice';
import cls from './ArticleEditBlockHeader.module.scss';

interface ArticleEditBlockHeaderProps {
  className?: string;
  id: string;
}

export const ArticleEditBlockHeader = memo(
  (props: ArticleEditBlockHeaderProps) => {
    const { className, id } = props;

    const { t } = useTranslation('profile');
    const navigate = useNavigate();
    const authData = useSelector(getUserAuthData);
    const articleForm = useArticleEditForm();
    const { initArticle } = useArticleEditActions();
    const { data: article } = useGetArticleByIdQuery(id);

    const [addArticleQuery] = useAddArticleByIdMutation();
    const [updateArticleQuery, { isLoading: isLoadingUpdate }] =
      useUpdateArticleByIdMutation({
        fixedCacheKey: 'update-articleById',
      });
    const [deleteArticleQuery] = useDeleteArticleByIdMutation();

    const onCancelEdit = useCallback(() => {
      navigate(getRouteArticleDetails(id));
      initArticle(article);
    }, [article, initArticle, id, navigate]);

    const onDelete = useCallback(() => {
      navigate(getRouteArticleDetails(id));
      deleteArticleQuery(article?.id);
    }, [article, deleteArticleQuery, id, navigate]);

    const onSaveEdit = useCallback(async () => {
      if (!id && articleForm) {
        navigate(getRouteArticleDetails(id));
        await addArticleQuery(articleForm);
        return;
      }
      if (articleForm) {
        await updateArticleQuery(articleForm);
        if (!isLoadingUpdate) navigate(getRouteArticleDetails(id));
      }
    }, [
      articleForm,
      updateArticleQuery,
      addArticleQuery,
      isLoadingUpdate,
      id,
      navigate,
    ]);

    return (
      <div className="mb-4 flex flex-col f-full justify-center">
        {id ? (
          <Text title={`Редактирование статьи и id - ${id}`} />
        ) : (
          <Text title="Создание статьи" />
        )}
        <div className="flex justify-between gap-4 mt-4">
          <button
            className={`${cls.Links}  text-[#ff0404] border-[#ff0404]`}
            onClick={onCancelEdit}
          >
            {t('Отменить')}
          </button>
          <button
            className={`${cls.Links}  text-[var(--red-light)] border-[#ff0404]`}
            onClick={onDelete}
          >
            {t('Удалить')}
          </button>
          <button
            className={`${cls.Links} text-[#04ff04] border-[#04ff04]`}
            onClick={onSaveEdit}
          >
            Сохранить
          </button>
        </div>
      </div>
    );
  },
);
