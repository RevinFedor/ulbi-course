import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './SideBar.module.scss';
import { useMemo, useState } from 'react';
import { ThemSwitcher } from '@/shared/ui/ThemSwitcher/ui/ThemSwitcher';
import { LangSwitcher } from '@/shared/ui/LangSwitcher/LangSwitcher';
import { Button, ButtonSize, ThemeButton } from '@/shared/ui/Button/Button';
import { AppLink, AppLinkTheme } from '@/shared/ui/AppLink/AppLink';
import { RoutePath } from '@/shared/config/routeConfig/routeConfig';
import AboutIcon from '@/widgets/assets/icons/about-20-20.svg?react';
import MainIcon from '@/widgets/assets/icons/main-20-20.svg?react';
import { SideItem } from '../SideItem/SideItem';
import { SidebarItemsList } from '../../model/Items';

interface SideBarProps {
    className?: string;
}

export const SideBar = ({ className }: SideBarProps) => {
    const [collapsed, setCollapsed] = useState(false);
    const onToogle = () => setCollapsed((collapsed) => !collapsed);

    // предотвращение перерисовки дочерних компонентов, при перерисовке родителей
    const itemList = useMemo(() => {
        return SidebarItemsList.map((item) => (
            <SideItem item={item} collapsed={collapsed} key={item.path} />
        ));
    }, [collapsed]);

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
            <div className={cls.items}>{itemList}</div>

            <div className={cls.switchers}>
                <ThemSwitcher />
                <LangSwitcher className={cls.lang} />
            </div>
        </div>
    );
};
