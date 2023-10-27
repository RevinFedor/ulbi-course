import cls from './Navbar.module.scss';

import { classNames } from 'src/shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from 'src/shared/ui/AppLink/AppLink';
import { ThemSwitcher } from 'src/widgets/ThemSwitcher/ui/ThemSwitcher';

interface NavbarProps {
    className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
    return (
        <div
            className={classNames(cls.navbar, {}, className ? [className] : [])}
        >
            <ThemSwitcher  />
            <div className={cls.links}>
                <AppLink
                    theme={AppLinkTheme.SECONDARY}
                    className={cls.mainLink}
                    to="/"
                >
                    Главная
                </AppLink>
                <AppLink theme={AppLinkTheme.RED} to="/about">
                    О сайте
                </AppLink>
            </div>
        </div>
    );
};
