import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './SideBar.module.scss';
import { useMemo, useState } from 'react';
import { ThemSwitcher } from '@/shared/ui/ThemSwitcher/ui/ThemSwitcher';
import { LangSwitcher } from '@/shared/ui/LangSwitcher/LangSwitcher';
import { Button, ButtonSize, ThemeButton } from '@/shared/ui/Button/Button';
import { SideItem } from '../SideItem/SideItem';
import {  getSidebarItems } from '../../model/selectors/Items';
import { useAppSelector } from '@/shared/lib/hooks/hooksStore';

interface SideBarProps {
    className?: string;
}

export const SideBar = ({ className }: SideBarProps) => {
    const [collapsed, setCollapsed] = useState(false);
    const onToogle = () => setCollapsed((collapsed) => !collapsed);

    const sidebarItemsList = useAppSelector(getSidebarItems);
    //! предотвращение перерисовки дочерних компонентов, при перерисовке родителей
    const itemList = useMemo(() => {
        return sidebarItemsList.map((item) => (
            <SideItem item={item} collapsed={collapsed} key={item.path} />
        ));
    }, [collapsed]);

    return (
        <menu
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
        </menu>
    );
};
