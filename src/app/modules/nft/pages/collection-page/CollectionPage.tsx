import React, { useEffect } from 'react';

import { CollectionInfo } from './components';

import CollectionPageProvider from './CollectionPage.context'
import { useThemeContext } from '../../../../../contexts/ThemeContext';

export const CollectionPage = () => {
  const { setDarkMode } = useThemeContext() as any;

  useEffect(() => setDarkMode(false), []);

  return (
    <CollectionPageProvider>
      <CollectionInfo />
    </CollectionPageProvider>
  );
};
