import { useContext } from 'react';
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from './ThemeContext';

interface UseThemeResult {
    toggleTheme: () => void;
    theme: Theme | undefined;
}

export function useTheme(): UseThemeResult {
    const { theme, setTheme } = useContext(ThemeContext);



    const toggleTheme = () => {
        const newTheme = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK;
        setTheme && setTheme(newTheme);

        // вешаем шлобально класс, для определения темы, как app, так и мадоалки
        document.body.className = newTheme
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
    };

    return {
        theme ,
        toggleTheme,
    };
}
