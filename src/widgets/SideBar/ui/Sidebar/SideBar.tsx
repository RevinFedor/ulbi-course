import { classNames } from 'src/shared/lib/classNames/classNames';
import cls from './SideBar.module.scss';

interface SideBarProps {
    className?: string;
}

export const SideBar = ({ className }: SideBarProps) => {
    return (
        <div className={classNames(cls.SideBar, {}, [className || ''])}></div>
    );
};
