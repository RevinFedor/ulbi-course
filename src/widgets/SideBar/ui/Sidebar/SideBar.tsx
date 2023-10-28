import { classNames } from 'src/shared/lib/classNames/classNames';
import cls from './SideBar.module.scss';
import { useState } from 'react';
import { ThemSwitcher } from 'src/shared/ui/ThemSwitcher/ui/ThemSwitcher';
import { LangSwitcher } from 'src/shared/ui/LangSwitcher/LangSwitcher';
import { Button, ButtonSize, ThemeButton } from 'src/shared/ui/Button/Button';
import { AppLink, AppLinkTheme } from 'src/shared/ui/AppLink/AppLink';
import { RoutePath } from 'src/shared/config/routeConfig/routeConfig';
import AboutIcon from 'src/widgets/assets/icons/about-20-20.svg?react';
import MainIcon from 'src/widgets/assets/icons/main-20-20.svg?react';

interface SideBarProps {
    className?: string;
}

export const SideBar = ({ className }: SideBarProps) => {
    const [collapsed, setCollapsed] = useState(false);
    const onToogle = () => setCollapsed((collapsed) => !collapsed);

    return (
        <div
            className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [
                className || '',
            ])}
        >
            <Button
                theme={ThemeButton.BACKGROUND_INVERTED}
                className={cls.collapseBtn}
                onClick={onToogle}
                square
                size={ButtonSize.L}
            >
                {collapsed ? '>' : '<'}
            </Button>
            <div className={cls.items}>
                <AppLink
                    theme={AppLinkTheme.SECONDARY}
                    to={RoutePath.main}
                    className={cls.item}
                >
                    <MainIcon className={cls.icon} />
                    <span className={cls.link}>Главная</span>
                </AppLink>
                <AppLink
                    theme={AppLinkTheme.SECONDARY}
                    to={RoutePath.about}
                    className={cls.item}
                >
                    <AboutIcon className={cls.icon} />
                    <span className={cls.link}>О сайте</span>
                </AppLink>
            </div>

            <div className={cls.switchers}>
                <ThemSwitcher />
                <LangSwitcher className={cls.lang} />
            </div>
        </div>
    );
};
