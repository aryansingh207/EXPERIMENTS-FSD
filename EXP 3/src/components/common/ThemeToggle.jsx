import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button 
      className={`theme-toggle ${isDarkMode ? 'dark' : 'light'}`}
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      {isDarkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
    </button>
  );
};

export default ThemeToggle;