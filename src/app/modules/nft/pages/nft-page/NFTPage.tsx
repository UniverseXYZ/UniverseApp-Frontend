import React, { useEffect } from 'react';

import { NFTInfo } from './components';

import NFTPageProvider from './NFTPage.context'
import { useThemeContext } from '../../../../../contexts/ThemeContext';

export const NFTPage = () => {
  const { setDarkMode } = useThemeContext() as any;

  useEffect(() => setDarkMode(false), []);

  return (
    <NFTPageProvider>
      <NFTInfo />
    </NFTPageProvider>
  );
};
