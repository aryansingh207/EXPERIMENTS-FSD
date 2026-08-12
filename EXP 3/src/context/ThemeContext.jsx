import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const theme = {
    isDarkMode,
    toggleTheme,
    colors: {
      background: isDarkMode ? '#1a1a2e' : '#f0f2f5',
      cardBackground: isDarkMode ? '#16213e' : '#ffffff',
      text: isDarkMode ? '#e0e0e0' : '#333333',
      primary: '#4a90e2',
      secondary: isDarkMode ? '#2d3748' : '#e2e8f0',
      border: isDarkMode ? '#2d3748' : '#e2e8f0',
      shadow: isDarkMode ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.1)',
    }
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};