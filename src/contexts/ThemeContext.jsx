import React, { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { handleScroll } from '../utils/helpers';

const ThemeContext = createContext(null);

const ThemeContextProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (!darkMode) {
      window.document.querySelector('header').classList.remove('dark');
    }
    handleScroll(darkMode);

    window.addEventListener('scroll', () => handleScroll(darkMode));

    return () => {
      window.removeEventListener('scroll', () => handleScroll(darkMode));
    };
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>{children}</ThemeContext.Provider>
  );
};

ThemeContextProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};

const useThemeContext = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useThemeContext was used outside of its Provider');
  }

  return context;
};

export { ThemeContextProvider, useThemeContext };
