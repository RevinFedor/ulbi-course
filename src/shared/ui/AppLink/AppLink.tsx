import { classNames } from 'src/shared/lib/classNames/classNames';
import cls from './AppLink.module.scss';
import { Link, LinkProps } from 'react-router-dom';
import { FC } from 'react';

export enum AppLinkTheme {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
    RED = 'red',
}

interface AppLinkProps extends LinkProps {
    className?: string;
    theme?: AppLinkTheme;
}

// принимает props, которые деструктурируются на отдельные переменные: to, className, children и otherProps. Затем он возвращает компонент Link с передачей соответствующих свойств
export const AppLink: FC<AppLinkProps> = (props) => {
    const {
        to,
        className,
        children,
        theme = AppLinkTheme.SECONDARY,
        ...otherProps
    } = props;

    // проверка наличия необяхательного объекта

    return (
        <Link
            to={to}
            className={classNames(cls.AppLink, {}, [
                className || '',
                cls[theme],
            ])}
            {...otherProps}
        >
            {children}
        </Link>
    );
};
