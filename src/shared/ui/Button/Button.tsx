import { classNames } from 'src/shared/lib/classNames/classNames';
import cls from './Button.module.scss';
import { ButtonHTMLAttributes } from 'react';

export enum ThemeButton {
    CLEAR = 'clear',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    theme: ThemeButton;
}

export const Button = (props: ButtonProps) => {
    const { className, children, theme, ...otherProps } = props;
    return (
        <button
            className={classNames(cls.Button, {}, [
                className || '',
                cls[theme],
            ])}
            {...otherProps}
        >
            {children}
        </button>
    );
};
