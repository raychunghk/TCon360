/**
 * ThemeSwitch Component
 * Allows switching between available themes (modern, legacy, light-modern)
 * Persists selection to localStorage
 * Applies theme colors globally
 */

'use client';

import React, { useEffect, useState } from 'react';
import { Theme, themes } from '@/styles/themes';
import * as classes from './ThemeSwitch.css';

export function ThemeSwitch() {
  const [currentTheme, setCurrentTheme] = useState<Theme>('modern');

  useEffect(() => {
    // Load theme from localStorage, default to 'modern'
    const saved = localStorage.getItem('app-theme') as Theme | null;
    if (saved && saved in themes) {
      setCurrentTheme(saved);
      applyTheme(saved);
    } else {
      applyTheme('modern');
    }
  }, []);

  const applyTheme = (theme: Theme) => {
    // Apply CSS variables or class names based on theme
    localStorage.setItem('app-theme', theme);
    // Trigger app re-render with new theme colors
    document.documentElement.setAttribute('data-theme', theme);
  };

  const handleThemeChange = (theme: Theme) => {
    setCurrentTheme(theme);
    applyTheme(theme);
  };

  return (
    <div className={classes.themeSwitch}>
      {Object.keys(themes).map((theme) => (
        <button
          key={theme}
          className={currentTheme === theme ? classes.active : classes.inactive}
          onClick={() => handleThemeChange(theme as Theme)}
          aria-label={`Switch to ${theme} theme`}
        >
          {theme.charAt(0).toUpperCase() + theme.slice(1).replace('-', ' ')}
        </button>
      ))}
    </div>
  );
}

export default ThemeSwitch;
