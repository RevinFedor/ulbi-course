import { classNames } from 'src/shared/lib/classNames/classNames';
import { Theme, useTheme } from 'src/app/providers/ThemeProvider';
import DarkIcon from 'src/widgets/assets/icons/theme-dark.svg?react';
import LightIcon from 'src/widgets/assets/icons/theme-light.svg?react';
import { Button, ThemeButton } from 'src/shared/ui/Button/Button';

interface ThemSwitcherProps {
    className?: string;
}

export const ThemSwitcher = ({ className }: ThemSwitcherProps) => {
    const { theme, toggleTheme } = useTheme();

    return (
        <Button
            onClick={toggleTheme}
            theme={ThemeButton.CLEAR}
            className={classNames('', {}, [className || ''])}
        >
            {theme === Theme.DARK ? <DarkIcon /> : <LightIcon />}
        </Button>
    );
};
