'use client';
import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light';
type ThemeContextValue = {
  theme: Theme | null;
  changeTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme | null>(null);

  const applySystemTheme = () => {
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (systemPrefersDark) {
      applyTheme('dark');
    } else {
      applyTheme('light');
    }
  };

  const applyTheme = (theme: Theme) => {
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(theme);
    setTheme(theme);
  };

  const changeTheme = (theme: Theme) => {
    applyTheme(theme);
    localStorage.setItem('theme', theme);
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    if (!storedTheme) {
      applySystemTheme();
    } else {
      applyTheme(storedTheme);
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (!storedTheme) {
        if (e.matches) {
          changeTheme('dark');
        } else {
          changeTheme('light');
        }
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return <ThemeContext.Provider value={{ theme, changeTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme hook must be used within ThemeProvider');
  }
  return context;
}
