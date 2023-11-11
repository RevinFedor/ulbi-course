import { classNames } from '@/shared/lib/classNames/classNames';
import { Theme, useTheme } from '@/app/providers/ThemeProvider';
import DarkIcon from '@/shared/assets/icons/theme-dark.svg?react';
import LightIcon from '@/shared/assets/icons/theme-light.svg?react';
import { Button, ThemeButton } from '@/shared/ui/Button/Button';
import { memo } from 'react';

interface ThemSwitcherProps {
    className?: string;
}

export const ThemSwitcher = memo(({ className }: ThemSwitcherProps) => {
    const { theme, toggleTheme } = useTheme();

    return (
        <Button
            onClick={toggleTheme}
            theme={ThemeButton.CLEAR}
            className={classNames('', {}, [className])}
        >
            {theme === Theme.DARK ? <DarkIcon /> : <LightIcon />}
        </Button>
    );
});
