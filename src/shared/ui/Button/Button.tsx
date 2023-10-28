import { classNames } from 'src/shared/lib/classNames/classNames';
import cls from './Button.module.scss';
import { ButtonHTMLAttributes } from 'react';

export enum ThemeButton {
    CLEAR = 'clear',
    OUTLINE = 'outline',
    BACKGROUND = 'background',
    BACKGROUND_INVERTED = 'backgroundInverted',
}

export enum ButtonSize {
    M = 'size_m',
    L = 'size_l',
    XL = 'size_xl',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    theme?: ThemeButton;
    square?: boolean;
    size?: ButtonSize;
}

export const Button = (props: ButtonProps) => {
    const {
        className,
        children,
        theme,
        square,
        size = ButtonSize.M,
        ...otherProps
    } = props;

    
    // в зависимости то square будет показан определенынй css класс
    // record представляет разметку для объекта
    const mods: Record<string, boolean | undefined | string> = {
        [cls[theme || '']]: true,
        [cls.square]: square,
        [cls[size]]: true,
    };

    return (
        <button
            className={classNames(cls.Button, mods, [
                className || '',
                cls[theme || ''],
            ])}
            {...otherProps}
        >
            {children}
        </button>
    );
};
