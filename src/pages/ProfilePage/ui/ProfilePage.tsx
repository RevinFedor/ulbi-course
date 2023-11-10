import { classNames } from '@/shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks/hooksStore';
import { useEffect, useCallback } from 'react';
import {
    Profile,
    fetchProfileData,
    getProfileData,
    getProfileError,
    getProfileIsLoading,
    profileActions,
    updateProfileData,
} from '@/entities/Profile';
import { ProfileCard } from '@/entities/Profile/ui/ProfileCard';
import { ProfilePageHeader } from './ProfilePageHeader/ProfilePageHeader';
import { getProfileReadonly } from '@/entities/Profile/model/selectors/getProfileReadonly/getProfileReadonly';
import { getProfileForm } from '@/entities/Profile/model/selectors/getProfileForm/getProfileForm';
import { Country } from '@/shared/const/common';
import { Currency } from '@/entities/Currency';
import { getProfileValidateErrors } from '@/entities/Profile/model/selectors/getProfileValidateErrors/getProfileValidateErrors';
import { Text, TextTheme } from '@/shared/ui/Text/Text';
import { ValidateProfileError } from '@/entities/Profile/model/types/profile';

interface ProfilePageProps {
    className?: string;
}

export const ProfilePage = ({ className }: ProfilePageProps) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const formData = useAppSelector(getProfileForm);
    const isLoading = useAppSelector(getProfileIsLoading);
    const error = useAppSelector(getProfileError);
    const readonly = useAppSelector(getProfileReadonly);
    const validateError = useAppSelector(getProfileValidateErrors);

    const validateErrorTranslates = {
        [ValidateProfileError.SERVER_ERROR]: t(
            'Серверная ошибка при сохранении'
        ),
        [ValidateProfileError.INCORRECT_COUNTRY]: t('Некорректный регион'),
        [ValidateProfileError.NO_DATA]: t('Данные не указаны'),
        [ValidateProfileError.INCORRECT_USER_DATA]: t(
            'Имя и фамилия обязательны'
        ),
        [ValidateProfileError.INCORRECT_AGE]: t('Некорректный возраст'),
    };

    useEffect(() => {
        dispatch(fetchProfileData());
    }, [dispatch]);

    const onChangeFirstname = useCallback(
        (value?: string) => {
            dispatch(profileActions.updateProfile({ first: value || '' }));
        },
        [dispatch]
    );

    const onChangeLastname = useCallback(
        (value?: string) => {
            dispatch(profileActions.updateProfile({ lastname: value || '' }));
        },
        [dispatch]
    );

    const onChangeCity = useCallback(
        (value?: string) => {
            dispatch(profileActions.updateProfile({ city: value || '' }));
        },
        [dispatch]
    );

    const onChangeAge = useCallback(
        (value?: string) => {
            if (!isNaN(Number(value))) {
                dispatch(
                    profileActions.updateProfile({ age: Number(value || 0) })
                );
            }
        },
        [dispatch]
    );

    const onChangeUsername = useCallback(
        (value?: string) => {
            dispatch(profileActions.updateProfile({ username: value || '' }));
        },
        [dispatch]
    );

    const onChangeAvatar = useCallback(
        (value?: string) => {
            dispatch(profileActions.updateProfile({ avatar: value || '' }));
        },
        [dispatch]
    );

    const onChangeCurrency = useCallback(
        (currency: Currency) => {
            dispatch(profileActions.updateProfile({ currency }));
        },
        [dispatch]
    );

    const onChangeCountry = useCallback(
        (country: Country) => {
            dispatch(profileActions.updateProfile({ country }));
        },
        [dispatch]
    );

    // forms
    const onSave = useCallback(
        (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault(); // Вызываем preventDefault()

            dispatch(updateProfileData());
        },
        [dispatch]
    );

    return (
        <div className={classNames('', {}, [className])}>
            <form onSubmit={onSave}>
                <ProfilePageHeader />
                {validateError?.length &&
                    validateError.map((err) => (
                        <Text
                            key={err}
                            theme={TextTheme.ERROR}
                            text={validateErrorTranslates[err]}
                        />
                    ))}
                <ProfileCard
                    data={formData}
                    isLoading={isLoading}
                    error={error}
                    readonly={readonly}
                    onChangeFirstname={onChangeFirstname}
                    onChangeLastname={onChangeLastname}
                    onChangeAge={onChangeAge}
                    onChangeCity={onChangeCity}
                    onChangeUsername={onChangeUsername}
                    onChangeAvatar={onChangeAvatar}
                    onChangeCurrency={onChangeCurrency}
                    onChangeCountry={onChangeCountry}
                />
            </form>
        </div>
    );
};
