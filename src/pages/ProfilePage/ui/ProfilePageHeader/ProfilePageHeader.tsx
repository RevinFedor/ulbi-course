import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ProfilePageHeader.module.scss';
import { useTranslation } from 'react-i18next';
import { Text } from '@/shared/ui/Text/Text';
import { Button, ThemeButton } from '@/shared/ui/Button/Button';
import { profileActions, updateProfileData } from '@/entities/Profile';

import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks/hooksStore';
import { useCallback } from 'react';
import { getProfileReadonly } from '@/entities/Profile/model/selectors/getProfileReadonly/getProfileReadonly';

interface ProfilePageHeaderProps {
    className?: string;
}


export const ProfilePageHeader = ({ className }: ProfilePageHeaderProps) => {
    const { t } = useTranslation();
    const readonly = useAppSelector(getProfileReadonly);
    const dispatch = useAppDispatch();

    const onEdit = useCallback(() => {
        dispatch(profileActions.setReadonly(false));
    }, [dispatch]);

    const onCancelEdit = useCallback(() => {
        dispatch(profileActions.cancelEdit());
    }, [dispatch]);

  

    return (
        <div
            className={classNames(cls.ProfilePageHeader, {}, [className || ''])}
        >
            <div className={cls.header}>
                <Text title={t('Profile')} />
                {readonly ? (
                    <Button
                        className={cls.editBtn}
                        theme={ThemeButton.OUTLINE}
                        onClick={onEdit}
                    >
                        {t('Редактировать')}
                    </Button>
                ) : (
                    <>
                        <Button
                            className={cls.editBtn}
                            theme={ThemeButton.OUTLINE_RED}
                            onClick={onCancelEdit}
                        >
                            {t('Отменить')}
                        </Button>
                        <Button
                            className={cls.saveBtn}
                            theme={ThemeButton.OUTLINE}
                            type='submit'
                        >
                            {t('Сохранить')}
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
};
