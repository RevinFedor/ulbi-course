import cls from './Navbar.module.scss';

import { classNames } from 'src/shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from 'src/shared/ui/AppLink/AppLink';
import { ThemSwitcher } from 'src/shared/ui/ThemSwitcher/ui/ThemSwitcher';

interface NavbarProps {
    className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
    return (
        <div
            className={classNames(cls.navbar, {}, className ? [className] : [])}
        >
            <div className={cls.links}>
                /
            </div>
        </div>
    );
};
