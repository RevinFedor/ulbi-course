import { useCallback, useState } from 'react';
import cls from './Navbar.module.scss';

import { classNames } from 'src/shared/lib/classNames/classNames';
import { Button, ThemeButton } from 'src/shared/ui/Button/Button';
import { LoginModal } from 'src/features/AuthByUsername';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'src/app/types/hooksStore';
import { useAppSelector } from 'src/app/types/hooksStore';
import { getUserAuthData, userActions } from 'src/entities/User';

interface NavbarProps {
    className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
    const { t } = useTranslation();
    const [isAuthModal, setIsAuthModal] = useState(false);
    const authData = useAppSelector(getUserAuthData);
    const dispatch = useAppDispatch();

    // функция onToggleModal не будет создаваться каждый раз при рендеренге
    const onCloseModal = useCallback(() => {
        setIsAuthModal(false);
    }, []);
    const onOpenModal = useCallback(() => {
        setIsAuthModal(true);
    }, []);
    const onLogout = useCallback(() => {
        dispatch(userActions.logout());
    }, []);

    
    if (authData) {
        return (
            <div className={classNames(cls.Navbar, {}, [className || ''])}>
                {' '}
                <Button
                    className={cls.links}
                    theme={ThemeButton.CLEAR_INVERTED}
                    onClick={onLogout}
                >
                    {t('logout')}
                </Button>
            </div>
        );
    }

    return (
        <div className={classNames(cls.Navbar, {}, [className || ''])}>
            <Button
                className={cls.links}
                theme={ThemeButton.CLEAR_INVERTED}
                onClick={onOpenModal}
            >
                {t('login')}
            </Button>
            <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
        </div>
    );
};
