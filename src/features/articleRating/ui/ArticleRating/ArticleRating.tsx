import { useTranslation } from 'react-i18next';
import { memo, useCallback, useEffect } from 'react';
import { RatingCard } from '@/entities/Rating';
import {
  useGetArticleRating,
  useRateArticle,
  useUpdateRateArticle,
} from '../../api/articleRatingApi';
import { getUserAuthData } from '@/entities/User';
import { Skeleton } from '@/shared/ui/Skeleton';
import { EditableRatingCard } from '../EditableRatingCard/EditableRatingCard';
// import { EditableRatingCard } from '@/features/articleRating';
import { ratingActions } from '../../model/slice/ratingSlice';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks/hooksStore';
import { Input } from '@/shared/ui/Input';
import {
  getaRatingForm,
  getaRatingIsEditing,
} from '../../model/selectors/articleRating';

export interface ArticleRatingProps {
  className?: string;
  articleId: string;
}

const ArticleRating = memo((props: ArticleRatingProps) => {
  const { className, articleId } = props;
  const { t } = useTranslation();
  const userData = useAppSelector(getUserAuthData);
  const isEditing = useAppSelector(getaRatingIsEditing);
  const form = useAppSelector(getaRatingForm);

  const dispatch = useAppDispatch();

  const { data, isLoading, isSuccess } = useGetArticleRating({
    articleId,
    userId: userData?.id ?? '',
  });

  const [rateArticleMutation, { isLoading: isLoadingCreate }] =
    useRateArticle();
  const [UpdateRateArticle, { isLoading: isLoadingUpdate }] =
    useUpdateRateArticle();

  //! редактирование
  useEffect(() => {
    if (isSuccess) {
      dispatch(ratingActions.updateRating(data?.[0]));
    }
  }, [dispatch, isSuccess, data, isLoadingCreate]);

  const onChangeFeedback = useCallback(
    (value?: string) => {
      dispatch(ratingActions.updateRating({ feedback: value || '' }));
    },
    [dispatch],
  );
  const onChangeRate = useCallback(
    (value?: number) => {
      dispatch(ratingActions.updateRating({ rate: value }));
    },
    [dispatch],
  );

  //! логика отправки формы рейтинга
  const handleRateArticle = useCallback(
    (starsCount: number, feedback?: string) => {
      try {
        rateArticleMutation({
          userId: userData?.id ?? '',
          articleId,
          rate: starsCount,
          feedback,
        });
      } catch (e) {
        // handle error
        console.log(e);
      }
    },
    [articleId, rateArticleMutation, userData?.id],
  );

  const onAccept = useCallback(
    (starsCount: number, feedback?: string) => {
      handleRateArticle(starsCount, feedback);
    },
    [handleRateArticle],
  );

  const onCancel = useCallback(
    (starsCount: number) => {
      handleRateArticle(starsCount);
    },
    [handleRateArticle],
  );

  if (isLoading || !form || isLoadingCreate || isLoadingUpdate) {
    return <Skeleton width="100%" height={120} />;
  }

  const dataRating = data?.[0];
  const isDataHasRating = !(!dataRating?.rate || dataRating?.rate < 0);

  return (
    <>
      {isDataHasRating && form && (
        <EditableRatingCard
          rating={form}
          UpdateRateArticle={UpdateRateArticle}
        />
      )}
      <RatingCard
        isEditing={!isEditing}
        onCancel={onCancel}
        onAccept={onAccept}
        onChangeRate={onChangeRate}
        rate={form?.rate}
        className={className}
        title={isDataHasRating ? 'Спасибо за оценку' : 'Оцените статью'}
        modalTitle={t(
          'Оставьте свой отзыв о статье, это поможет улучшить качество',
        )}
        hasHasmodal
      />

      {isDataHasRating && (
        <div className="flex justify-center mt-1">
          <Input
            value={form?.feedback}
            placeholder="Ваша оценка"
            onChange={onChangeFeedback}
            readonly={!isEditing}
          />
        </div>
      )}
    </>
  );
});

export default ArticleRating;
