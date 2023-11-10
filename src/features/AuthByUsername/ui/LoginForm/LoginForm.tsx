import { classNames } from '@/shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button, ThemeButton } from '@/shared/ui/Button/Button';

import cls from './LoginForm.module.scss';
import { Input } from '@/shared/ui/Input/Input';

import { memo, useCallback } from 'react';
import { loginActions } from '../../model/slice/loginSlice';

import { loginByUsername } from '../../model/services/LoginByUsername/LoginByUsername';
import { AppDispatch } from '@/app/providers/StoreProvider/config/store';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks/hooksStore';
import { Text } from '@/shared/ui/Text/Text';
import { getUserAuthData } from '@/entities/User';
import { getLoginState } from '../../model/selectors/getLoginState/getLoginState';


export interface LoginFormProps {
    className?: string;
}

const LoginForm = memo(({ className }: LoginFormProps) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const { username, password, error, isLoading } =
        useAppSelector(getLoginState);

    const onChangeUsername = useCallback(
        (value: string) => {
            dispatch(loginActions.setUsername(value));
        },
        [dispatch]
    );

    const onChangePassword = useCallback(
        (value: string) => {
            dispatch(loginActions.setPassword(value));
        },
        [dispatch]
    );

    const onLoginClick = useCallback(() => {
        dispatch(loginByUsername({ username, password }));
    }, [dispatch, password, username]);

    return (
        <div className={classNames(cls.LoginForm, {}, [className])}>
            {error && <Text text={error} />}

            <Input
                autofocus
                type="text"
                className={cls.input}
                placeholder="Введите username"
                onChange={onChangeUsername}
                value={username}
            />
            <Input
                type="text"
                className={cls.input}
                placeholder="Введите пароль"
                onChange={onChangePassword}
                value={password}
            />
            <Button
                theme={ThemeButton.OUTLINE}
                className={cls.loginBtn}
                onClick={onLoginClick}
                disabled={isLoading}
            >
                {t('login')}
            </Button>
        </div>
    );
});

export default LoginForm;
