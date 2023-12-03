import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks/hooksStore';
import { ratingActions } from '../../model/slice/ratingSlice';
import {
  getaRatingForm,
  getaRatingIsEditing,
} from '../../model/selectors/articleRating';
import {
  RateArticleArg,
} from '../../api/articleRatingApi';

interface EditableRatingCardProps {
  className?: string;
  rating?: any;
  UpdateRateArticle?: any;
}

export const EditableRatingCard = (props: EditableRatingCardProps) => {
  const { className, rating, UpdateRateArticle } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const form = useAppSelector(getaRatingForm);
  //! находится ли рэйтинг в режиме редактирования
  const isEditing = useAppSelector(getaRatingIsEditing);
  //! есть ли рэйтинг вообще
  const isEdit = Boolean(rating?.rate && rating?.rate < 0);

  const onEdit = useCallback(() => {
    dispatch(ratingActions.setReadonly(true));
    dispatch(ratingActions.updateRating(rating));
  }, [dispatch, rating]);

  const onCancelEdit = useCallback(() => {
    dispatch(ratingActions.cancelEdit(rating));
  }, [dispatch, rating]);

  const onSave = useCallback(() => {
    UpdateRateArticle(form as RateArticleArg);
    dispatch(ratingActions.setReadonly(false));
  }, [dispatch, form, UpdateRateArticle]);

  return (
    <div className={classNames('', {}, [className])}>
      {' '}
      <div className="mb-4 flex f-full justify-between">
        {!isEdit && (
          <div>
            {!isEditing ? (
              <button onClick={onEdit}>{t('Редактировать')}</button>
            ) : (
              <div className="flex gap-4">
                <button onClick={onCancelEdit}>{t('Отменить')}</button>
                <button onClick={onSave}>{t('Сохранить')}</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
