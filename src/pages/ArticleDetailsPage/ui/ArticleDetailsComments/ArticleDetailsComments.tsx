import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text, TextSize } from '@/shared/ui/Text';
import { AddCommentForm } from '@/features/addCommentForm';
import { CommentList } from '@/entities/Comment';

import { useAppSelector } from '@/shared/lib/hooks/hooksStore';
import {
  useAddCommentForArticleMutation,
  useCommentsByArticleQuery,
  useDeleteCommentForArticleMutation,
} from '../../api/commentApi';
import { getUserAuthData } from '@/entities/User';

interface ArticleDetailsCommentsProps {
  className?: string;
  id: string;
}

export const ArticleDetailsComments = memo(
  (props: ArticleDetailsCommentsProps) => {
    const { className, id } = props;
    const { t } = useTranslation();
    const userData = useAppSelector(getUserAuthData);
    const { data: comments, isFetching } = useCommentsByArticleQuery(id);
    const [addCommentForArticle, { isLoading: isLoadingUpdate }] =
      useAddCommentForArticleMutation();
    const [deleteComment, { isLoading: isLoadingDeleteComment }] =
      useDeleteCommentForArticleMutation({
        fixedCacheKey: 'save-isLoadingDeleteComment',
      });

    //! получать isLoading от удаления коментария
    const onSendComment = useCallback(
      (text: string) => {
        if (userData?.id) {
          addCommentForArticle({
            articleId: id,
            userId: userData.id,
            text,
          });
        }
      },
      [id, userData, addCommentForArticle],
    );

    const onDeleteComment = useCallback(
      (commentId: string) => {
        deleteComment(commentId);
      },
      [deleteComment],
    );

    return (
      <div className={classNames('flex flex-col  gap-4', {}, [className])}>
        <Text size={TextSize.L} title={t('Комментарии')} />
        <AddCommentForm onSendComment={onSendComment} />

        <CommentList
          isLoading={isLoadingUpdate || isFetching || isLoadingDeleteComment}
          comments={comments}
          onDeleteComment={onDeleteComment}
        />
      </div>
    );
  },
);
