import { classNames } from 'src/shared/lib/classNames/classNames';
import cls from './SideBar.module.scss';
import { useState } from 'react';
import { ThemSwitcher } from 'src/shared/ui/ThemSwitcher/ui/ThemSwitcher';
import { LangSwitcher } from 'src/shared/ui/LangSwitcher/LangSwitcher';

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
            <button onClick={onToogle}>onToogle</button>
            <div
                className={
                    cls.switchers + (collapsed ? ` ${cls.vertical}` : '')
                }
            >
                <ThemSwitcher />
                <LangSwitcher className={!collapsed ? ` ${cls.lang}` : ''} />
            </div>
        </div>
    );
};
