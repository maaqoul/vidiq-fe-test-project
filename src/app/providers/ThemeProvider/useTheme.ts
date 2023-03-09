import { useContext } from 'react';
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from './ThemeContext';

interface UseThemeResult {
  changeTheme: () => void;
  theme: Theme;
}

export function useTheme(): UseThemeResult {
  const { theme = Theme.LIGHT, setTheme } = useContext(ThemeContext);

  const changeTheme = () => {
    const newTheme = theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
    if (setTheme) setTheme(newTheme);
  };

  return { theme, changeTheme };
}
