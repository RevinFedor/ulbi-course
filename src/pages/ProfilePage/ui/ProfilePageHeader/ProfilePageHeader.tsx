import { classNames } from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/ui/Text/Text';

import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
    getProfileData,
    profileActions,
    updateProfileData,
} from '@/entities/Profile';
import { useCallback } from 'react';

import cls from './ProfilePageHeader.module.scss';
import { useAppDispatch } from '@/shared/lib/hooks/hooksStore';
import { getProfileReadonly } from '@/entities/Profile';
import { Button, ThemeButton } from '@/shared/ui/Button/Button';
import { getUserAuthData } from '@/entities/User';
import { useParams } from 'react-router-dom';
import { Loader } from '@/shared/ui/Loader/Loader';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';

interface ProfilePageHeaderProps {
    className?: string;
    isLoading?: boolean;
}

export const ProfilePageHeader = (props: ProfilePageHeaderProps) => {
    const { className, isLoading } = props;

    const { t } = useTranslation('profile');
    const authData = useSelector(getUserAuthData);

    const profileData = useSelector(getProfileData);
    const canEdit = authData?.id === profileData?.id;

    const readonly = useSelector(getProfileReadonly);
    const dispatch = useAppDispatch();
    const { id } = useParams();

    const onEdit = useCallback(() => {
        dispatch(profileActions.setReadonly(false));
    }, [dispatch]);

    const onCancelEdit = useCallback(() => {
        dispatch(profileActions.cancelEdit());
    }, [dispatch]);

    const onSave = useCallback(
        (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            event.preventDefault();
            dispatch(updateProfileData(id));
        },
        [dispatch]
    );

    if (isLoading) {
        return (
            <div
                className={classNames(
                    cls.ProfileCard,
                    { [cls.loading]: true },
                    [className]
                )}
            >
                <Skeleton
                    className={'mb-4'}
                    border={20}
                    width={400}
                    height={50}
                />
            </div>
        );
    }

    return (
        <div className={classNames(cls.ProfilePageHeader, {}, [className])}>
            <Text
                title={
                    canEdit ? 'Ваш профиль' : `Профиль ${profileData?.username}`
                }
            />
            {canEdit && (
                <div className={cls.btnsWrapper}>
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
                                onClick={(e) => onSave(e)}
                            >
                                {t('Сохранить')}
                            </Button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};
