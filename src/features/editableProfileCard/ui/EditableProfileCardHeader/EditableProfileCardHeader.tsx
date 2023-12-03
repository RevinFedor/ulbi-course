import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { Text } from '@/shared/ui/Text';
import { getUserAuthData } from '@/entities/User';
import { profileActions } from '../../model/slice/profileSlice';
import {
  getProfileReadonly,
  getProfileData,
} from '../../model/selectors/profile';
import { updateProfileData } from '../../model/services/updateProfileData';
import { useAppDispatch } from '@/shared/lib/hooks/hooksStore';
import { Button, ThemeButton } from '@/shared/ui/Button';

interface EditableProfileCardHeaderProps {
  className?: string;
}

export const EditableProfileCardHeader = memo(
  (props: EditableProfileCardHeaderProps) => {
    const { className } = props;

    const { t } = useTranslation('profile');
    const authData = useSelector(getUserAuthData);
    const profileData = useSelector(getProfileData);
    const canEdit = authData?.id === profileData?.id;
    const readonly = useSelector(getProfileReadonly);
    const dispatch = useAppDispatch();

    const onEdit = useCallback(() => {
      dispatch(profileActions.setReadonly(false));
    }, [dispatch]);

    const onCancelEdit = useCallback(() => {
      dispatch(profileActions.cancelEdit());
    }, [dispatch]);

    const onSave = useCallback(() => {
      dispatch(updateProfileData());
    }, [dispatch]);

    return (
      <div className="mb-4 flex f-full justify-between">
        <Text title="Профиль" />
        {canEdit && (
          <div>
            {readonly ? (
              <Button theme={ThemeButton.OUTLINE} onClick={onEdit}>
                {t('Редактировать')}
              </Button>
            ) : (
              <div className="flex gap-4">
                <Button theme={ThemeButton.OUTLINE_RED} onClick={onCancelEdit}>
                  {t('Отменить')}
                </Button>
                <Button theme={ThemeButton.OUTLINE} onClick={onSave}>
                  {t('Сохранить')}
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  },
);
